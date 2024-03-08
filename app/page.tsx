"use client";

import { Separator } from "@/components/ui/separator";
import DnftBox from "@/components/dnft-box";
import TabsComponent from "@/components/reusable/TabsComponent";

export default function Home() {
  const manageNotesContent = (
    <>
      <h3 className="text-md font-medium leading-loose pt-3">
        Immutable Base. Infinite Possibility.
      </h3>
      <p className="text-sm leading-loose text-muted-foreground py-2">
        Deposit wETH into your Notes to mint DYAD. You will be able to claim
        rewards based on how much DYAD you’ve minted once we deploy the next
        layer of contracts. These rewards will make DYAD less expensive to mint,
        which can increase your yield.
      </p>
      <div>
        <Separator className="my-4" />
      </div>
      <DnftBox />
    </>
  );

  const tabsData = [
    {
      label: "Manage Notes",
      tabKey: "Manage Notes",
      content: manageNotesContent,
    },
    {
      label: "Earn Kerosene",
      tabKey: "Earn Kerosene",
      content: <div>Earn Kerosene</div>,
    },
  ];

  return (
    <div className="flex-1 max-w-screen-md p-4 w-full">
      <TabsComponent tabsData={tabsData} />
    </div>
  );
}
