import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Address } from "viem";

export enum StakeCurrencies {
  CURVE_USDC_DYAD_LP = "CURVE_USDC_DYAD_LP",
  CURVE_M0_DYAD_LP = "CURVE_M0_DYAD_LP",
}

export type StakeCurenciesType = "CURVE_USDC_DYAD_LP" | "CURVE_M0_DYAD_LP";

export type StakeContractsType = {
  [key in StakeCurenciesType]: {
    label: string;
    stakeKey: StakeCurenciesType;
    address: Address;
    stakingContract?: Address;
    name?: string;
    iconLeft?: string | StaticImport;
    iconRight?: string | StaticImport;
    link?: string;
    getWriteLPApprove?: any;
    getWriteLPStake?: any;
    getAallowance?: any;
    getWriteUnstake?: any;
    getLpBalance?: any;
    getStakeBalance?: any;
  };
};

export type LiquidityStakedType = {
  [key in StakeCurenciesType]: {
    liquidityStaked?: string;
  };
};
