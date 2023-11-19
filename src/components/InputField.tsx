import React, {FC} from 'react';

interface InputFieldProps {
  text: string;
  handleInput: (str: string) => void;
  handleSubmit: () => void;
}

const InputField: FC<InputFieldProps> = ({text, handleInput, handleSubmit}) => {
  return (
    <label htmlFor="">
      <input value={text} onChange={e => handleInput(e.target.value)}/>
      <button onClick={handleSubmit}>Add Todo</button>
    </label>
  );
};

export default InputField;