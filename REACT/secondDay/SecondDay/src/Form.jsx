function message(){
    console.log("Submit successfully");
}

export default function Form(){
    return(
        <form>
            <input placeholder="Enter here" />
            <button onClick={message}>Submit</button>
        </form>

    );
}