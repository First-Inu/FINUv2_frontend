import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import Image from "next/image";
import Button from "./global/button";
import web3Modal from "../utils/web3modal"
import WalletBalance from "./wallet/wallet-balance";
import Address from "./wallet/address";
import { setWeb3 } from "store/web3"
import Web3 from "web3";

export default function Header() {


  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClick = async () => {
    await web3Modal.clearCachedProvider()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const address = await web3.eth.getAccounts()
    const balance = await web3.eth.getBalance(address[0])
    dispatch(setWeb3({web3}))
  }

  const ConnectButton = ({ className, address }) => (
    <button
      className="
      text-black
      bg-gradient-to-tr
      from-yellow-200
      to-yellow-500 to-yellow-400
      px-4
      py-2
      rounded
      shadow-md
      m-2"
    >
      {address ? "Disconnect Wallet" : "Connect Wallet"}
    </button>
  );

  return (
    <header className="bg-white sticky top-0 border-b-2">
      <div className="flex flex-wrap items-center justify-between lg:container px-4 py-6 mx-auto md:flex-no-wrap md:px-6">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            width={40}
            height={40}
            priority
            alt="FINU logo"
          />

          <Link href="/">
            <a className="text-lg md:text-xl font-bold ml-3">
              Landing FINU
            </a>
          </Link>
        </div>

        <button
          className="flex items-center block px-3 py-2 border border-white rounded md:hidden"
          onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <ul
          className={cn(
            "md:flex flex-col md:flex-row md:items-center md:justify-between text-sm w-full md:w-auto flex-1",
            mobileMenuIsOpen ? `block` : `hidden`
          )}
        >
          <div className="md:flex">
            {[
              { title: "Stacking", route: "/stacking" },
              { title: "Bridge", route: "/bridge" },
            ].map(({ route, title }) => (
              <li className="mt-3 md:mt-0 md:ml-6" key={title}>
                <Link href={route}>
                  <a className="block">{title}</a>
                </Link>
              </li>
            ))}
          </div>
          <div className="md:flex items-center">
            <WalletBalance> </WalletBalance>
            <Address className="ml-6"> </Address>
            <Button
              type="second"
              className="
                text-black
                bg-gradient-to-tr
                from-yellow-200
                to-yellow-500 to-yellow-400
                px-4
                py-2
                rounded
                shadow-md
                ml-6
              "
              name="Connect Wallet"
              onClick={handleClick}
            >
            </Button>
          </div>
        </ul>
      </div>
    </header>
  );
}
