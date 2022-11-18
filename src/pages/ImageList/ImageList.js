import React from 'react';
import Image from "../../components/Image/Image";

const ImageList = () => {
    const [images, setImages] = React.useState([])

    React.useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
            const data = await response.json()
            setImages(data)
        }
        
        fetchImages()
    },[])


    return (
      <div className='main'>
        {!images ? (
          <h2>Loading...</h2>
        ) : (
          <section className="container">
            <h1>Unsplach Foto</h1>

            <div className="imageList">
              {images.map((image) => (
                <Image className="imageList__item" key={image.id} {...image} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
}

export default ImageList;