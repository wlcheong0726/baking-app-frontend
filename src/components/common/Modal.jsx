function Modal({ children, onClose }) {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-screen bg-black/60 z-40"
        onClick={onClose}
      />
      <dialog
        open
        className="border-0 rounded-md shadow-xl p-0 overflow-hidden z-50 bg-transparent"
      >
        {children}
      </dialog>
    </>
  )
}

export default Modal
