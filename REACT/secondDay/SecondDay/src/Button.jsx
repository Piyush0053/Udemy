function singleClick() {
  console.log("hello!");
}

function onPara() {
  console.log("gu");
}
function double() {
  console.log("bye!!");
}
export default function Button() {
  return (
    <div>
      <button onClick={singleClick}>Click me!</button>
      <p onMouseOver={onPara}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
        necessitatibus sequi quo cumque neque velit mollitia laboriosam
        consequuntur, vitae quas non sapiente libero ipsam voluptatibus eum
        doloribus, perspiciatis, fugit corrupti?
      </p>
      <h3 onDoubleClick={double}><button>hello from here</button></h3>
    </div>
  );
}
