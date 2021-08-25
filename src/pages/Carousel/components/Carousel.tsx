import React, { useState, useEffect, useRef } from 'react';
import './Carousel.scss';

type VisibleItem = {
  order: number[];
  [key: number]: { styles: React.CSSProperties };
};

type CarouselProps = {
  currentImage?: number; // 受控模式
  imgList: { url: string; id: number }[];
  autoPlay?: boolean;
  stepInterval?: number;
  displayNumber?: number;
  onClickNext?: (index: number) => void;
  onClickPrev?: (index: number) => void;
};

const img_width = 300;
const img_height = 300;
const visibleImages = 3;
const duration = 500;
const isCurrentProp = (current?: number) => typeof current !== 'undefined';

const Carousel = (props: CarouselProps) => {
  const {
    currentImage, // 受控模式
    imgList = [],
    autoPlay = false,
    stepInterval = 3000,
    displayNumber = visibleImages,
    onClickNext,
    onClickPrev,
  } = props;
  const [currFirstImg, setCurrFirstImg] = useState(0); // 中间的图片
  const [actualFirst, setActualFirst] = useState<string | number>('');
  const [visibleItemsProps, setVisibleItemsProps] = useState<VisibleItem>({
    order: [],
  }); // 图片顺序和图片样式
  const currMiddleImgRef = useRef(0); // 显示的图片位置
  const autoPlayRef = useRef(0); // 自动播放interval
  const intervalRef = useRef(0);
  const imgDifference = useRef(1);
  const durationRef = useRef(duration);

  const parentHeight = img_height;
  const parentWidth = img_width * 3;
  const elementsInLeft = Math.ceil(displayNumber / 2);
  const elementsInRight = displayNumber - elementsInLeft;

  const constructVisibleItemsProps = () => {
    const newVisibleItemsProps: VisibleItem = { order: [] };
    const curr_center = isCurrentProp(currentImage) ? (currentImage as number) : currFirstImg;
    let timesToIterate = 0;
    let zIndex = -elementsInRight;
    let xTranslate = img_width;
    let zTranslate = 0;
    let opacity = 1;
    const division = img_width * (1.66 / elementsInLeft);
    const opacityDivider = 0.7 / elementsInRight;
    let rightEltCount = elementsInRight;
    const leftEltCount = elementsInLeft;
    let curr_center_copy = curr_center;

    while (timesToIterate < displayNumber) {
      const styles: React.CSSProperties = {};
      let currImgIndex;
      let currImgIndexOnRight = true;

      if (timesToIterate < elementsInRight) {
        // 左侧图片样式
        const nextIndex = curr_center - rightEltCount;
        currImgIndex = nextIndex > -1 ? nextIndex : imgList.length - Math.abs(nextIndex);
        opacity = 1 - opacityDivider * rightEltCount;
        zTranslate = -division * rightEltCount;
        xTranslate = img_width - division * rightEltCount;
        rightEltCount -= 1;
      } else {
        // 右侧图片样式
        currImgIndexOnRight = false;
        currImgIndex = curr_center_copy;
        if (curr_center_copy + 1 >= imgList.length) {
          curr_center_copy = 0;
        } else {
          curr_center_copy += 1;
        }
        opacity = 1 - opacityDivider * Math.abs(leftEltCount - (timesToIterate + 1));
        zTranslate = -division * Math.abs(leftEltCount - (timesToIterate + 1));
        xTranslate = img_width + division * Math.abs(leftEltCount - (timesToIterate + 1));
      }
      styles.transform = `translateX(${xTranslate}px) translateZ(${zTranslate}px)`;
      styles.opacity = opacity;
      styles.zIndex = currImgIndexOnRight ? (zIndex += 1) : (zIndex -= 1);
      newVisibleItemsProps.order.push(currImgIndex);
      newVisibleItemsProps[currImgIndex] = { styles };
      timesToIterate += 1;
    }
    durationRef.current = actualFirst === '' ? duration : duration / imgDifference.current;
    setVisibleItemsProps(newVisibleItemsProps);
  };

  // 处理点击事件
  const changeCenter = ({ index, url }: { index: number; url: string }) => {
    const currFirstImgIndex = visibleItemsProps.order.indexOf(
      isCurrentProp(currentImage) ? (currentImage as number) : currFirstImg,
    );
    const prevIndex = visibleItemsProps.order[currFirstImgIndex - 1];
    const nextIndex = visibleItemsProps.order[currFirstImgIndex + 1];
    if (index !== (isCurrentProp(currentImage) ? currentImage : currFirstImg)) {
      if (index === prevIndex) {
        onClickPrev && onClickPrev(index);
        !isCurrentProp(currentImage) && setCurrFirstImg(index);
      } else if (index === nextIndex) {
        onClickNext && onClickNext(index);
        !isCurrentProp(currentImage) && setCurrFirstImg(index);
      } else {
        const val = currFirstImgIndex - visibleItemsProps.order.indexOf(index);
        imgDifference.current = Math.abs(val);
        setActualFirst(index);
        cycleToNextImage(index);
      }
    }
  };
  const cycleToNextImage = (actual: number) => {
    if (
      visibleItemsProps.order.indexOf(currMiddleImgRef.current) >
      visibleItemsProps.order.indexOf(actual)
    ) {
      currMiddleImgRef.current =
        currMiddleImgRef.current - 1 > -1 ? currMiddleImgRef.current - 1 : imgList.length - 1;
      setCurrFirstImg(currMiddleImgRef.current);
    } else {
      currMiddleImgRef.current =
        currMiddleImgRef.current + 1 < imgList.length ? currMiddleImgRef.current + 1 : 0;
      setCurrFirstImg(currMiddleImgRef.current);
    }
  };

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (actualFirst !== '') {
      intervalRef.current = setInterval(() => {
        if (actualFirst !== '' && actualFirst !== currMiddleImgRef.current) {
          cycleToNextImage(actualFirst as number);
        } else if (actualFirst !== '' && actualFirst === currMiddleImgRef.current) {
          setActualFirst('');
          imgDifference.current = 1;
          clearInterval(intervalRef.current);
        }
      }, durationRef.current - 100) as any;
    }
  }, [actualFirst]);

  useEffect(() => {
    constructVisibleItemsProps();
    currMiddleImgRef.current = isCurrentProp(currentImage)
      ? (currentImage as number)
      : currFirstImg;
  }, [currFirstImg]);

  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        const nextImg =
          currMiddleImgRef.current + 1 < imgList.length ? currMiddleImgRef.current + 1 : 0;
        setCurrFirstImg(nextImg);
      }, stepInterval) as any;
    }
    return () => {
      clearInterval(autoPlayRef.current);
    };
  }, []);

  return (
    <div
      className="carouselWrapper"
      style={{
        height: `${parentHeight}px`,
        width: `${parentWidth}px`,
        perspective: '500px',
      }}
    >
      {imgList.map(({ url, id }, index: number) => {
        const dn = visibleItemsProps.order.indexOf(index) === -1;
        const styles = visibleItemsProps[index] ? visibleItemsProps[index].styles : {};
        return (
          <div
            key={id}
            className={`imgWrap ${dn ? 'dn' : ''}`}
            style={{
              ...styles,
              position: 'absolute',
              transition: `all ${duration}ms linear `,
            }}
            onClick={() => {
              changeCenter({ index, url });
            }}
          >
            <img src={url} alt={`img_${id}`} width={img_width} height={img_height} />
          </div>
        );
      })}
    </div>
  );
};
export default Carousel;
