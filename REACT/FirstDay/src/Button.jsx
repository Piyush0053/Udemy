function printSome(){
    console.log("Hello");
}
// Click Events

export default function Button(){

    return(
        <div>
            <button onClick={printSome}>Click me</button>
        </div>
    );

}