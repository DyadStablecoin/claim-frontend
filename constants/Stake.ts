import { StakeCurrencies, StakeContractsType } from "@/models/Stake";

export const STAKE_CONTRACTS: StakeContractsType = {
  [StakeCurrencies.USDC]: {
    label: "USDC - DYAD NFT",
    stakeKey: StakeCurrencies.USDC,
    address: "0x8e0e695fEC31d5502C2f3E860Fe560Ea80b03E1D",
  },
  [StakeCurrencies.ETH]: {
    label: "ETH - DYAD NFT",
    stakeKey: StakeCurrencies.ETH,
    address: "0x8e0e695fEC31d5502C2f3E860Fe560Ea80b03E1D",
  },
  [StakeCurrencies.FRAX]: {
    label: "FRAX - DYAD NFT",
    stakeKey: StakeCurrencies.FRAX,
    address: "0x8e0e695fEC31d5502C2f3E860Fe560Ea80b03E1D",
  },
};
