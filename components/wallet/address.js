export default function Address(props) {
  const address = props.address ? props.address : ''
  return (
    <div className={"flex items-center rounded bg-gray-100 " + (props.className ? props.className : "")}>
      <div className="bg-blue-middle px-3 py-1 rounded-l text-white">
        Connected
      </div>
      <div className="pl-2 text-base text-yellow-500 pr-3">
        { address.substring(0, 6) + '...' + address.substring(address.length - 4) }
      </div>
    </div>
  );
}
