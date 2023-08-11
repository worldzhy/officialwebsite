import styled from "@emotion/styled";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  forwardRef,
  useCallback,
  ReactElement,
  CSSProperties,
  FunctionComponent,
  useImperativeHandle,
} from "react";
import {
  motion,
  animate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useGesture } from "@use-gesture/react";
import { mobileMedia } from "../../../constants";
import GlobalContext, { FooterIconEnum } from "../../../contexts/GlobalContext";

const StyledNavigator = styled.div`
  width: 100%;
  height: 60rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 72rem;
  z-index: 10;
  ${mobileMedia} {
    display: none;
    position: absolute;
    bottom: 140px;
  }
  & > div {
    width: 20px;
    height: 20px;
    cursor: pointer;
    opacity: 0.6;
    transition: all 1s ease;
    ${mobileMedia} {
      width: 16px;
      height: 16px;
    }
    &:hover {
      opacity: 1;
    }
  }

  .navigator-arrow-left {
    transform: rotate(-45deg);
    border-top: 1rem solid white;
    border-left: 1rem solid white;
    &:hover {
      transform: rotate(-45deg) scale(1.5);
    }
  }
  .navigator-arrow-right {
    transform: rotate(45deg);
    border-top: 1rem solid white;
    border-right: 1rem solid white;
    &:hover {
      transform: rotate(45deg) scale(1.5);
    }
  }
`;

const StyledCarouselWrapper = styled(motion.div)<{ bg?: string }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  background-image: ${({ bg }) => `url(${bg})`};
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    height: 104rem;
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    width: 100%;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    opacity: 0.8;
    mix-blend-mode: normal;
    background-position-x: 293rem;
  }
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
    margin-left: 24rem;
  }

  .indicator-wrapper.bottom {
    bottom: 160rem;
    align-items: center;
    justify-content: center;
    ${mobileMedia} {
      display: flex;
      width: 90px;
      bottom: 100px;
      justify-content: space-between;
      align-items: center;
    }
  }

  .indicator-wrapper.top {
    top: 50rem;
    align-items: center;
    justify-content: center;
    ${mobileMedia} {
      top: 60px;
    }
  }

  .indicator-item {
    display: block;
    width: 8rem;
    height: 8rem;
    margin-right: 24rem;
    border-radius: 50%;
    position: relative;
    background-color: gray;
    z-index: 1;
    ${mobileMedia} {
      width: 6px;
      height: 6px;
    }
  }

  .indicator-item::after {
    transition: all 3s ease-in;
    ${mobileMedia} {
      transition: all 0.2s ease-in;
    }
  }

  .indicator-item.inactive::after {
    width: 0;
  }

  .indicator-item.inactive::before {
    position: absolute;
    width: 100%;
    padding-top: 10rem;
    padding-bottom: 10rem;
    left: 0;
    content: "";
    cursor: pointer;
    ${mobileMedia} {
      width: 6px;
      height: 6px;
    }
  }

  .indicator-item.active::after {
    position: absolute;
    width: 8rem;
    height: 8rem;
    left: 0;
    content: "";
    border-radius: 100%;
    z-index: 2;
    background-color: azure;
    ${mobileMedia} {
      width: 6px;
      height: 6px;
    }
  }
`;

type Position = "top" | "bottom";

interface CarouselProps {
  children: ReactElement[];
  indicatorPosition: Position;
  styles: CSSProperties;
  extraComponent: ReactElement;
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
  direction: number;
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
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-position-x: 293rem;
    img {
      position: relative;
      top: 331rem;
      left: 248rem;
      width: 66rem;
      height: 65rem;
      ${mobileMedia} {
        top: 270px;
        left: 16px;
      }
    }
  }
`;

const variants = {
  enter: {
    opacity: 0,
  },
  center: (active: boolean) => ({
    zIndex: 1,
    x: 0,
    opacity: active ? 1 : 0,
  }),
  exit: {
    opacity: 0,
  },
};

export const CarouselItem: FunctionComponent<CarouselItemProps> = (props) => {
  const { children, direction, active } = props;
  const x = useMotionValue(0);
  useEffect(() => {
    if (active) {
      animate(x, [direction > 0 ? 100 : -100, 0], {
        type: "spring",
        duration: 0.3,
      });
    } else {
      animate(x, [0, direction > 0 ? -400 : 400], {
        type: "spring",
        duration: 0.3,
      });
    }
  }, [active, direction, x]);
  return (
    <MotionBox
      variants={variants}
      custom={active}
      initial={"enter"}
      animate={"center"}
      exit={"exit"}
      transition={{
        type: "tween",
        duration: 0.3,
      }}
      style={{ x }}
    >
      <div className={"header-mask"} />
      {children}
      <div className={"mask"}>
        <img
          src={"/images/carousel_mask_bg.png"}
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
    styles,
    extraComponent,
  } = props;

  const { dispatch } = useContext(GlobalContext);
  const [autoPlay, setAutoPlay] = useState(autoPlayProps);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [[current, direction], setCurrent] = useState([0, 0]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
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

  useEffect(() => {
    dispatch({ footerIconName: FooterIconEnum.Triangle });
    return () => {
      dispatch({ footerIconName: FooterIconEnum.Default });
    };
  }, [dispatch]);

  useEffect(() => {
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

  const pause = useCallback(() => {
    setAutoPlay(false);
  }, []);

  const play = () => {
    setAutoPlay(true);
  };

  const bind = useGesture(
    {
      onDragEnd: ({ delta: [x] }: any) => {
        if (x > 0) {
          onPrev();
        } else {
          onNext();
        }
      },
    },
    {
      drag: { axis: "x", threshold: 20, delay: 1000 },
    }
  );

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
      initial={{ y: "100%", opacity: 0 }}
      exit={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.5 }}
      bg={styles?.backgroundImage}
      className={`${prefixCls}item-wrapper`}
      ref={wrapperRef}
    >
      <AnimatePresence exitBeforeEnter initial={false}>
        {[...children].map((child, index) => (
          <div key={index} {...bind()}>
            <CarouselItem
              prefixCls={prefixCls}
              active={current % children.length === index}
              direction={direction}
            >
              {child}
            </CarouselItem>
          </div>
        ))}
      </AnimatePresence>
      {showNavigator && <CarouselNavigator onPrev={onPrev} onNext={onNext} />}
      {extraComponent}
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
