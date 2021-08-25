import React, { useState } from 'react';
import Carousel from './components/Carousel';
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';

const imgList = [image1, image2, image3, image4, image1];

const App = () => {
  // const [current, setCurrent] = useState(0);
  return (
    <div style={{ marginTop: '100px' }}>
      {imgList.length > 0 && (
        <Carousel
          // currentImage={current}
          // onClickPrev={(index) => setCurrent(index)}
          // onClickNext={(index) => setCurrent(index)}
          imgList={imgList.map((img, index) => ({ url: img, id: index }))}
          stepInterval={2000}
          autoPlay
          displayNumber={3}
        />
      )}
    </div>
  );
};

export default App;
