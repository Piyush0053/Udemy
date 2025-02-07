import { useState } from "react";

export default function LikeButton() {
    // usestate component
  let [isliked, setisLiked] = useState(false);

//   Change the heart bu clicking
  function ToggleLike() {
        setisLiked(!isliked);
    }

//   css Color 
  let likeStyle={color:"red"};

  return (
    <div>
      <span onClick={ToggleLike}>
        Like Button
        {/*condition for true and false*/}
        {isliked ? (
          <i className="fa-solid fa-heart" style={likeStyle}></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
      </span>
    </div>
  );
}
