import React from 'react';
import TextBox from './TextBox';
import { useSelector } from 'react-redux';

function TextContainer() {
  const textArr = useSelector(state => state.sheet.text);

  return (
    <>
      {textArr.map(text => {
        return <TextBox key={text.id} id={text.id} position={text.position} textValue={text.value} />;
      })}
    </>
  );
}

export default TextContainer;