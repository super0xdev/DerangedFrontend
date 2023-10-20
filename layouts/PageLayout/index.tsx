import { FC, ReactNode, useState } from "react"
import { Background } from "components/Background"
import { Footer } from "components/Footer"
import { Logo } from "components/Logo"
import { Wallet } from "components/Wallet"
import { HiMenu } from "react-icons/hi"
import Popup from "reactjs-popup"
import ConnectWalletButton from "../../components/Wallet/ConnectWalletButton";
import { useAccount } from "wagmi"
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit"


type PageLayoutProps = {
  children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount()
  console.log(address)
  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Background>
      <div className="flex flex-col min-h-screen xl:container xl:mx-auto">
        <header className="z-10 flex items-center min-h-[76px] justify-between px-4 py-4 xl:px-8">
          <div className="flex divide-x divide-gray-500">
            <Logo />
          </div>
          <div className="flex items-center gap-4 xs:hidden">
            {/* {address != undefined ? <div className="text-white">{address}</div> :
              <button className="flex items-center gap-2 p-4 px-8 transition-all max-w-max hover:scale-105 bg-gradient-to-t from-yellow-700 via-yellow-400 to-yellow-300 rounded-md"
                onClick={openConnectModal}>ddddd</button>} */}
            <ConnectButton />
          </div>
          <Popup
            open={isOpen}
            onClose={closeModal}
            trigger={
              <button className="hidden xs:flex">
                <HiMenu color="gray" size={24} />
              </button>
            }
            modal
            overlayStyle={{ marginTop: "60px", backgroundColor: "rgba(23,23,23,0.95)" }} >
            <div className="flex flex-col w-screen h-screen gap-8 place-content-center">
              <div className="flex justify-center gap-8">
                <ConnectWalletButton />
              </div>
            </div>
          </Popup>
        </header>
        <main className="flex flex-col grow">
          {children}
        </main>
        <footer className="flex justify-center p-4 rounded-t-md">
          <Footer />
        </footer>
      </div>
    </Background>
  )
}
