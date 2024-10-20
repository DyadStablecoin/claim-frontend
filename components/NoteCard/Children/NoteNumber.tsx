"use client";

import React from "react";
import { NoteNumberDataColumnModel } from "@/models/NoteCardModels";
import PieChartComponent from "@/components/reusable/PieChartComponent";
import { Data } from "@/models/ChartModels";

interface NoteNumberProps {
  data: NoteNumberDataColumnModel[];
  dyad: number[];
  collateral: Data[];
}

const NoteNumber: React.FC<NoteNumberProps> = ({ data, dyad, collateral }) => {
  const dyadData = [
    {
      label: "DYAD mintable",
      value: Math.ceil(dyad[0]),
    },
    {
      label: "DYAD minted",
      value: Math.ceil(dyad[1]),
    },
  ];

  const hasCollateral =
    collateral.length > 0 && collateral.some((item) => item.value > 0);

  return (
    <div className="flex flex-col items-center w-full text-[#FAFAFA]">
      {hasCollateral && (
        <div className="w-full mt-6">
          <PieChartComponent outsideData={dyadData} insideData={collateral} />
        </div>
      )}
      <div className="w-full mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item: any, index: number) => (
            <div
              key={index}
              className={`py-2.5 ${item.text === "Total APR" ? "cols-span-1 md:col-span-2" : "cols-span-1"}`}
            >
              <div
                className={`flex w-full justify-between px-2.5 py-1.5 border-b-[0.5px] border-[#67676780] border-dashed font-normal leading-[16.94px] text-sm text-[#FFFFFF]`}
              >
                <div>{item.text}</div>
                <div className="text-right">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteNumber;
