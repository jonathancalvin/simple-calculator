import React from 'react';

interface OperatorButtonProps {
  dispatch: React.Dispatch<any>; // Adjust the type as per your action types
  operator: string;
}
//Component OperatorButton memiliki fungsi untuk menampilkan tombol operasi matematik (X, +, -, /) pada interface user
const OperatorButton =  ({ dispatch, operator}: OperatorButtonProps) => {
  return (
    <button className='operator' onClick={() => dispatch({ type: 'choose-operator', payload: operator })}>
      {operator}
    </button>
  );
};
export default OperatorButton;
