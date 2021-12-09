export default function Card(props) {
  const classes = props.className ? props.className : ''
  return (
    <div className={"p-5 rounded-lg border-2 m-1 mb-6 card-boxshadow " + classes}>
      {props.children}
    </div>
  );
}
