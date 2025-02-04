export default function Price({oldPrice, newPrice}){
    let oldStyle={
        textDecorationLine:"line-through",
    }
    let newStyle={
        fontWeight:"Bold",
    }
    let styles={
        backgroundColor:"#e0c367",
        height:"30px",
        borderRadius:"10px",
    }
    return(
        <div style={styles}>
            <span style={oldStyle}>{oldPrice}</span> 
            &nbsp; &nbsp;&nbsp;
            <span style={newStyle}>{newPrice}</span>
        </div>
    );
}