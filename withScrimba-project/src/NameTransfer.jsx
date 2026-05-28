import { useState } from "react";


export default function NameTransfer() {
  const initialNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
  const [names, setNames] = useState(initialNames);
  const [transferred, setTransferred]= useState([])

  useEffect(()=>{
if(names.length===0) return;
  const interval= setInterval(()=>{
    setNames(prev=>{
if(prev.length=== 0)return prev;
const [first,...rest]= prev;
setTransferred(t=>[...t,first])
return rest;
    });
  },2000);
  return ()=> clearInterval(interval);
},[names.length])

  return (
    <div>
      <h3>Original Names</h3>
      
      <ul  style={{backgroundColor:"red"}}>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <h3>Transferred Names</h3>
      <ul  style={{backgroundColor:"green"}}>
        {transferred.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}