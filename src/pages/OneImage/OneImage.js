import React from "react";
import { Link, useParams } from "react-router-dom";

const OneImage = () => {
  let { id } = useParams();

  const [image, setImage] = React.useState({});

  React.useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      );
      const data = await response.json();
      setImage(data);
      console.log(data.urls);
    };

    fetchImages();
  }, [id]);

  return (
    <div className="fullScreen">
      {image && image.urls && <img src={image.urls.full} alt="" />}
      <Link to={`/`}>
        <button className="back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Back
        </button>
      </Link>
    </div>
  );
};

export default OneImage;
