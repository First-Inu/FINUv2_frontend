export default function WalletLink(props) {
  const address=true
  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="w-1 h-16 bg-link">
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="rounded-3xl bg-link px-4 py-2">
          <div>
            { address ? 'Transfer To': 'connect your wallet' }
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-1 h-16 bg-link">
        </div>
      </div>
    </div>
  );
}
