export default function InfoMessage(props) {
  const title = "You are about to send tokens to the bridge to be converted from Ethereum Mainnet to Binance Smart Chain. After the tokens have been sent, switch to Binance Smart Chain on your wallet. You will then be able to claim your converted tokens."
  const description = "If you are using Trust Wallet, make sure to use the latest version to avoid issues on using this bridge."
  return (
    <div className="py-5 px-6 mx-1 text-blue-600 bg-blue-100 rounded border-l-4 border-blue-700">
      <div>
        { props.title ? props.title : title }
      </div>
      <br />
      <br />
      <div>
        { props.description ? props.description : description }
      </div>
    </div>
  );
}
