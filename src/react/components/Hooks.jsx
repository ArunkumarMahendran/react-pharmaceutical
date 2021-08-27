import React,{useState} from 'react'

const Hooks = () => {
   const [count,SetCount]=useState(0);
   handleIncrement=()=>
   {
       SetCount(count+1);
   }
    return (
        <div>
            <span>{count}</span>
            <button value ="Increment" onClick={handleIncrement}></button>
        </div>
    )
}

export default Hooks

