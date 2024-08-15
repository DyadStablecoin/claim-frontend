import ButtonComponent from "@/components/reusable/ButtonComponent";
import NoteCardsContainer from "../components/reusable/NoteCardsContainer";
import { ClaimModalContent } from "./claim-modal-content";
import { useMerklCampaign } from "@/hooks/useMerklCampaign";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useMerklRewards } from "@/hooks/useMerklRewards";
import { formatEther } from "viem";
import {
  keroseneAddress,
  useSimulateDistributorClaim,
  useWriteDistributorClaim,
} from "@/generated";
import { defaultChain } from "@/lib/config";
import useKerosenePrice from "@/hooks/useKerosenePrice";
import { useEffect, useMemo } from "react";

export function EarnKeroseneContent() {
  const { address } = useAccount();

  const { currentCampaign: merklData } = useMerklCampaign();
  const { merklRewards, error, loading, refetch } = useMerklRewards({
    address,
  });

  const { data: claimMerklRewardsConfig, error: claimError } =
    useSimulateDistributorClaim({
      args: [
        [address!],
        [keroseneAddress[defaultChain.id]],
        [merklRewards?.accumulated || 0n],
        [merklRewards?.proof || []],
      ],
      query: {
        enabled:
          address !== undefined &&
          merklRewards !== undefined &&
          merklRewards.accumulated > 0n,
      },
    });

  const { kerosenePrice, error: kerosenePriceError } = useKerosenePrice();

  const { totalUsd, claimableUsd } = useMemo(() => {
    if (!merklRewards || !kerosenePrice) {
      return { totalUsd: "0", claimableUsd: "0" };
    }

    try {
      const totalUsd =
        Number(formatEther(merklRewards.accumulated || 0n)) * kerosenePrice;
      const claimableUsd =
        Number(formatEther(merklRewards.unclaimed || 0n)) * kerosenePrice;

      return {
        totalUsd: totalUsd.toFixed(2).toLocaleString(),
        claimableUsd: claimableUsd.toFixed(2).toLocaleString(),
      };
    } catch (e) {
      console.error("Error calculating USD values", e);
      return { totalUsd: "0", claimableUsd: "0" };
    }
  }, [merklRewards, kerosenePrice]);

  const {
    writeContract: claimMerklRewards,
    data: claimTransactionHash,
    isPending: writingClaim,
  } = useWriteDistributorClaim();

  const { data: claimTransaction, isPending: transactionPending } =
    useWaitForTransactionReceipt({
      hash: claimTransactionHash,
    });

  useEffect(() => {
    if (!!address && claimTransaction?.status === "success") {
      refetch(address);
    }
  }, [address, claimTransaction, refetch]);

  return (
    <div>
      {merklData && (
        <div className="flex justify-between text-2xl p-[2rem] pl-[5rem] pr-[5rem] font-bold">
          <div>{merklData.apr?.toFixed(0) || 0}% APR</div>
          <div>
            Liquidity: $
            {Number(merklData.tvl?.toFixed(0) || 0).toLocaleString()}
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <NoteCardsContainer>
          <div className="text-sm font-semibold text-[#A1A1AA]">
            <div className="flex w-full flex justify-between items-center">
              <div className="text-2xl text-[#FAFAFA]">Step 1</div>
              <div>Claim or buy a Note</div>
            </div>
            <div className="flex justify-between mt-[32px] w-full">
              <div className="w-full flex gap-4">
                <ClaimModalContent />
              </div>
            </div>
          </div>
        </NoteCardsContainer>
        <NoteCardsContainer>
          <div className="text-sm font-semibold text-[#A1A1AA]">
            <div className="flex w-full flex justify-between items-center">
              <div className="text-2xl text-[#FAFAFA]">Step 2</div>
              <div>Deposit collateral and mint DYAD</div>
            </div>
            <div className="flex justify-between mt-[32px] w-full">
              <div className="w-full">
                <ButtonComponent
                  onClick={() => {
                    window.open(window.location.origin + "?tab=notes", "_self");
                  }}
                >
                  Switch to Manage Notes tab
                </ButtonComponent>
              </div>
            </div>
          </div>
        </NoteCardsContainer>
        <NoteCardsContainer>
          <div className="text-sm font-semibold text-[#A1A1AA]">
            <div className="flex w-full flex justify-between items-center">
              <div className="text-2xl text-[#FAFAFA]">Step 3</div>
              <div>Provide liquidity to USDC - DYAD on Uniswap v3</div>
            </div>
            <div className="flex justify-between mt-[32px] w-full">
              <div className="w-full">
                <ButtonComponent
                  onClick={() =>
                    window.open(
                      "https://app.uniswap.org/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0xFd03723a9A3AbE0562451496a9a394D2C4bad4ab/500?minPrice=1.003256&maxPrice=1.005265"
                    )
                  }
                >
                  LP USDC - DYAD on Uniswap V3
                </ButtonComponent>
              </div>
            </div>
          </div>
        </NoteCardsContainer>
        <NoteCardsContainer>
          <div className="text-sm font-semibold text-[#A1A1AA]">
            <div className="flex w-full flex justify-between items-center">
              <div className="text-2xl text-[#FAFAFA]">Step 4</div>
              <div>Claim rewards from Merkl</div>
            </div>

            <div className="flex flex-col gap-4 justify-between mt-[32px] w-full">
              {address === undefined ? (
                <>
                  <p>Connect Wallet to see rewards or</p>
                  <ButtonComponent
                    onClick={() =>
                      window.open("https://merkl.angle.money/user/")
                    }
                  >
                    Check your earnings on Merkl
                  </ButtonComponent>
                </>
              ) : (
                <>
                  <div className="w-full grid grid-cols-3">
                    {loading ? (
                      <p>Loading...</p>
                    ) : error ? (
                      <p className="col-span-3">
                        {error.message || "An error occurred"}
                      </p>
                    ) : kerosenePriceError ? (
                      <p className="col-span-3">
                        {kerosenePriceError.message || "Failed to load price"}
                      </p>
                    ) : (
                      <>
                        <p>Your total earnings</p>
                        <p>
                          {Number(
                            formatEther(merklRewards?.accumulated || 0n)
                          ).toLocaleString()}{" "}
                          KEROSENE
                        </p>
                        <p>{`$${totalUsd}`}</p>
                        <p>Total claimable</p>
                        <p>
                          {Number(
                            formatEther(merklRewards?.unclaimed || 0n)
                          ).toLocaleString()}{" "}
                          KEROSENE
                        </p>
                        <p>{`$${claimableUsd}`}</p>
                      </>
                    )}
                  </div>
                  {merklRewards &&
                    claimMerklRewardsConfig !== undefined &&
                    claimError === null && (
                      <div className="w-full flex gap-4">
                        <ButtonComponent
                          disabled={
                            merklRewards.unclaimed === 0n ||
                            writingClaim ||
                            (claimTransactionHash && transactionPending)
                          }
                          onClick={() => {
                            claimMerklRewards(claimMerklRewardsConfig.request);
                          }}
                        >
                          {merklRewards.unclaimed === 0n
                            ? "Nothing to claim"
                            : writingClaim ||
                                (claimTransactionHash && transactionPending)
                              ? "Claiming..."
                              : "Claim"}
                        </ButtonComponent>
                        <ButtonComponent
                          onClick={() => {
                            window.open(
                              `https://merkl.angle.money/ethereum/pool/0x8B238f615c1f312D22A65762bCf601a37f1EeEC7?campaignId=${merklData?.campaignId}`
                            );
                          }}
                        >
                          View campaign on Merkl
                        </ButtonComponent>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </NoteCardsContainer>
      </div>
    </div>
  );
}
