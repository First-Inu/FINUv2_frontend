import Button from "@components/global/button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { claimToken } from "store/web3";


export default function ClaimModal(props) {
  const [claimId, setClaimId] = useState(0)
  const [u_identifier, setIdentifier] = useState(0)
  const [amount, setAmount] = useState(0)
  const [classes, setClasses] = useState('cursor-not-allowed bg-gray-300 hover:shadow-none')
  const [claiming, setClaiming] = useState(false)

  const handleClose = () => {
    props.handleClose()
  }

  const dispatch = useDispatch()

  useEffect(() => {
    setClasses((amount && u_identifier && claimId) ? 'bg-gradient-to-tr from-purple-500 to-purple-700 button-hover' : 'cursor-not-allowed bg-gray-300 hover:shadow-none')
  }, [claimId, u_identifier, amount])

  const handleClaimToken = async () => {
    setClaiming(true)
  }

  useEffect(async () => {
    if (claiming)
      await dispatch(claimToken({
        claimId: claimId,
        u_identifier: u_identifier,
        amount: amount
      }))
    setClaiming(false)
  }, [claiming])

  const handleSwapId = (event) => {
    // claimId = event.target.value
    setClaimId(event.target.value)
  }

  const handleIdentifier = (event) => {
    // u_identifier = event.target.value
    setIdentifier(event.target.value)
  }

  const handleAmount = (event) => {
    // amount = event.target.value
    setAmount(event.target.value)
  }

  return (
    <div
      className={"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-left " + (props.show ? "" : "hidden")}
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
          Claim your $FINU
        </div>
        <div className="px-8 text-black text-lg font-semibold">
          <div className="py-10">
            After you initiate a conversion and send tokens on one side of the
            bridge, come here to claim your tokens on the receiving side. To claim
            your tokens, all you have to do is switch to the <span className="text-yellow-500">bnb network</span> on
            your wallet.
            <br />
            <br />
            Once you have claimed your $FLOKI, please check the Etherscan and wait
            a few minutes for your claimed tokens to arrive in your wallet.
          </div>
          <hr />
          <div className="pt-10">
            <div>Swap ID</div>
            <input
              type="text"
              placeholder="Swap ID"
              className="bg-white border-2 rounded px-3 py-1 my-4 w-full"
              onChange={handleSwapId}
            />
          </div>
          <div className="pt-2">
            <div>Unique Identifier</div>
            <input
              type="text"
              placeholder="Unique Identifier"
              className="bg-white border-2 rounded px-3 py-1 my-4 w-full"
              onChange={handleIdentifier}
            />
          </div>
          <div className="pt-2">
            <div>Swapped Amount</div>
            <input
              type="number"
              placeholder="Swapped Amount"
              className="bg-white border-2 rounded px-3 py-1 my-4 w-full"
              onChange={handleAmount}
            />
          </div>
          <div
            className="
              bg-yellow-100
              border-l-4 border-yellow-300
              rounded
              p-6
              bg-opacity-50
            "
          >
            A 0.002 ETH gas fee is required to execute the token claim.
          </div>
        </div>
        <hr className="my-10" />
        <div className="flex justify-end px-6 pb-4">
          <Button
            type={"primary"}
            className={"rounded px-4 py-2 mb-7 " + classes}
            loading={claiming}
            onClick={handleClaimToken}
            name="Clain Now"
          >
          </Button>
        </div>
      </div>
    </div>
  );
}
