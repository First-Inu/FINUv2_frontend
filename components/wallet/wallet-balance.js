export default function WalletBalance(props) {
	const balance = 99999

  return (
    <div className={"flex items-center rounded bg-gray-100 px-3 py-1 " + (props.className ? props.className : '')}>
      <img className="w-3" src="/icons/eth.svg"/>
      <div className="pl-2 text-base text-yellow-500">
        { balance + ' $FINU' }
      </div>
    </div>
  );
}
