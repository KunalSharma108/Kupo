import React from 'react';
import '../styles/Dialog.css';

interface DialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2 className="dialog-title">{title}</h2>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="dialog-cancel" onClick={onCancel}>{cancelText}</button>
          <button className="dialog-confirm" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
