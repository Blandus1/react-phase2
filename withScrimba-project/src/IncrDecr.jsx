
//We have a state that is updating the counter by incrementing and 
//decrementing it by one 
//How can you archive this using the useReducer hook?


{/* 
    import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
*/}


import { useReducer} from "react";

const initialState={count: 0}

function counterReducer (state,action){
    switch(action.type){
        case 'Increment': return { count:state.count +1 };
        case 'Decrement' : return {count: state.count ===0 ? 0: state.count -1};
        default: return state;
    }
}

export default function Counter(){
 const   [state,dispatch]= useReducer(counterReducer, initialState)

 return(
    <>
    <div className="flex gap-3 ">
        <p>count: {state.count}</p>
        <button onClick={()=>dispatch({type:'Increment'})} className="border border-amber-500 bg-amber-600 ">Increment</button>
        <button onClick={()=>dispatch({type:'Decrement'})}  className="border border-amber-500 bg-amber-600 ">Decrement</button>

    </div>
    </>
 )
}