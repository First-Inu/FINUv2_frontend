import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lockResponse } from "store/web3";

export default function LockModal(props) {
  const claimId = useSelector(state => state.web3.claim.claimId)
  const u_identifier = useSelector(state => state.web3.claim.u_identifier)
  const amount = useSelector(state => state.web3.claim.amount)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setShow(claimId)
  }, [
    claimId
  ])

  const handleClose = () => {
    // dispatch(lockResponse({
    //   claimId: 0,
    //   u_identifier: 0,
    //   amount: ''
    // }))
    setShow(false)
  }

  return (
    <div
      className={"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-left " + (show ? "" : "hidden")}
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
          sm:mx-auto
          Modal-Size
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
          Claim your $FINU
        </div>
        <div className="px-8 text-black text-lg font-semibold">
          <div className="py-10">
            Please save <span className="text-yellow-500"> Swap ID or Unique Identifer </span> for claiming.
            <br />
            <br />
            {"You're not able to claim tokens converted without it."}
          </div>
          <hr />
          <div className="pt-10">
            <div>Swap ID</div>
            <div className="bg-white border-2 rounded px-3 py-1 my-4 w-full">
              {claimId}
            </div>
          </div>
          <div className="pt-2">
            <div>Unique Identifier</div>
            <div className="bg-white border-2 rounded px-3 py-1 my-4 w-full">
              {u_identifier}
            </div>
          </div>
          <div className="pt-2">
            <div>Swapped Amount</div>
            <div className="bg-white border-2 rounded px-3 py-1 my-4 w-full">
              {amount}
            </div>
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex justify-end px-6 pb-4">
          <button
            className="
              text-black
              bg-gradient-to-tr
              from-yellow-200
              to-yellow-500 to-yellow-400
              px-4
              py-2
              rounded
              shadow-md
              m-2
            "
            onClick={handleClose}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
