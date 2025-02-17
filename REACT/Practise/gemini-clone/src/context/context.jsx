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

    const delayPara=(index,nextWord)=>{
         setTimeout(function(){
            setResultData(prev=>prev+nextWord);
         },75*index)
    }

    const newChat= ()=>{
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async(prompt)=>{
        // Using this our previos response has been removed
        setResultData("")
        setLoading(true)
        setShowResult(true) 
        let response;
        if(prompt!==undefined){
            response=await run(prompt)
            setRecentPrompt(prompt)
        }else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input) 
           
            response = await run(input)
        }
        
       let responseArray= response.split("**")

    //    Added the typing effect
       let newResponse="";
       for(let i=0;i<responseArray.length;i++){
            if(i===0 || i%2!==1){
                newResponse+=responseArray[i];
            }else{
                newResponse +="<b>"+responseArray[i]+"</b>";
            }
       }

       let newResponse2=newResponse.split("*").join("</br>")
       let newResponseArray = newResponse2.split(" ");
       for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ")
       }
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
        setInput,
        newChat

    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider