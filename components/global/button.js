import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function Button(props) {
  let classes = ' '

  if (props.type)
    classes = " button-" + props.type

  const handleClick = (event) => {
    if (props.onClick)
      props.onClick(event)
  }

  const loading = props.loading ? props.loading : false
  const size = props.size ? props.size : 20

  return (
    <button
      className={props.className + classes + " rounded focus:outline-none flex justify-center items-center"}
      onClick={handleClick}
    >
      {(loading ? <Loader type="Oval" color="#00BFFF" height={size} width={size} /> :
        <div> {props.name} </div>)}
    </button>
  )
}
