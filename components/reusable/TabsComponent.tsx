import React, { Key, useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { TabsDataModel } from "@/models/TabsModel";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface tabsComponentPropsInterface {
  tabsData: TabsDataModel[];
  logo?: string | JSX.Element;
  inModal?: boolean;
  urlUpdate?: boolean;
  selected?: any;
  setSelected: (value: any) => void;
}

export default function TabsComponent({
  tabsData,
  logo,
  inModal = false,
  urlUpdate = false,
  selected,
  setSelected,
}: tabsComponentPropsInterface) {
  // const [selected, setSelected] = useState<Key>(tabsData[0].tabKey);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("tab") && urlUpdate) {
      setSelected(searchParams.get("tab") as Key);
    }
  }, []);

  return (
    <div
      className={cn(
        "w-full px-2 flex",
        inModal && "max-w-full md:max-w-[464px] pr-6"
      )}
    >
      <div
        className={cn(
          "w-full",
          inModal && "max-w-[464px] max-w-full md:max-w-[464px]"
        )}
      >
        {logo && (
          <div className="h-7 w-1/6 md:w-2/12 absolute flex">
            <div className="w-full md:h-7 h-full mt-auto text-lg md:text-2xl">
              {logo}
            </div>
          </div>
        )}
        <Tabs
          variant="underlined"
          aria-label="Tabs variants"
          className="p-0 w-full"
          selectedKey={selected}
          onSelectionChange={(key) => {
            setSelected(key);
            if (urlUpdate) {
              router.replace("?tab=" + key);
            }
          }}
          classNames={{
            base: "w-full",
            tabList: `justify-between ${
              logo ? "w-4/6 md:w-9/12" : "w-full"
            } relative rounded-none p-0 border-b border-divider ml-auto`,
            cursor: "w-full bg-[#FAFAFA]",
            tab: "max-w-fit h-7 font-semibold p-0 md:p-4 transition-all",
          }}
        >
          {tabsData.map((tab: any) => (
            <Tab
              key={tab.tabKey}
              title={
                <div className="text-sm md:text-base transition-all">
                  {tab.label}
                </div>
              }
            >
              <div className=" overflow-clip">{tab.content}</div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
