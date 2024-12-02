import { useEffect, useState } from "react";

import {
  useReadCurveM0DyadAllowance,
  useReadCurveM0DyadBalanceOf,
  useReadCurveUsdcdyadAllowance,
  useReadCurveUsdcdyadBalanceOf,
  useReadDyadLpStakingCurveM0DyadNoteIdToAmountDeposited,
  useReadDyadLpStakingCurveUsdcdyadNoteIdToAmountDeposited,
  useWriteCurveM0DyadApprove,
  useWriteCurveUsdcdyadApprove,
  useWriteDyadLpStakingCurveM0DyadDeposit,
  useWriteDyadLpStakingCurveM0DyadWithdraw,
  useWriteDyadLpStakingCurveUsdcdyadDeposit,
  useWriteDyadLpStakingCurveUsdcdyadWithdraw,
} from "@/generated";
import {
  StakeContractsType,
  StakeCurenciesType,
  StakeCurrencies,
} from "@/models/Stake";
import dyadIcon from "../public/android-chrome-256x256.png";
import USDCIcon from "../public/usdc-icon.png";
import wmIcon from "../public/wm-icon.png";

const useGetStakeContractData = (stakeContractKey: StakeCurenciesType) => {
  const [stakeContractData] = useState<StakeContractsType>({
    [StakeCurrencies.CURVE_M0_DYAD_LP]: {
      label: "wM - DYAD",
      stakeKey: StakeCurrencies.CURVE_M0_DYAD_LP,
      address: "0xa969cFCd9e583edb8c8B270Dc8CaFB33d6Cf662D",
      stakingContract: "0xe48c80CF20C7fCE3458896BB263D9D8D6404b39f",
      name: "wM/DYAD LP",
      iconLeft: wmIcon,
      iconRight: dyadIcon,
      link: "https://curve.fi/#/ethereum/pools/factory-stable-ng-272/deposit",
      getWriteLPApprove: (args?: any) => {
        const { writeContract, isPending } = useWriteCurveM0DyadApprove(args);
        return { writeContract, isLoading: isPending };
      },
      getWriteLPStake: (args?: any) => {
        const { writeContract, isPending } =
          useWriteDyadLpStakingCurveM0DyadDeposit(args);
        return { writeContract, isLoading: isPending };
      },
      getAallowance: (args?: any) => {
        const { data, isLoading } = useReadCurveM0DyadAllowance(args);
        return { data, isLoading };
      },
      getWriteUnstake: (args?: any) => {
        const { writeContract, isPending } =
          useWriteDyadLpStakingCurveM0DyadWithdraw(args);
        return { writeContract, isLoading: isPending };
      },
      getLpBalance: (args?: any) => {
        const { data, isLoading } = useReadCurveM0DyadBalanceOf(args);
        return { data, isLoading };
      },
      getStakeBalance: (args?: any) => {
        const { data, isLoading } =
          useReadDyadLpStakingCurveM0DyadNoteIdToAmountDeposited(args);
        return { data, isLoading };
      },
    },
    [StakeCurrencies.CURVE_USDC_DYAD_LP]: {
      label: "USDC - DYAD",
      stakeKey: StakeCurrencies.CURVE_USDC_DYAD_LP,
      address: "0x1507bf3f8712c496fa4679a4ba827f633979dba4",
      stakingContract: "0xbEdC56Bcf36BFe06B36fe7872C7BBD567a0735c3",
      name: "USDC/DYAD LP",
      iconLeft: USDCIcon,
      iconRight: dyadIcon,
      link: "https://curve.fi/#/ethereum/pools/factory-stable-ng-287/deposit",
      getWriteLPApprove: (args?: any) => {
        const { writeContract, isPending } = useWriteCurveUsdcdyadApprove(args);
        return { writeContract, isLoading: isPending };
      },
      getWriteLPStake: (args?: any) => {
        const { writeContract, isPending } =
          useWriteDyadLpStakingCurveUsdcdyadDeposit(args);
        return { writeContract, isLoading: isPending };
      },
      getAallowance: (args?: any) => {
        const { data, isLoading } = useReadCurveUsdcdyadAllowance(args);
        return { data, isLoading };
      },
      getWriteUnstake: (args?: any) => {
        const { writeContract, isPending } =
          useWriteDyadLpStakingCurveUsdcdyadWithdraw(args);
        return { writeContract, isLoading: isPending };
      },
      getLpBalance: (args?: any) => {
        const { data, isLoading } = useReadCurveUsdcdyadBalanceOf(args);
        return { data, isLoading };
      },
      getStakeBalance: (args?: any) => {
        const { data, isLoading } =
          useReadDyadLpStakingCurveUsdcdyadNoteIdToAmountDeposited(args);
        return { data, isLoading };
      },
    },
  });

  return stakeContractData[stakeContractKey];
};

export default useGetStakeContractData;
