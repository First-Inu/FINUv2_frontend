/* eslint-disable @next/next/no-img-element */

export default function Network(props) {
  let iconPath = '/icons/eth.svg'
  let nextworkName = 'Ethereum Mainnet'

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
    nextworkName = props.name
  }

  return (
    <div className={"flex items-center " + props.className}>
      <img className="w-3" src={iconPath} alt=""/>
      <div className="pl-2 text-base text-purple-700"> {nextworkName} </div>
    </div>
  );
}
