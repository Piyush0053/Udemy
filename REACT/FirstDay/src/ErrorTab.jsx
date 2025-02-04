import Error from "./Error.jsx";

function ErrorTab(){
    let styles={
        display:"flex",
        flexWrap:"wrap",
    };
    return(
        <div style={styles}>
            
            <Error title="Logitech Mouse" idx={0}/>
            <Error title="Apple Pencil" idx={1}/>
            <Error title="MackBook" idx={2}/>
            <Error title="Iphone" idx={3}/>
        </div>
    );
}

export default  ErrorTab;