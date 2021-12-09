export default function Title(props) {
  return (
    <div className={"font-bold text-yellow-400 text-base " + props.className}>
      {props.title}
    </div>
  );
}
