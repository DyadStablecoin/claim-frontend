import React from "react";
import { NoteExtensionsModel } from "@/models/NoteCardModels";
import { Switch } from "@nextui-org/switch";
import NoteCardsContainer from "./reusable/NoteCardsContainer";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import { useReadVaultManagerIsExtensionAuthorized } from "@/generated";
import { defaultChain } from "@/lib/config";
import { useAccount } from "wagmi";
import ConnectWallet from "./reusable/ConnectWallet";

interface NoteEtensionsProps {
  extensions: NoteExtensionsModel[];
}

const NoteEtensions: React.FC<NoteEtensionsProps> = ({ extensions }) => {
  const { address, isConnected } = useAccount();
  const [isRedemptionSelected, setRedemptionSelected] = React.useState(false);
  const [isNativeEthSelected, setNativeEthSelected] = React.useState(false);
  const [isAtomicSwapSelected, setAtomicSwapSelected] = React.useState(false);
  const { windowWidth } = useWindowSize();

  const {data: isNativeEthEnabled} = useReadVaultManagerIsExtensionAuthorized({
    chainId: defaultChain.id,
    args: [address, extensions[0].address],
  });

  if (!isConnected) {
    return <ConnectWallet hasConnectButton={true} />;
  }

  return (
    <NoteCardsContainer>
      <>
        <h1 className="text-xl md:text-2xl font-bold mt-4 md:mt-0">
          Note Extensions
        </h1>
        <div className="text-xs text-[grey] mb-8 w-[90%] md:w-auto">
          Manage your note extensions by enabling / disabling each extension
        </div>
        {extensions.map((extension, index) => (
          <div
            className={`flex justify-between items-center text-[white] text-sm p-2 py-6 ${index !== extensions.length - 1 ? "border-b border-[#282828] mb-4" : ""}`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={extension.icon}
                alt="extension"
                width={windowWidth > 768 ? 40 : 30}
                height={windowWidth > 768 ? 40 : 30}
              />
              <div>
                <div
                  className={`flex ${!extension.enabled ? "text-[grey]" : ""}`}
                >
                  <div>{extension.label}</div>
                </div>
                <div className="text-[10px] md:text-xs text-[grey] w-[120px] md:w-auto">
                  {extension.description}
                </div>
              </div>
            </div>
            {!extension.enabled && (
              <div className="w-[72px] md:w-auto text-[0.55em] md:text-xs my-auto ml-auto mr-0 md:mr-4 border-1 px-2 py-1 rounded-full text-[grey] border-[grey] text-center">
                <div>Coming Soon</div>
              </div>
            )}
            {extension.enabled && (
              <Switch
                isDisabled={!extension.enabled}
                size="sm"
                color="success"
                isSelected={
                  extension.label === "Redemption"
                    ? isRedemptionSelected
                    : extension.label === "Native ETH"
                      ? isNativeEthEnabled
                      : extension.label === "Atomic Swap"
                        ? isAtomicSwapSelected
                        : false
                }
                onValueChange={
                  extension.label === "Redemption"
                    ? setRedemptionSelected
                    : extension.label === "Native ETH"
                      ? setNativeEthSelected
                      : setAtomicSwapSelected
                }
              />
            )}
          </div>
        ))}
      </>
    </NoteCardsContainer>
  );
};
export default NoteEtensions;
