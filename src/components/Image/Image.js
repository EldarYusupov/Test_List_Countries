import React from "react";
import { Link } from "react-router-dom";

const Image = (props) => {
  return (
    <Link to={`/image/${props.id}`}>
      <article className={props.className}>
        <div className="scale">
          <img src={props.urls.full} alt={props.user.name} className="image" />
        </div>
        <p className="title">{props.user.name}</p>
      </article>
    </Link>
  );
};

export default Image;
