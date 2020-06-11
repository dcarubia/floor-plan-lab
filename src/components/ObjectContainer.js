import React from 'react';
import Object from './Object';
import { useSelector } from 'react-redux';

function ObjectContainer() {
  const objectArr = useSelector(state => state.sheet.objects);

  return (
    <>
      {objectArr.map(obj => {
        return <Object key={obj.id} id={obj.id} type={obj.type} />;
      })}
    </>
  );
}

export default ObjectContainer;