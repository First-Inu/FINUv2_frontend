import ClaimModal from "@components/claim/claim-modal";
import Card from "@components/global/card";
import { useState } from "react";

export default function BnbClaim(props) {
  const [modalState, setModalState] = useState(false)
  const closeModal = () => {
    setModalState(false)
  }

  const showModal = () => {
    setModalState(true)
  }

  return (
    <Card className="flex flex-row justify-between text-left mt-12 bg-white mb-32">
      <div>
        <div className="pl-2 text-base text-purple-700">Ethereum Mainnet</div>
        <div className="pl-2 text-base text-gray-600">
          $FLOKI Claimable Balance (ERC20)
        </div>
      </div>
      <button
        className="bg-gradient-to-tr from-purple-500 to-purple-700 px-4 py-2 rounded text-white font-semibold focus:border-0"
        onClick={showModal}
      >
        Claim Now
      </button>
      <ClaimModal show={modalState} handleClose={closeModal}></ClaimModal>
    </Card>
  );
}
