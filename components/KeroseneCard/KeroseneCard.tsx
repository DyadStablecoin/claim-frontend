import { useAccount } from "wagmi";
import ButtonComponent from "@/components/reusable/ButtonComponent";
import { DialogClose } from "../ui/dialog";
import { STAKE_CONTRACTS } from "@/constants/Stake";
import { StakeCurenciesType } from "@/models/Stake";
import { useEffect, useState } from "react";
import { BigIntInput } from "@/components/reusable/BigIntInput";
import useGetStakeContractData from "@/hooks/useGetStakeContractData";

interface KeroseneProps {
  currency: string;
  actionType?: "stake" | "unstake";
  stakingContract?: `0x${string}`;
  tokenId: any;
  onSuccess?: () => void;
}

const KeroseneCard: React.FC<KeroseneProps> = ({
  currency,
  actionType = "stake",
  stakingContract,
  tokenId,
  onSuccess,
}) => {
  const { address } = useAccount();
  const [stakeInputValue, setStakeInputValue] = useState("");
  const [unstakeInputValue, setUnstakeInputValue] = useState("");
  const [isStakeContractDataLoading, setIsStakeContractDataLoading] =
    useState(true);

  const stakeContractKey = currency as StakeCurenciesType;

  const StakeContractData = useGetStakeContractData(stakeContractKey);

  const { data: allowance, isLoading: isAllowanceLoading } =
    StakeContractData?.getAallowance({
      args: [address!, stakingContract!],
    });

  const { writeContract: writeUnstake, isPending: isStakeUnstakeLoading } =
    StakeContractData?.getWriteUnstake();

  const { data: lpBalance, isLoading: isLpBalanceLoading } =
    StakeContractData?.getLpBalance({
      args: [address!],
    });

  const { data: stakeBalance, isLoading: isStakeBalanceLoading } =
    StakeContractData?.getStakeBalance({
      args: [tokenId],
    });

  const {
    writeContract: getWriteLPApprove,
    isLoading: isWriteLPApproveLoading,
  } = StakeContractData?.getWriteLPApprove();

  const { writeContract: getWriteLPStake, isLoading: isWriteLPStakeLoading } =
    StakeContractData?.getWriteLPStake();

  //Combine loading states from all sub-hooks into a single loading state
  useEffect(() => {
    if (
      !isAllowanceLoading &&
      !isStakeUnstakeLoading &&
      !isLpBalanceLoading &&
      !isStakeBalanceLoading &&
      !isWriteLPApproveLoading &&
      !isWriteLPStakeLoading
    ) {
      setIsStakeContractDataLoading(false);
    } else {
      if (
        isAllowanceLoading ||
        isStakeUnstakeLoading ||
        isLpBalanceLoading ||
        isStakeBalanceLoading ||
        isWriteLPApproveLoading ||
        isWriteLPStakeLoading
      ) {
        setIsStakeContractDataLoading(true);
      }
    }
  }, [
    isAllowanceLoading,
    isStakeUnstakeLoading,
    isLpBalanceLoading,
    isStakeBalanceLoading,
    isWriteLPApproveLoading,
    isWriteLPStakeLoading,
  ]);

  const needsApproval = BigInt(stakeInputValue || "0") > (allowance || 0n);

  const canUnstake =
    stakeBalance && BigInt(unstakeInputValue || "0") <= stakeBalance;

  return (
    <div className="text-sm font-semibold text-[#A1A1AA]">
      <div className="text-2xl text-[#FAFAFA] flex justify-between mt-[15px] w-full">
        <div>{StakeContractData?.label}</div>
      </div>
      <div className="mt-4 w-full md:w-[600px]">
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-6 mt-[32px]">
          <div
            className="ml-auto cursor-pointer md:hidden"
            onClick={() =>
              actionType === "stake"
                ? setStakeInputValue(`${lpBalance?.toString()}`)
                : setUnstakeInputValue(`${stakeBalance?.toString()}`)
            }
          >
            Max
          </div>
          {actionType === "stake" ? (
            <div className="flex justify-between w-full">
              <BigIntInput
                placeholder={`Amount of ${StakeContractData?.name} to stake`}
                onChange={setStakeInputValue}
                value={stakeInputValue}
                decimals={18}
                className="h-[47px] md:h-[39px]"
              />
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <BigIntInput
                placeholder={`Amount of ${StakeContractData?.name} to unstake`}
                onChange={setUnstakeInputValue}
                value={unstakeInputValue}
                type="number"
                className="h-[47px] md:h-[39px]"
              />
            </div>
          )}
          <div className="hidden md:block">
            <ButtonComponent
              width={"100px"}
              onClick={() =>
                actionType === "stake"
                  ? setStakeInputValue(`${lpBalance?.toString()}`)
                  : setUnstakeInputValue(`${stakeBalance?.toString()}`)
              }
            >
              Max
            </ButtonComponent>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 md:gap-x-6 w-full mt-6">
          <DialogClose>
            <ButtonComponent variant="bordered">Cancel</ButtonComponent>
          </DialogClose>
          {actionType === "stake" ? (
            <ButtonComponent
              disabled={!stakeInputValue || BigInt(stakeInputValue) === 0n}
              onClick={() =>
                needsApproval
                  ? getWriteLPApprove({
                      args: [stakingContract!, stakeInputValue],
                    })
                  : getWriteLPStake({
                      args: [tokenId, stakeInputValue],
                      onSuccess: () => {
                        onSuccess?.();
                      },
                    })
              }
            >
              {needsApproval ? "Approve" : "Stake"}
            </ButtonComponent>
          ) : (
            <ButtonComponent
              disabled={
                !unstakeInputValue ||
                (unstakeInputValue.length <= 0 && !canUnstake)
              }
              onClick={() =>
                writeUnstake({
                  args: [tokenId, unstakeInputValue],
                  onSuccess: () => {
                    onSuccess?.();
                  },
                })
              }
            >
              Unstake
            </ButtonComponent>
          )}
        </div>
      </div>
    </div>
  );
};
export default KeroseneCard;
