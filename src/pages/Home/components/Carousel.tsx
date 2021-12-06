import styled from "@emotion/styled";
import React, {
  FunctionComponent,
  CSSProperties,
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  ReactElement,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

const StyledNavigator = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 72rem;
  z-index: 10;
  & > div {
    width: 20rem;
    height: 20rem;
    cursor: pointer;
    opacity: 0.5;
    transition: all ease-in 0.2s;
    &:hover {
      opacity: 1;
    }
  }

  .navigator-arrow-left {
    transform: rotate(-45deg);
    border-top: 1rem solid white;
    border-left: 1rem solid white;
    &:hover {
      transform: rotate(-45deg) scale(1.2);
    }
  }
  .navigator-arrow-right {
    transform: rotate(45deg);
    border-top: 1rem solid white;
    border-right: 1rem solid white;
    &:hover {
      transform: rotate(45deg) scale(1.2);
    }
  }
`;

const StyledCarouselWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .carousel-items-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .indicator-wrapper {
    display: flex;
    width: 100%;
    position: absolute;
  }

  .indicator-wrapper.bottom {
    bottom: 90rem;
    align-items: center;
    justify-content: center;
  }

  .indicator-wrapper.top {
    top: 50rem;
    align-items: center;
    justify-content: center;
  }

  .indicator-item {
    background-color: gray;
    width: 8rem;
    height: 8rem;
    z-index: 1;
    display: block;
    margin-right: 24rem;
    border-radius: 50%;
    position: relative;
  }

  .indicator-item::after {
    transition: all 3s ease-in;
  }

  .indicator-item.inactive::after {
    width: 0;
  }

  .indicator-item.inactive::before {
    position: absolute;
    left: 0;
    content: "";
    width: 100%;
    padding-top: 10rem;
    padding-bottom: 10rem;
    cursor: pointer;
  }

  .indicator-item.active::after {
    z-index: 2;
    content: "";
    width: 8rem;
    height: 8rem;
    border-radius: 100%;
    background-color: azure;
    position: absolute;
    left: 0;
  }
`;

type Position = "top" | "bottom";

interface CarouselProps {
  children: ReactElement[];
  indicatorPosition: Position;
  styles: CSSProperties;
  showIndicator?: boolean;
  infinite: boolean;
  delay: number;
  autoPlay: boolean;
  prefixCls: string;
  showNavigator?: boolean;
}

interface NavigatorProps {
  onPrev: () => void;
  onNext: () => void;
}

interface RefProps extends NavigatorProps {
  goTo: (n: number) => void;
  pause: () => void;
  play: () => void;
  element: HTMLDivElement | null;
}

interface IndicatorProps
  extends Pick<CarouselProps, "indicatorPosition" | "prefixCls"> {
  current: number;
  count: number;
  delay: number;
  enableIndicatorClick?: boolean;
  handleJump: (to: number) => void;
}
interface CarouselItemProps {
  prefixCls: string;
  active: boolean;
}
const MotionBox = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .header-mask {
    position: absolute;
    top: 0;
    height: 104rem;
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    width: 100%;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    opacity: 0.8;
    mix-blend-mode: normal;
    background-position-x: 293rem;
    img {
      position: relative;
      top: 331rem;
      left: 291rem;
      width: 66rem;
      height: 65rem;
      //opacity: 0.1;
    }
  }
`;

const variants = {
  enter: (direction: number) => {
    return {
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    };
  },
};

export const CarouselItem: FunctionComponent<CarouselItemProps> = (props) => {
  const { children } = props;
  return (
    <MotionBox
      variants={variants}
      initial={"enter"}
      animate={"center"}
      exit={"exit"}
    >
      <div className={"header-mask"} />
      {children}
      <div className={"mask"}>
        <img
          src={"/image/carousel_mask_bg.png"}
          className={"mask-image"}
          alt={""}
        />
      </div>
    </MotionBox>
  );
};

const CarouselNavigator: FunctionComponent<NavigatorProps> = (props) => {
  const { onNext, onPrev } = props;
  return (
    <StyledNavigator>
      <div className={"navigator-arrow-left"} onClick={onPrev} />
      <div className={"navigator-arrow-right"} onClick={onNext} />
    </StyledNavigator>
  );
};
const CarouselIndicator: FunctionComponent<IndicatorProps> = (props) => {
  const {
    current,
    count,
    indicatorPosition,
    enableIndicatorClick = false,
    handleJump,
    prefixCls,
  } = props;
  return (
    <div className={`${prefixCls}indicator-wrapper ${indicatorPosition}`}>
      {new Array(count).fill(undefined).map((_, index) => (
        <div
          key={index}
          className={`${prefixCls}indicator-item ${
            current === index ? "active" : "inactive"
          }`}
          onClick={() => enableIndicatorClick && handleJump(index)}
        />
      ))}
    </div>
  );
};

const Carousel = forwardRef<
  HTMLDivElement,
  Partial<CarouselProps> & Pick<CarouselProps, "children">
>((props, ref) => {
  const {
    children,
    indicatorPosition = "bottom",
    showIndicator = true,
    showNavigator = true,
    infinite = true,
    delay = 3000,
    autoPlay: autoPlayProps = true,
    prefixCls = "",
  } = props;

  const [autoPlay, setAutoPlay] = useState(autoPlayProps);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [[current, direction], setCurrent] = React.useState([0, 0]);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const onPrev = useCallback(() => {
    if (infinite || current > 0) {
      setCurrent(([prev]) => [prev - 1, -1]);
    }
    if (infinite && current <= 0) {
      setCurrent(([prev]) => [prev + children.length, -1]);
    }
  }, [children.length, current, infinite]);

  const onNext = useCallback(() => {
    if (current < children?.length || infinite) {
      setCurrent(([prev]) => [prev + 1, 1]);
    }
  }, [children.length, current, infinite]);

  React.useEffect(() => {
    if (autoPlay) {
      timerRef.current = setTimeout(onNext, delay) as NodeJS.Timeout;
    }
  }, [current, autoPlay, onNext, delay]);

  const goTo = (target: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current as NodeJS.Timeout);
    }
    setCurrent([target, 1]);
  };

  const pause = React.useCallback(() => {
    setAutoPlay(false);
  }, []);

  const play = () => {
    setAutoPlay(true);
  };

  useImperativeHandle<unknown, RefProps>(ref, () => ({
    onPrev,
    onNext,
    goTo,
    pause,
    play,
    element: wrapperRef.current,
  }));

  return (
    <StyledCarouselWrapper
      initial={{ y: "100%", opacity: 0, scale: 0.6 }}
      exit={{ y: "100%", opacity: 0, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      className={`${prefixCls}item-wrapper`}
      ref={wrapperRef}
    >
      <AnimatePresence initial={false} custom={direction}>
        {
          [...children].map((child, index) => (
            <CarouselItem
              key={index}
              prefixCls={prefixCls}
              active={current % children.length === index}
            >
              {child}
            </CarouselItem>
          ))[current % children.length]
        }
      </AnimatePresence>
      {showNavigator && <CarouselNavigator onPrev={onPrev} onNext={onNext} />}
      {showIndicator && (
        <CarouselIndicator
          prefixCls={prefixCls}
          enableIndicatorClick
          handleJump={goTo}
          delay={!autoPlay ? Infinity : delay}
          count={[...children].length}
          current={Math.abs(current % children.length)}
          indicatorPosition={indicatorPosition}
        />
      )}
    </StyledCarouselWrapper>
  );
});

export default Carousel;
