import "./Error.css";
import Price from "./Price";

export default function Error({title, idx}){
    let oldPrices=["10,999", "14,999","3,999", "2,999"];
    let newPrices=["1,999", "13,999","5,999", "7,999"];
    let description=["hello", "RThis is new", " PIyusb", "sdskk"];
    return(
        
        <div className="Error">
            <h3>{title}</h3>
            <p>{description[idx]}</p>
            <Price oldPrice={oldPrices[idx]} newPrice={newPrices[idx]} />   
        </div>
    );

}

// export default Error;