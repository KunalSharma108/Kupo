import React from 'react';

type Props = {
  onConfirm: () => void;
};

const SuccessDialog = ({ onConfirm }: Props): React.JSX.Element => {
  return (
    <div className="dialog-backdrop">
      <div className="success-dialog">
        <div className="border-animation"></div>
        <h2>Sign Up Successful</h2>
        <p>You are ready to work on your portfolio's</p>
        <button onClick={onConfirm}>Get Started</button>
      </div>
    </div>
  );
};

export default SuccessDialog;
