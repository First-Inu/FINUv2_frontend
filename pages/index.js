import Image from "next/image";
import { FillButton } from "tailwind-react-ui"

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      {/* <Image
        src="/team-of-critters.svg"
        alt="Four one-eyed aliens playing"
        width={576}
        height={429.734}
        priority
      /> */}
      <FillButton className="bg-gray-700">
        Wallet Balance
      </FillButton>
    </div>
  );
}
