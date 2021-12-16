/* eslint-disable @next/next/no-img-element */

export default function Network(props) {
  let iconPath = '/icons/eth.svg'
  let networkName = 'Ethereum Mainnet'

  if (props.type) {
    switch (props.type) {
      case 'eth':
        iconPath = '/icons/eth.svg'
        break;
      case 'bnb':
        iconPath = '/icons/bnb.svg'
        break;
    }
  } else {
    iconPath = props.icon
    networkName = props.name
  }

  return (
    <div className={"flex items-center " + props.className}>
      <img className="w-3" src={iconPath} alt=""/>
      <div className="pl-2 text-base text-purple-700"> {props.name ? props.name : networkName } </div>
    </div>
  );
}
