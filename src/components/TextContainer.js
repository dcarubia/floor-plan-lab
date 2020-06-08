import React from 'react';
import TextBox from './TextBox';
import { useSelector } from 'react-redux';

function TextContainer() {
  const textArr = useSelector(state => state.sheet.text);

  return (
    <>
      {textArr.map(id => {
        return <TextBox key={id} id={id} />;
      })}
    </>
  );
}

export default TextContainer;