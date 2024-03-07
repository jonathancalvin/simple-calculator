import React from 'react';
//Component DigitButton digunakan menampilkan tombol digit pada interface user. Parameter yang diterima berupa dispatch dan digit. 
interface DigitButtonProps {
  dispatch: React.Dispatch<any>;
  digit: string;
}
const DigitButton = ({ dispatch, digit }:DigitButtonProps) => {
  return (
    <button className={digit==="0"?"span-2":""} onClick={() => dispatch({ type: 'add-digit', payload: digit })}>
      {digit}
    </button>
  );
};

export default DigitButton;
