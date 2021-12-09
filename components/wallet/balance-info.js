export default function BalanceStatus(props) {
  return (
    <div>
      <div className="mt-5 mb-2 text-yellow-500 text-2xl">
        { "You will send: " + props.amount + " $FINU" }
      </div>
      <div>
        $FINU Current Balance (ERC20):
        <span className="text-yellow-500"></span>
      </div>
    </div>
  );
}
