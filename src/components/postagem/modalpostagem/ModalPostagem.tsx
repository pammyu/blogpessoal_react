import { useRef } from "react"
import { Popup } from "reactjs-popup"
import "reactjs-popup/dist/index.css"

import { PlusCircle } from "@phosphor-icons/react"
import FormPostagem from "../formpostagem/FormPostagem"

type PopupRef = {
  open: () => void
  close: () => void
}

function ModalPostagem() {
  const popupRef = useRef<PopupRef | null>(null)

  return (
    <Popup
      ref={popupRef as any}
      modal
      nested
      closeOnDocumentClick
      overlayStyle={{
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
      }}
      contentStyle={{
        background: "transparent",
        border: "none",
        padding: 0,
        width: "min(720px, 92vw)",
      }}
      trigger={
        <div
          role="button"
          tabIndex={0}
          className="
            mt-2 mx-auto w-fit cursor-pointer select-none
            rounded-xl p-[2px]
            bg-gradient-to-r from-pink-500 to-purple-500
            shadow-md hover:shadow-lg transition
          "
        >
          <div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-2 flex items-center justify-center gap-2">
            <PlusCircle size={18} weight="fill" className="text-white" />
            <span className="text-white font-semibold text-sm">
              Criar nova postagem
            </span>
          </div>
        </div>
      }
    >
      <div className="rounded-3xl shadow-2xl bg-white border border-white/60 overflow-hidden max-h-[85vh] flex flex-col">
        <div className="px-6 py-5 bg-gradient-to-r from-pink-400 to-purple-400 text-white flex items-center justify-between shrink-0">
          <h2 className="text-xl font-extrabold">Cadastrar Postagem</h2>

          <button
            type="button"
            onClick={() => popupRef.current?.close()}
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 transition flex items-center justify-center text-white"
            aria-label="Fechar"
            title="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <FormPostagem modo="modal" onClose={() => popupRef.current?.close()} />
        </div>
      </div>
    </Popup>
  )
}

export default ModalPostagem
