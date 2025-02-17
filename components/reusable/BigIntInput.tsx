"use client";

import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";

import { Input, InputProps } from "@/components/ui/input";

import { cn, fromBigNumber, toBigNumber } from "@/lib/utils";
import { formatUnits } from "viem";

interface BigIntInputProps
  extends Omit<InputProps, "value" | "onChange" | "max" | "defaultValue"> {
  value: string | undefined;
  max?: string;
  onChange: (value: string) => void;
  decimals?: number;
}

export const BigIntInput = forwardRef<HTMLInputElement, BigIntInputProps>(
  ({ value, onChange, decimals = 18, max, className, ...props }, ref) => {
    return (
      <NumericFormat
        customInput={Input}
        getInputRef={ref}
        valueIsNumericString
        allowNegative={false}
        allowLeadingZeros
        thousandSeparator=","
        {...props}
        className={cn("rounded-none text-left font-normal", className)}
        type="text"
        inputMode="decimal"
        value={
          value && BigInt(value) !== 0n && value !== ""
            ? formatUnits(BigInt(value), decimals)
            : ""
        }
        onValueChange={(data) => {
          const newValue = data.value;

          if (newValue === ".") {
            return onChange?.("0");
          }

          if (Number(newValue) == 0) {
            return onChange?.("");
          }
          //setValue(newValue);
          onChange?.(toBigNumber(newValue, decimals).toString());
        }}
      />
    );
  }
);

BigIntInput.displayName = "EtherInput";
