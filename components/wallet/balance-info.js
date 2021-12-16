import { useSelector } from "react-redux";

export default function BalanceStatus(props) {

  const tokenAmount = useSelector(state => state.web3.wallet.balance)

  return (
    <div>
      <div className="mt-5 mb-2 text-yellow-500 text-2xl text-left">
        {"You will send: " + props.amount + " $FINU"}
      </div>
      <div className="flex justify-between">
        <p> $FINU Current Balance (ERC20): </p>
        <p className="text-yellow-500"> {tokenAmount} </p>
      </div>
    </div>
  );
}
