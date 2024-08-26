import EditVaultModal from "@/components/Modals/NoteCardModals/DepositModals/EditVault/EditVaultModal";
import EditVaultTabContent from "@/components/Modals/NoteCardModals/DepositModals/EditVault/EditVaultTabContent";
import {
  useReadVaultManagerCollatRatio,
  useReadVaultManagerHasVault,
  vaultManagerAbi,
  vaultManagerAddress,
  wEthVaultAbi,
} from "@/generated";
import { defaultChain } from "@/lib/config";
import { useReadContract, useReadContracts } from "wagmi";
import { Address, maxUint256 } from "viem";
import { formatNumber, fromBigNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TabsDataModel } from "@/models/TabsModel";
import { vaultInfo } from "@/lib/constants";
import AddVaultModal from "@/components/Modals/NoteCardModals/DepositModals/AddVault/AddVaultModal";

interface DepositProps {
  tokenId: string;
  total_collateral: string;
  collateralization_ratio: bigint | undefined;
}

export const supportedVaults = vaultInfo.map((info) => info.vaultAddress);

const Deposit: React.FC<DepositProps> = ({
  tokenId,
  total_collateral,
  collateralization_ratio,
}) => {
  const { data: vaultData } = useReadContracts({
    contracts: supportedVaults.map((address) => ({
      address: vaultManagerAddress[defaultChain.id],
      abi: vaultManagerAbi,
      functionName: "hasVault",
      args: [BigInt(tokenId), address],
      chainId: defaultChain.id,
    })),
    allowFailure: false,
  });

  const emptyVaultMap = vaultData?.map((data) => !data) || [];
  const emptyVaults = emptyVaultMap
    .map((emptyVault, i) => (!emptyVault ? null : supportedVaults[i]))
    .filter((data) => !!data);

  const availableVaults = 5 - emptyVaultMap.filter((data) => !data).length;

  return (
    <div className="w-full">
      <div className="block md:flex justify-between text-sm font-semibold my-6 md:my-[37px] md:px-[15px]">
        <div className="flex justify-between text-[#A1A1AA] mb-2 md:mb-0">
          <div className="mr-[5px]">Total collateral: </div>
          <div>{total_collateral}</div>
        </div>
        <div className="flex justify-between text-[#FAFAFA]">
          <div className="mr-[5px]">Collateralization ratio:</div>
          <p className="mt-auto">
            {collateralization_ratio === maxUint256
              ? "Infinity"
              : `${formatNumber(fromBigNumber(collateralization_ratio, 16))}%`}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-[30px]">
        {supportedVaults
          .filter((_, i) => !!vaultData?.at(i))
          .map((address, i) => (
            <Vault key={i} tokenId={tokenId} vaultAddress={address} />
          ))}
        {availableVaults &&
          Array.apply(null, Array(availableVaults)).map((_, i) => (
            <AddVault
              key={i}
              tokenId={tokenId}
              vaultAddresses={emptyVaults as Address[]}
            />
          ))}
      </div>
    </div>
  );
};
export default Deposit;

const Vault = ({
  vaultAddress,
  tokenId,
}: {
  vaultAddress: Address;
  tokenId: string;
}) => {
  const { data: hasVault } = useReadVaultManagerHasVault({
    chainId: defaultChain.id,
    args: [BigInt(tokenId), vaultAddress],
  });
  const { data: collateralValue, isLoading: collateralLoading } =
    useReadContract({
      address: vaultAddress,
      abi: wEthVaultAbi,
      args: [BigInt(tokenId)],
      functionName: "getUsdValue",
      chainId: defaultChain.id,
    });

  const { data: collatRatio } = useReadVaultManagerCollatRatio({
    args: [BigInt(tokenId)],
    chainId: defaultChain.id,
  });

  const { tokenAddress: collateralAddress, symbol: collateralString } =
    vaultInfo.filter((value) => value.vaultAddress === vaultAddress)[0];

  const tabs: TabsDataModel[] = [
    {
      label: "Deposit",
      tabKey: "Deposit",
      content: (
        <EditVaultTabContent
          action="deposit"
          token={collateralAddress}
          symbol={collateralString}
          collateralizationRatio={collatRatio}
          tokenId={tokenId}
          vaultAddress={vaultAddress}
        />
      ),
    },
    {
      label: "Withdraw",
      tabKey: "Withdraw",
      content: (
        <EditVaultTabContent
          action="withdraw"
          token={collateralAddress}
          symbol={collateralString}
          collateralizationRatio={collatRatio}
          tokenId={tokenId}
          vaultAddress={vaultAddress}
        />
      ),
    },
    {
      label: "Redeem",
      tabKey: "Redeem",
      content: (
        <EditVaultTabContent
          action="redeem"
          token={collateralAddress!}
          symbol={collateralString!}
          collateralizationRatio={collatRatio}
          tokenId={tokenId}
          vaultAddress={vaultAddress}
        />
      ),
    },
  ];

  if (!hasVault) {
    return null;
  }
  if (collateralLoading) {
    return (
      <Skeleton className="rounded-md md:rounded-none w-full md:w-[100px] h-9 md:h-[100px]" />
    );
  }
  return (
    <Dialog>
      <DialogTrigger className="h-full w-full">
        <div
          className={`font-semibold text-[#FAFAFA] text-sm items-center justify-center flex flex-row md:flex-col gap-2 rounded-md md:rounded-none w-full md:w-[100px] h-9 md:h-[100px] bg-[#282828]`}
        >
          <p>{collateralString}</p>
          <p>${formatNumber(fromBigNumber(collateralValue))}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-lg px-[0px] md:px-8 pt-8 ml-auto">
        <EditVaultModal tabsData={tabs} logo={collateralString} />
      </DialogContent>
    </Dialog>
  );
};

const AddVault = ({
  tokenId,
  vaultAddresses,
}: {
  tokenId: string;
  vaultAddresses: Address[];
}) => {
  return (
    <Dialog>
      <DialogTrigger className="h-full w-full">
        <div
          className={`font-semibold text-[#FAFAFA] text-sm items-center justify-center flex flex-col rounded-md md:rounded-none gap-2 w-full md:w-[100px] h-9 md:h-[100px] bg-transparent border border-white/30`}
        >
          <p>+</p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-fit">
        <AddVaultModal vaults={vaultAddresses} tokenId={tokenId} />
      </DialogContent>
    </Dialog>
  );
};
