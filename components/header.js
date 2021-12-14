import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Image from "next/image";
import Button from "./global/button";
import web3Modal from "../utils/web3modal"
import WalletBalance from "./wallet/wallet-balance";
import Address from "./wallet/address";
import { getBalance, setAddress, setWallet, chainIdChanged } from "store/web3"
import Web3 from "web3";

export default function Header() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const wallet = useSelector(state => state.web3.wallet)

  const connectWallet = async () => {
    const provider = await web3Modal.connect()
    console.log(provider, '--------')
    const web3Object = new Web3(provider)

    const acounts = await web3Object.eth.getAccounts()
    const chainId = await web3Object.eth.net.getId()


    provider.on("accountsChanged", (accounts) => {
      location.reload()
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (chainId) => {
      dispatch(chainIdChanged(chainId))
      console.log('chain changed')
      dispatch(getBalance(acounts[0]))
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      // console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      // console.log(error);
    });

    dispatch(setWallet({
      web3object: web3Object,
      address: acounts[0],
      chainId: chainId,
    }))
    console.log('connet chain')
    dispatch(getBalance(acounts[0]))
  }

  useEffect(() => {
    if (web3Modal.cachedProvider)
      connectWallet()
  }, [])

  const dispatch = useDispatch();

  const handleClick = async () => {
    if (wallet.address) {
      dispatch(setWallet({
        web3object: null,
        balance: 0,
        address: '',
        chainId: 0
      }))
    } else {
      await web3Modal.clearCachedProvider()
      connectWallet()
    }
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
          className="flex items-center block px-3 py-2 border border-white rounded lg:hidden"
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
            "lg:flex flex-col lg:flex-row lg:items-center lg:justify-between text-sm w-full lg:w-auto flex-1",
            mobileMenuIsOpen ? `block` : `hidden`
          )}
        >
          <div className="lg:flex">
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
          <div className="lg:flex items-center">
            {wallet.address ? <WalletBalance className="mt-2 lg:mt-0" balance={wallet.balance} > </WalletBalance> : null}
            {wallet.address ? <Address className="lg:ml-6 mt-2 lg:mt-0" address={wallet.address}> </Address> : null}
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
                lg:ml-6
                mt-2
                lg:mt-0
              "
              name={wallet.address ? "Disconnect Wallet" : "Connect Wallet"}
              onClick={handleClick}
            >
            </Button>
          </div>
        </ul>
      </div>
    </header>
  );
}
