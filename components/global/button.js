export default function Button(props) {
  let classes = ''

  if (props.type)
    classes = "button-" + props.type

  const handleClick = (event) => {
    if (props.onClick)
      props.onClick(event)
  }

  return (
    <button
      className={classes + " rounded px-4 py-4 focus:outline-none " + props.className}
      onClick={handleClick}
    >
      {props.name}
    </button>
  )
}
