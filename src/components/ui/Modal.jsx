import { useEffect, useId, useRef } from 'react';

/** Native <dialog>: focus trapping, Esc to close and backdrop come for free. */
export default function Modal({ open, onClose, title, children, actions }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal__body">
        <h2 id={titleId} className="modal__title">{title}</h2>
        <div className="modal__content">{children}</div>
        {actions && <div className="modal__actions">{actions}</div>}
      </div>
    </dialog>
  );
}
