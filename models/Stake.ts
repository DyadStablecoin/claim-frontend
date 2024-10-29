import { Address } from "viem";

export enum StakeCurrencies {
  USDC = "USDC",
  ETH = "ETH",
  FRAX = "FRAX",
  CURVE_M0_DYAD_LP = "CURVE_M0_DYAD_LP",
}

export type StakeCurenciesType = "USDC" | "ETH" | "FRAX" | "CURVE_M0_DYAD_LP";

export type StakeContractsType = {
  [key in StakeCurenciesType]: {
    label: string;
    stakeKey: StakeCurenciesType;
    address: Address;
    stakingContract?: Address;
  };
};
