import React from 'react';

type Props = {
  onConfirm: () => void;
  data: {heading: string, msg: string, buttonText: string}
};

const SuccessDialog = ({ onConfirm, data }: Props): React.JSX.Element => {
  return (
    <div className="dialog-backdrop">
      <div className="success-dialog">
        <div className="border-trail"></div> 
        <h2>{data.heading}</h2>
        <p>{data.msg}</p>
        <button onClick={onConfirm} className='mulish'>{data.buttonText}</button>
      </div>
    </div>
  );  
};

export default SuccessDialog;
