import { FC, useRef, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { HomeVideoProps } from "../../../types";
import DownArrow from "../../../components/Icons/DownArrow";
import { usePagContext } from "../../../contexts/PagContext";
import LoadingContext from "../../../contexts/LoadingContext";

type IProps = {
  videos: HomeVideoProps[];
  current: number;
  setCurrent: (value: number) => void;
  canTransition: boolean;
  setCanTransition: (value: boolean) => void;
  shouldReverse: boolean;
  setShouldReverse: (value: boolean) => void;
  currentText: number;
  textTransition: (index: number, lenght: number) => any;
  textAnimation: any;
  setCurrentText: (value: number) => void;
};

const MobileAnimation: FC<IProps> = ({
  videos,
  current,
  setCurrent,
  canTransition,
  setCanTransition,
  shouldReverse,
  setShouldReverse,
  currentText,
  textTransition,
  textAnimation,
  setCurrentText,
}) => {
  const { dispatchVisible, dispatchProgress } = useContext(LoadingContext);
  const { PAG, pagFiles } = usePagContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTransitionRef = useRef<boolean>(false);
  const pagViewRef = useRef<any>();

  const handleEnd = (ct = canTransition) => {
    if (!startTransitionRef.current) return;
    const pagView = pagViewRef.current;
    const next = ct ? current + 1 : current - 1;
    const pagFile = pagFiles[next]?.current;
    if (pagFile) {
      pagView.pause();
      pagView.setComposition(pagFile);
      pagView.setProgress(0);
      pagView.setRepeatCount(0);
      pagView.play();
      setShouldReverse(false);
      setCanTransition(false);
      startTransitionRef.current = false;
      setCurrent(next);
    }
  };
  const handleRestart = () => {
    const pagView = pagViewRef.current;
    const pagFile = pagFiles[current]?.current;
    if (pagView && pagFile) {
      pagView.pause();
      pagView.setComposition(pagFile);
      pagView.setProgress(0);
      pagView.setRepeatCount(0);
      pagView.play();
      setShouldReverse(false);
      setCanTransition(false);
      startTransitionRef.current = false;
      setCurrentText(0);
    }
  };
  const initPag = async () => {
    const files = pagFiles[0];
    const canvas = canvasRef.current;
    if (PAG && files && canvas) {
      const { PAGView } = PAG;
      const currentSrc = files.current;
      canvas.width = currentSrc.width();
      canvas.height = currentSrc.height();
      const pv = await PAGView.init(currentSrc, canvas);
      if (pv) {
        dispatchProgress(100);
        dispatchVisible(false, 500);
        pagViewRef.current = pv;
        pv.setProgress(0);
        pv.setRepeatCount(0);
        await pv.play();
      }
    }
  };

  useEffect(() => {
    if (!pagViewRef.current) {
      initPag();
    }
  }, [PAG, pagFiles, canvasRef.current]);
  useEffect(() => {
    if (!canTransition && !shouldReverse) return;
    if (startTransitionRef.current) {
      handleEnd();
    } else {
      const pagView = pagViewRef.current;
      const files = pagFiles[current];
      const pagFile = canTransition ? files?.transition : files?.reverse;
      if (pagFile) {
        pagView.pause();
        pagView.setComposition(pagFile);
        pagView.setRepeatCount(1);
        pagView.setProgress(0);
        pagView.play();
        startTransitionRef.current = true;
      }
    }
  }, [pagFiles, current, canTransition, shouldReverse, pagViewRef.current]);
  useEffect(() => {
    const pagView = pagViewRef.current;
    if (pagView) {
      pagView.removeListener("onAnimationEnd");
      pagView.addListener("onAnimationEnd", () => handleEnd());
    }
  });
  useEffect(() => {
    if (Math.abs(current - currentText) >= 2) {
      handleRestart();
    }
  }, [current, currentText]);

  return (
    <>
      {videos.map(({ texts }, i) => (
        <div className="mobile-animation" key={i}>
          <motion.div
            className="text-wrapper position-top"
            style={{
              maxHeight: "50vh",
              zIndex: currentText === i ? 2 : -1,
              visibility: currentText === i ? "visible" : "hidden",
            }}
          >
            <motion.ul>
              {texts.heading.map((text, index) => (
                <motion.li
                  key={`${i}-heading-${index}`}
                  transition={textTransition(index, texts.heading.length)}
                  style={{ textAlign: "center" }}
                  animate={
                    currentText === i
                      ? {
                          ...textAnimation,
                        }
                      : { opacity: 0, y: 50 }
                  }
                >
                  <span className={"heading"}>{text}</span>
                </motion.li>
              ))}
              {texts.subtitle?.map((text, index) => {
                return (
                  <motion.li
                    className={"text-center"}
                    key={`${i}-sub-title-${index}`}
                    transition={textTransition(
                      texts.heading.length + index + 1,
                      texts.heading.length + (texts.subtitle?.length || 0)
                    )}
                    animate={
                      currentText === i
                        ? {
                            ...textAnimation,
                          }
                        : { opacity: 0, y: 50 }
                    }
                  >
                    <span className={"subtitle"}>{text}</span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      ))}
      <canvas className="animation-canvas" ref={canvasRef}></canvas>
      <DownArrow width="22px" height="10px" className="down-arrow" />
    </>
  );
};

export default MobileAnimation;
