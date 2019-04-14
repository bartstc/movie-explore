import React, { useState, useEffect } from 'react';

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const timeout = setTimeout(() => {
      image.onload = null; // dont call image.onload callback below
      reject({ error: `Was not able to load ${src} in 5s` })
    }, 5000);

    image.onload = () => {
      clearTimeout(timeout);
      resolve(); // image is loaded
    };

    image.src = src;
  })
};

const BlurImage = ({ src, alt, base64 }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    try {
      await preloadImage(src);
      setLoaded(true);
    }
    catch (error) {
      console.error(error);
    };
  };

  const currentSrc = loaded ? src : base64;
  return (
    <img src={currentSrc} alt={alt} />
  )
};

export default BlurImage;