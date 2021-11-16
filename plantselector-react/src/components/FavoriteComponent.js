import React from "react";
import { useHistory } from "react-router-dom";

function Favorite(props) {
  const history = useHistory();
  return (
    <div
      onClick={() => {
        if (props.user) {
          props.updateFavorites(
            props.plantName,
            props.favorites,
            props.user.token
          );
        } else {
          history.push("/rooms");

          console.log("user", props.user);
        }
      }}
    >
      <span>{props.favorite ? "×" : "+"}</span>
    </div>
  );
}

export default Favorite;
