"use client";

import React, { Fragment, useMemo, useState } from "react";
import NoteCardsContainer from "../reusable/NoteCardsContainer";
import TabsComponent from "../reusable/TabsComponent";
import {
  vaultManagerAbi,
  vaultManagerAddress,
  wEthVaultAbi,
  dyadAbi,
  dyadAddress,
} from "@/generated";
import { defaultChain } from "@/lib/config";
import NoteNumber from "./Children/NoteNumber";
import { NoteNumberDataColumnModel } from "@/models/NoteCardModels";
import { TabsDataModel } from "@/models/TabsModel";
import Deposit, { supportedVaults } from "./Children/Deposit";
import Mint from "./Children/Mint";
import { useReadContracts } from "wagmi";
import { maxUint256 } from "viem";
import { formatNumber, fromBigNumber } from "@/lib/utils";
import { vaultInfo } from "@/lib/constants";
import { Data } from "@/models/ChartModels";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Menu, Vault } from "lucide-react";
import ButtonComponent from "@/components/reusable/ButtonComponent";

type ContractData = {
  collatRatio?: bigint;
  exoCollateralValue?: bigint;
  keroCollateralValue?: bigint;
  totalCollateralValue?: bigint;
  minCollatRatio?: bigint;
  mintedDyad?: bigint;
};

function NoteCard({ tokenId }: { tokenId: string }) {
  const [activeTab, setActiveTab] = useState(`Note Nº ${tokenId}`);

  // Fetch collateralization ratio
  const {
    data: contractData,
    isSuccess: dataLoaded,
    isError: loadDataError,
  } = useReadContracts({
    contracts: [
      {
        address: vaultManagerAddress[defaultChain.id],
        abi: vaultManagerAbi,
        functionName: "collatRatio",
        args: [BigInt(tokenId)],
      },
      {
        address: vaultManagerAddress[defaultChain.id],
        abi: vaultManagerAbi,
        functionName: "getVaultsValues",
        args: [BigInt(tokenId)],
      },
      {
        address: vaultManagerAddress[defaultChain.id],
        abi: vaultManagerAbi,
        functionName: "MIN_COLLAT_RATIO",
      },
      {
        address: dyadAddress[defaultChain.id],
        abi: dyadAbi,
        functionName: "mintedDyad",
        args: [BigInt(tokenId)],
      },
    ],
    allowFailure: false,
    query: {
      select: (data) => {
        const collatRatio = data[0];
        const exoCollateralValue = data[1][0];
        const keroCollateralValue = data[1][1];
        const minCollatRatio = data[2];
        const mintedDyad = data[3];
        const totalCollateralValue = exoCollateralValue + keroCollateralValue;

        return {
          collatRatio,
          exoCollateralValue,
          keroCollateralValue,
          totalCollateralValue,
          minCollatRatio,
          mintedDyad,
        };
      },
    },
  });

  const {
    collatRatio,
    exoCollateralValue,
    keroCollateralValue,
    totalCollateralValue,
    minCollatRatio,
    mintedDyad,
  } = useMemo<ContractData>(() => {
    if (contractData) {
      return contractData;
    } else {
      return {};
    }
  }, [contractData]);

  // Check if the vault exists
  const { data: hasVaultData, isError: hasVaultError } = useReadContracts({
    contracts: supportedVaults.map((address) => ({
      address: vaultManagerAddress[defaultChain.id],
      abi: vaultManagerAbi,
      functionName: "hasVault",
      args: [BigInt(tokenId), address],
      chainId: defaultChain.id,
    })),
    allowFailure: false,
  });
  const hasVault = (hasVaultData?.filter((data) => !!data)?.length || 0) > 0;

  // Fetch vault collateral values
  const { data: usdCollateral, isError: vaultCollateralError } =
    useReadContracts({
      contracts: supportedVaults.map((address) => ({
        address: address,
        abi: wEthVaultAbi,
        functionName: "getUsdValue",
        args: [BigInt(tokenId)],
        chainId: defaultChain.id,
      })),
      allowFailure: false,
    });

  const { data: tokenCollateral, isError: tokenCollateralError } =
    useReadContracts({
      contracts: supportedVaults.map((address) => ({
        address: address,
        abi: wEthVaultAbi,
        functionName: "id2asset",
        args: [BigInt(tokenId)],
        chainId: defaultChain.id,
      })),
      allowFailure: false,
    });

  const vaultAmounts: Data[] = useMemo(() => {
    if (!usdCollateral || !tokenCollateral) {
      return [];
    }

    return usdCollateral.map((collateral, index) => ({
      label: `${vaultInfo[index].symbol}|${fromBigNumber(tokenCollateral[index]).toFixed(4)}`,
      value: fromBigNumber(collateral),
      color: vaultInfo[index].color,
    }));
  }, [tokenCollateral, usdCollateral]);

  // Calculate total collateral and collateralization ratio
  const totalCollateral = dataLoaded
    ? `$${formatNumber(fromBigNumber(totalCollateralValue))}`
    : "N/A";

  const collateralizationRatio = dataLoaded
    ? collatRatio === maxUint256
      ? "Infinity"
      : `${formatNumber(fromBigNumber(contractData.collatRatio, 16))}%`
    : "N/A";

  // Calculate total DYAD
  const totalDyad = contractData?.mintedDyad
    ? `${Math.floor(fromBigNumber(contractData.mintedDyad))}`
    : "N/A";

  // Calculate mintable DYAD
  const mintableDyad = useMemo(() => {
    if (
      !dataLoaded ||
      totalCollateralValue === undefined ||
      minCollatRatio === undefined ||
      mintedDyad === undefined ||
      exoCollateralValue === undefined ||
      keroCollateralValue === undefined
    ) {
      return "N/A";
    }
    let usableKero = keroCollateralValue;
    if (keroCollateralValue > exoCollateralValue) {
      usableKero = exoCollateralValue;
    }
    let maxDyad =
      ((usableKero + exoCollateralValue) * 1000000000000000000n) /
      minCollatRatio;

    if (maxDyad > exoCollateralValue) {
      maxDyad = exoCollateralValue;
    }

    return maxDyad - (mintedDyad || 0n);
  }, [
    dataLoaded,
    totalCollateralValue,
    minCollatRatio,
    mintedDyad,
    exoCollateralValue,
    keroCollateralValue,
  ]);

  // Prepare data for the note
  const noteData: NoteNumberDataColumnModel[] = [
    {
      text: "Collateralization ratio",
      value: collateralizationRatio,
      highlighted: true,
    },
    {
      text: "DYAD minted",
      value: totalDyad,
      highlighted: false,
    },
    {
      text: "Collateral",
      value: totalCollateral,
      highlighted: false,
    },
    {
      text: "Exogenous Collateral",
      value: !dataLoaded
        ? "N/A"
        : `$${formatNumber(fromBigNumber(exoCollateralValue))}`,
      highlighted: false,
    },
  ];

  // Prepare tabs data
  const tabData: TabsDataModel[] = [
    {
      label: `Note Nº ${tokenId}`,
      tabKey: `Note Nº ${tokenId}`,
      content: hasVault ? (
        <NoteNumber
          data={noteData}
          dyad={[fromBigNumber(mintableDyad), fromBigNumber(mintedDyad)]}
          collateral={vaultAmounts}
        />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 pt-4">
          <Vault size={48} />
          <div className="text-center text-[#FAFAFA]">
            <h3 className="text-xl font-semibold text-primary">
              No Active Vault
            </h3>
            <p className="text-sm mt-2">
              Deposit collateral to open a vault and start using your Note
            </p>
          </div>
          <ButtonComponent
            style={{ width: "150px" }}
            onClick={() => setActiveTab("Deposit and Withdraw")}
          >
            Deposit Now
          </ButtonComponent>
        </div>
      ),
    },
    {
      label: "Deposit & Withdraw",
      tabKey: "Deposit and Withdraw",
      content: (
        <Deposit
          total_collateral={totalCollateral}
          collateralization_ratio={collatRatio}
          tokenId={tokenId}
        />
      ),
    },
    {
      label: "Mint & Burn",
      tabKey: "Mint DYAD",
      content: (
        <Mint
          currentCr={collatRatio}
          tokenId={tokenId}
          // setActiveTab={setActiveTab}
        />
      ),
    },
  ];

  const renderActiveTabContent = (activeTabKey: string) => {
    return tabData.find((tab: TabsDataModel) => activeTab === tab.tabKey)
      ?.content;
  };

  return (
    <NoteCardsContainer>
      <Fragment>
        <div className="md:hidden block">
          <div className=" flex justify-between">
            <div className="text-md">Note Nº {tokenId}</div>
            <Dropdown>
              <DropdownTrigger>
                <Menu />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dropdown Variants">
                {tabData.map((tab: TabsDataModel) => (
                  <DropdownItem
                    key={tab.tabKey}
                    onClick={() => setActiveTab(tab.tabKey)}
                  >
                    {tab.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          {renderActiveTabContent(activeTab)}
        </div>
        <div className="hidden md:block">
          <TabsComponent
            tabsData={tabData}
            selected={activeTab}
            setSelected={setActiveTab}
          />
        </div>
      </Fragment>
    </NoteCardsContainer>
  );
}

export default NoteCard;
