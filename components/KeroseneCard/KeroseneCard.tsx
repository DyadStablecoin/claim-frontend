import { useWriteContract } from "wagmi";
import ButtonComponent from "@/components/reusable/ButtonComponent";
import NoteCardsContainer from "../reusable/NoteCardsContainer";
import StakingAbi from "@/abis/Staking.json";
import { DialogClose } from "../ui/dialog";
import { STAKE_CONTRACTS } from "@/constants/Stake";
import { StakeCurenciesType } from "@/models/Stake";
import { useState } from "react";
import InputComponent from "../reusable/InputComponent";

interface KeroseneProps {
  currency: string;
  actionType?: "stake" | "unstake";
  stakingContract?: `0x${string}`;
}

const KeroseneCard: React.FC<KeroseneProps> = ({
  currency,
  actionType = "stake",
  stakingContract,
}) => {
  const [stakeInputValue, setStakeInputValue] = useState("");
  const [unstakeInputValue, setUnstakeInputValue] = useState("");
  const { writeContract: writeStake } = useWriteContract();
  const { writeContract: writeUnstake } = useWriteContract();

  return (
    <NoteCardsContainer>
      <div className="text-sm font-semibold text-[#A1A1AA]">
        <div className="text-2xl text-[#FAFAFA] flex justify-between mt-[15px] w-full">
          <div>{STAKE_CONTRACTS[currency as StakeCurenciesType].label}</div>
        </div>
        <div className="mt-4 w-full md:w-[600px]">
          {actionType === "stake" ? (
            <div className="flex justify-between mt-[32px] w-full">
              <InputComponent
                placeHolder={`Amount of ${currency} to stake`}
                onValueChange={setStakeInputValue}
                value={stakeInputValue}
                type="number"
              />
            </div>
          ) : (
            <div className="flex justify-between mt-[32px] w-full">
              <InputComponent
                placeHolder={`Amount of ${currency} to unstake`}
                onValueChange={setUnstakeInputValue}
                value={unstakeInputValue}
                type="number"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-4 md:gap-x-6 w-full mt-6">
            <DialogClose>
              <ButtonComponent variant="bordered">Cancel</ButtonComponent>
            </DialogClose>
            {actionType === "stake" ? (
              <ButtonComponent
                disabled={!stakeInputValue || stakeInputValue.length <= 0}
                onClick={() =>
                  writeStake({
                    address: stakingContract!,
                    abi: StakingAbi.abi,
                    functionName: "stake",
                    args: [stakeInputValue],
                  })
                }
              >
                Stake
              </ButtonComponent>
            ) : (
              <ButtonComponent
                disabled={!unstakeInputValue || unstakeInputValue.length <= 0}
                onClick={() =>
                  writeUnstake({
                    address: stakingContract!,
                    abi: StakingAbi.abi,
                    functionName: "withdraw",
                    args: [unstakeInputValue],
                  })
                }
              >
                Unstake
              </ButtonComponent>
            )}
          </div>
        </div>
      </div>
    </NoteCardsContainer>
  );
};
export default KeroseneCard;
