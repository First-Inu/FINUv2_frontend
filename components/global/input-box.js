export default function InputBox(props) {

  const handleChange = (event) => {
    if (props.onChange)
      props.onChange(event)
  }

  return (
    <div className={props.className}>
      <h3 className="my-6 text-left font-bold text-gray-800">Amount</h3>
      <input
        type="number"
        className="
          w-full
          text-yellow-500 text-xl
          px-6
          py-4
          bg-gray-100
          rounded
          hover:border-0
          disabled:opacity-75
        "
        onChange={handleChange}
      />
    </div>
  );
}
