import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ISlideConfig, PageSlides, SlideParallaxType } from "react-page-slides";
import styled from "@emotion/styled";
import DataContext from "../../contexts/DataContext";
import LeftPanel from "./components/CaseModal/LeftPanel";
import RightPanel from "./components/CaseModal/RightPanel";
import TinyCasePreview from "./components/TinyCasePreview";
import CaseTags from "./components/CaseTags";
import CaseModal from "./components/CaseModal/CaseModal";
import { enterAnimation } from "../../constants/animation";
import LoadingContext from "../../contexts/LoadingContext";
import Category from "../../components/Icons/Category";
import GlobalContext, { FooterIconEnum } from "../../contexts/GlobalContext";

const StyledContainer = styled(motion.div)`
  display: flex;
  min-height: 100%;
  padding-top: 100rem;
  padding-bottom: 90rem;
  justify-content: space-between;
  align-items: flex-start;
  .left-panel {
    font-family: Prompt;
    flex: 0 1 494rem;
    display: flex;
    flex-direction: column;
    position: relative;
    left: 150rem;
    top: 85rem;
    height: auto;
    h2 {
      max-width: 500rem;
      font-size: 70rem;
      line-height: 106rem;
      font-weight: 500;
      margin-bottom: 10rem;
    }
    .desc-wrapper {
      margin-bottom: 75rem;
      flex: 0 0 160rem;
      font-family: Prompt-Light;
      font-size: 18rem;
      line-height: 32rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
    .link-btn {
      width: 130rem;
      height: 33rem;
      line-height: 33rem;
      font-size: 14rem;
    }
    .modal-trigger {
      position: fixed;
      left: 150rem;
      bottom: 100rem;
      width: 20rem;
      color: white;
    }
  }
  .right-panel {
    justify-content: flex-end;
    display: flex;
    flex: 1;
    width: 100%;
    position: relative;
    top: -15rem;
    img {
      flex: 1;
      width: 100%;
      object-fit: cover;
    }
  }
`;

const Case = () => {
  const {
    contents: { cases },
  } = useContext(DataContext);
  const {
    state: { shouldResetCasePage },
    dispatch,
  } = useContext(GlobalContext);
  const { visible, dispatchVisible, dispatchProgress } =
    useContext(LoadingContext);
  const [current, setCurrent] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const [enableScroll, setEnableScroll] = useState<boolean>(true);

  useEffect(() => {
    if (shouldResetCasePage) {
      setCurrent(0);
      dispatch({ shouldResetCasePage: false });
    }
  }, [dispatch, shouldResetCasePage]);

  useEffect(() => {
    if (current === cases.length - 1) {
      dispatch({ footerIconName: FooterIconEnum.Triangle });
    } else {
      dispatch({ footerIconName: FooterIconEnum.Default });
    }
    const meta = document.querySelector("meta[name=theme-color]");
    if (meta) {
      meta.setAttribute("content", cases[current].primaryColor);
    }
    return () => {
      if (meta) {
        meta.setAttribute("content", "#000000");
      }
    };
  }, [cases, current, dispatch]);
  useEffect(() => {
    if (visible) {
      dispatchProgress(100);
      dispatchVisible(false, 1000);
    }
  }, [dispatchProgress, dispatchVisible, visible]);
  const slides: ISlideConfig[] = cases.map(
    ({ title, image, tags, description, id, primaryColor }, i) => {
      return {
        content: (
          <StyledContainer
            className={"case-content-wrapper"}
            key={id}
            style={{
              backgroundColor: primaryColor,
              color: "white",
            }}
            {...enterAnimation}
          >
            <div className={"left-panel"}>
              <h2 className={"truncate"}>{title}</h2>
              <CaseTags tags={tags} />
              <p className={"desc-wrapper overflow-ellipsis break-word"}>
                {description}
              </p>
              <button
                style={{
                  color: primaryColor,
                }}
                className={
                  "bg-white text-black link-btn hover:shadow-lg hover:bg-gray-100"
                }
              >
                View Case Study
              </button>
              <button onClick={handleModalOpen} className={"modal-trigger"}>
                <Category />
              </button>
            </div>

            <div className={"right-panel select-none"}>
              <img src={image} alt="" />
            </div>
          </StyledContainer>
        ),
        style: { backgroundColor: primaryColor },
      };
    }
  );

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setEnableScroll(false);
      }, 400);
    } else {
      setEnableScroll(true);
    }
  }, [modalVisible]);

  const handlePreviewOnclick = (i: number) => {
    setCurrent(i);
    setModalVisible(false);
  };
  return (
    <div
      ref={ref}
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
    >
      {enableScroll && (
        <PageSlides
          enableAutoScroll={!shouldResetCasePage}
          currentSlideIndex={current}
          transitionSpeed={1000}
          slides={slides}
          parallax={{ offset: 0, type: SlideParallaxType.reveal }}
          onChange={(next) => {
            if (!modalVisible) {
              setCurrent(next);
            }
          }}
        />
      )}

      <CaseModal visible={modalVisible}>
        <LeftPanel
          onClose={() => {
            setModalVisible(false);
          }}
        />
        <RightPanel>
          {cases.map((c, i) => (
            <TinyCasePreview
              key={c.id}
              onClick={() => handlePreviewOnclick(i)}
              {...c}
            />
          ))}
          <i className={"lg:w-1/4 md:w-1/3 m-2"} />
          <i className={"lg:w-1/4 md:w-1/3 m-2"} />
        </RightPanel>
      </CaseModal>
    </div>
  );
};

export default Case;
