import Card from "@components/global/card";
import Network from "@components/global/network";
import InputBox from "@components/global/input-box";
import BalanceStatus from "./balance-info";
import { useEffect, useState } from "react";
import Button from "@components/global/button";

export default function Balance(props) {

  const [amount, setAmount] = useState(0)

  const handleChange = (event) => {
    setAmount(event.target.value)
  }

  let classes = amount ? 'bg-gradient-to-tr from-purple-500 to-purple-700 button-hover' : 'cursor-not-allowed bg-gray-300 hover:shadow-none'

  return (
    <Card>
      <Network type="eth">
      </Network>
      <InputBox onChange={handleChange}>
      </InputBox>
      <BalanceStatus amount={amount}></BalanceStatus>
      <Button name="Send Tokens" className={"mt-14 w-full rounded px-4 py-4 mb-6 font-bold text-xl focus:outline-none " + classes} type={amount ? "primary" : ""}>
      </Button>
      <a
        className="hover:text-yellow-500 text-gray-300"
        target="_blank"
        href="https://app.moontography.com/" rel="noreferrer"
      >
        Powered by Moontography
      </a>
    </Card>
  );
}
