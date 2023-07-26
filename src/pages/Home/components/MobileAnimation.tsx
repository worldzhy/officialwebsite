import { FC, useRef, useState, useEffect, useContext } from "react";
import { PAGInit } from "libpag";
import { motion } from "framer-motion";
import { HomeVideoProps } from "../../../types";
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
};

type PagFile = {
  current: any;
  transition?: any;
  reverse?: any;
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
}) => {
  const { dispatchVisible, dispatchProgress, visible } =
    useContext(LoadingContext);
  const pagRef = useRef<any>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pagFiles, setPagFile] = useState<PagFile[]>([]);
  const [canPreload, setCanPreload] = useState(false);
  const [pagView, setPagView] = useState<any>();
  const [startTransition, setStartTransition] = useState(false);

  const handleRepeat = () => {
    if (!startTransition) return;
    const next = canTransition ? current + 1 : current - 1;
    const pagFile = pagFiles[next]?.current;
    if (pagFile) {
      pagView.pause();
      pagView.setComposition(pagFile);
      pagView.setProgress(0);
      pagView.play();
      setShouldReverse(false);
      setCanTransition(false);
      setStartTransition(false);
      setCurrent(next);
    }
  };
  const fetchFile = (url: string) =>
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then(async (buffer) => {
        const { PAGFile } = pagRef.current;
        const pagFile = await PAGFile.load(buffer);
        return pagFile;
      });
  const handleLoadFile = async (index: number) => {
    if (!pagFiles[index]) {
      const {
        video: { mobileCurrent, mobileTransition, mobileReverse },
      } = videos[index];
      const currentFile = await fetchFile(mobileCurrent);
      let transitionFile = "";
      let reverseFile = "";

      if (mobileTransition) {
        transitionFile = await fetchFile(mobileTransition);
      }
      if (mobileReverse) {
        reverseFile = await fetchFile(mobileReverse);
      }
      const files = {
        current: currentFile,
        transition: transitionFile || undefined,
        reverse: reverseFile || undefined,
      };
      pagFiles[index] = files;
      setPagFile(pagFiles);
      return files;
    }
    return null;
  };

  useEffect(() => {
    PAGInit().then(async (p) => {
      const { PAGView } = p;
      pagRef.current = p;
      dispatchProgress(60);
      const files = await handleLoadFile(0);
      dispatchProgress(80);
      if (files && canvasRef.current) {
        const canvas = canvasRef.current;
        const currentSrc = files.current;
        canvas.width = currentSrc.width();
        canvas.height = currentSrc.height();
        const pv = await PAGView.init(currentSrc, canvas);
        if (pv) {
          setPagView(pv);
          pv.setRepeatCount(0);
          await pv.play();
          dispatchProgress(100);
          dispatchVisible(false, 500);
          setCanPreload(true);
        }
      }
    });
  }, []);
  useEffect(() => {
    const next = current + 1;
    if (canPreload && !pagFiles[next] && videos[next]) {
      handleLoadFile(next);
    }
  }, [current, canPreload, pagFiles, videos]);
  useEffect(() => {
    if (!canTransition && !shouldReverse) return;
    const files = pagFiles[current];
    const pagFile = canTransition ? files?.transition : files?.reverse;
    if (pagFile) {
      pagView.pause();
      pagView.setComposition(pagFile);
      pagView.setProgress(0);
      pagView.play();
      setStartTransition(true);
    }
  }, [pagFiles, current, canTransition, shouldReverse, pagView]);
  useEffect(() => {
    if (pagView) {
      pagView.removeListener("onAnimationRepeat");
      pagView.addListener("onAnimationRepeat", handleRepeat);
    }
  });

  return (
    <>
      {videos.map(({ texts }, i) => (
        <div className="mobile-animation" key={i}>
          <motion.div
            className="text-wrapper position-top"
            style={{
              maxHeight: "50%",
              zIndex: currentText === i ? 2 : -1,
              visibility: currentText === i ? "visible" : "hidden",
            }}
          >
            <motion.ul>
              {texts.heading.map((text, index) => (
                <motion.li
                  key={`${i}-heading-${index}`}
                  transition={textTransition(index, texts.heading.length)}
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
    </>
  );
};

export default MobileAnimation;
