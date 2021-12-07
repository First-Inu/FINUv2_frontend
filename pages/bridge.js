/* eslint-disable @next/next/no-img-element */
import Swap from "@components/swap";

export default function AboutPage() {
  return (
    <div className="flex-none lg:flex justify-center">
      <Swap> </Swap>
      <img className="lg:max-w-md lg:ml-4 xl:max-w-xl 2xl:max-w-3xl" src="/images/bridge.svg" alt="Brigde Image" />
    </div>
  );
}
