import React from 'react';

interface Props {
  name?: string;
  handleClick?: () => void | Promise<void>;
}

const Button: React.FC<Props> = ({ name, handleClick }) => {
  return (
    <button className={'px-4 py-2 text-sm bg-blue text-white rounded-none'} onClick={handleClick}>
      {name}
    </button>
  );
};

export default Button;
