export default function ConfirmModal({
  open,
  title = "Confirmar",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel?.();
  };

  return (
    <div className="modalOverlay" onMouseDown={onOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true">
        <h3 className="modalTitle">{title}</h3>
        <p className="modalText">{message}</p>

        <div className="modalActions">
          <button className="ghost" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btnDanger" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
