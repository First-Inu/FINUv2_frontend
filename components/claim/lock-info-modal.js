import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LockInfoModal(props) {
  const handleClose = () => {
    props.handleClose(false)
  }

  const history = useSelector(state => state.web3.history)

  const [rows, setRows] = useState([])

  useEffect(() => {
    let items = []
    for (let i = 0; i < history.length; i++) {
      items.push(
        <tr key={i + '_claim'}>
          <td className="px-6 py-4 whitespace-nowrap text-center">
            {history[i].claimId}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {history[i].u_identifier}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {history[i].amount}
          </td>
        </tr>
      )
    }
    setRows(items)
  }, [history])

  const dispatch = useDispatch()

  return (
    <div
      className={"justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-left " + (props.show ? "" : "hidden")}
    >
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
        onClick={handleClose}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75 flex justify-end">
          <div>
            <button
              type="button"
              className="
                text-gray-400
                bg-transparent
                hover:bg-gray-200 hover:text-gray-900
                rounded-lg
                text-sm
                p-1.5
                flex
                items-center
                mr-4
                mt-4
              "
              data-modal-toggle="default-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className="
          relative
          rounded-lg
          shadow-lg
          overflow-auto
          bg-white
          z-30
          mx-4
          lg:w-1/2
        "
      >
        <div
          className="
            text-yellow-500
            font-semibold
            text-xl text-left
            px-8
            py-4
            bg-gray-100
          "
        >
          History
        </div>
        <div className="py-10 text-center px-2">
          To claim your tokens, all you have to do is switch to the
          <span className="text-yellow-500"> {' bnb network '}</span>
          on your wallet and claim.
        </div>
        <hr />
        <div className="py-10 flex overflow-x-auto shadow items-center justify-center px-10">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"> SwapID </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Identifier </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Amount </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows}
            </tbody>
          </table>
        </div>
        <hr className="my-10" />
        <div className="flex justify-end px-6 pb-4">
          <button
            className={`
              text-black
              bg-gradient-to-tr
              from-yellow-200
              to-yellow-500 to-yellow-400
              px-4
              py-2
              rounded
              shadow-md
              m-2
            `}
            onClick={handleClose}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
