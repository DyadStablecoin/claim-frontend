import { ethers } from "ethers";

export function formatUSD(amount, removeDollarSign = false) {
  // format with commas
  amount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (removeDollarSign) {
    amount = amount.slice(1);
  }
  return amount.slice(0, -3);
}

export function round(value, decimals) {
  return Math.round(parseFloat(value) * 10 ** decimals) / 10 ** decimals;
}
export function floor(value, decimals) {
  return Math.floor(parseFloat(value) * 10 ** decimals) / 10 ** decimals;
}

export function normalize(value, decimals = 18) {
  if (value) {
    return parseFloat(value) / 10 ** decimals;
  }
  return 0;
}

// thin wrapper around `ethers.utils.parseEther`
export function parseEther(eth) {
  try {
    return ethers.utils.parseEther(eth ? String(parseFloat(eth)) : "0");
  } catch (e) {
    return 0;
  }
}

export function addUnits(value, decimals = 18) {
  return value * 10 ** decimals;
}
