export default function Button(props) {
  let classes = ' '

  if (props.type)
    classes = " button-" + props.type

  const handleClick = (event) => {
    if (props.onClick)
      props.onClick(event)
  }

  return (
    <button
      className={props.className + classes + " rounded focus:outline-none"}
      onClick={handleClick}
    >
      {props.name}
    </button>
  )
}
