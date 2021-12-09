/* eslint-disable @next/next/no-img-element */
import ClaimModal from "@components/claim/claim-modal";
import LockModal from "@components/claim/lock-modal";
import Swap from "@components/swap";
import { useSelector } from "react-redux";

export default function AboutPage() {
  return (
    <div className="flex-none lg:flex justify-center">
      <Swap> </Swap>
      <img className="lg:max-w-md lg:ml-4 xl:max-w-xl 2xl:max-w-3xl" src="/images/bridge.svg" alt="Brigde Image" />
      <LockModal></LockModal>
    </div>
  );
}
