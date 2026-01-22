import { Popup } from "reactjs-popup"
import FormPostagem from "../formpostagem/FormPostagem"

function ModalPostagem() {
  return (
    <Popup
      trigger={
        <button
          className="bg-gradient-to-r from-pink-400 to-purple-400
                     text-white font-semibold
                     py-3 px-6 rounded-lg
                     shadow-md
                     hover:scale-105 transition-transform duration-300"
        >
          Nova Postagem
        </button>
      }
      modal
    >
      <FormPostagem />
    </Popup>
  )
}

export default ModalPostagem
