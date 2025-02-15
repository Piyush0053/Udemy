import { createContext, useState } from "react";
import run from '../config/gemini';

export const Context= createContext();

const ContextProvider =(props)=>{
    //  input -->use to save the input data
    const [input,setInput]=useState("");
    // recentPrompt --> display the prompt we have written
    const [recentPrompt, setRecentPrompt]=useState("");
    // prevPrompt--> use to store all the input history and display in the sidebar
    const [prevPrompt, setPrevPrompt]= useState([]);
    // showresult--> this will display the result in the main text page
    const [showresult, setShowResult]= useState(false);
    // loading--> it will display one loading animation
    const [loading, setLoading]=useState(false);
    // resultData --> use to display data on webpage
    const [resultData, setResultData]= useState("");



    const onSent = async(prompt)=>{
        // Using this our previos response has been removed
        setResultData("")
        setLoading(true)
        setShowResult(true)  

       const response = await run(input)
       setResultData(response)
       setLoading(false)
       setInput("")
       
    }

    

    const contextValue={
        prevPrompt,
        setPrevPrompt,
        setRecentPrompt,
        onSent,
        recentPrompt,
        showresult,
        loading,
        resultData,
        input,
        setInput

    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider