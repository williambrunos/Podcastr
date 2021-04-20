import { useState } from 'react';

export default function Counter(){
  let [counter, setCounter] = useState(1);

  function updateCounter(){
    setCounter(counter + 1);
  }

  return(
    <>
      <h2>{counter}</h2>
      <button onClick={updateCounter}>Click me!</button>
    </>
  )
}