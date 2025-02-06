import { useState } from "react";

export default function Counter(){
    // let [StateVariable, setStateVariable]=useState(0);
    let [count,setcount]=useState(0);

    // let incCount= ()=>{
    //     setcount(count+1);
    //     console.log(count);
    // };
    return(
        <div>
            <input value={count} onChange={e=>setcount(e.target.value)} />
            <h1>Increment count Value</h1>
            <h4>Count={count}</h4>
            <button onClick={()=>{
                setcount(count+1)
            }}>Click me!</button>
        </div>
    );

}
