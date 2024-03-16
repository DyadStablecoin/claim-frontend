import { useState } from "react";
import InputComponent from "@/components/reusable/InputComponent";
import ButtonComponent from "@/components/reusable/ButtonComponent";
import NoteCardsContainer from "../reusable/NoteCardsContainer";
import { COLORS } from "@/constants/styles";

interface KeroseneProps {
  currency: string;
  APY: string;
  staked: string;
  keroseneEarned: string;
}

const KeroseneCard: React.FC<KeroseneProps> = ({
  currency,
  APY,
  staked,
  keroseneEarned,
}) => {
  const [stakeInputValue, setStakeInputValue] = useState("");
  const [unstakeInputValue, setUnstakeInputValue] = useState("");

  const onMaxStakeHandler = () => {
    setStakeInputValue("9999999");
  };

  const onMaxUnstakeHandler = () => {
    setUnstakeInputValue("9999999");
  };

  const stakeHandler = () => console.log("Staked");
  const unstakeHandler = () => console.log("Unstaked");

  return (
    <NoteCardsContainer>
      <div className={`text-sm font-semibold text-[${COLORS.GREY}]`}>
        <div
          className={`text-2xl text-[${COLORS.WHITE}] flex justify-between mt-[15px] w-full`}
        >
          <div>{currency}</div>
          <div>{APY}% APY</div>
        </div>
        <div className="flex justify-between mt-[32px] w-full">
          <div className="w-[380px] ">
            <InputComponent
              placeHolder={`Amount of ${currency} to stake`}
              onValueChange={setStakeInputValue}
              value={stakeInputValue}
              type="number"
              max={9999999}
            />
          </div>
          <div className="w-[74px]">
            <ButtonComponent variant="bordered" onClick={onMaxStakeHandler}>
              Max
            </ButtonComponent>
          </div>
          <div className="w-[128px]">
            <ButtonComponent onClick={stakeHandler}>Stake</ButtonComponent>
          </div>
        </div>
        <div className="flex justify-between mt-[32px]">
          <div className="flex">
            <div className="mr-[5px]">
              <strong>{currency}</strong>
              {` Staked:`}
            </div>
            <div>{staked}</div>
          </div>
          <div className="flex">
            <div className="mr-[5px]">Kerosene earned:</div>
            <div>{keroseneEarned}</div>
          </div>
        </div>
        <div className="flex justify-between mt-[32px] w-full">
          <div className="w-[380px] ">
            <InputComponent
              placeHolder={`Amount of ${currency} to unstake`}
              onValueChange={setUnstakeInputValue}
              value={unstakeInputValue}
              type="number"
              max={9999999}
            />
          </div>
          <div className="w-[74px]">
            <ButtonComponent variant="bordered" onClick={onMaxUnstakeHandler}>
              Max
            </ButtonComponent>
          </div>
          <div className="w-[128px]">
            <ButtonComponent onClick={unstakeHandler}>Unstake</ButtonComponent>
          </div>
        </div>
      </div>
    </NoteCardsContainer>
  );
};
export default KeroseneCard;
