import styled from "@emotion/styled";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ISlideConfig, PageSlides, SlideParallaxType } from "react-page-slides";
import { mobileMedia } from "../../constants";
import { enterAnimation } from "../../constants/animation";
import GlobalContext, { FooterIconEnum } from "../../contexts/GlobalContext";
import CaseTags from "./components/CaseTags";
import Close from "../../components/Icons/Close";
import Category from "../../components/Icons/Category";
import LeftPanel from "./components/CaseModal/LeftPanel";
import CaseModal from "./components/CaseModal/CaseModal";
import DownArrow from "../../components/Icons/DownArrow";
import RightPanel from "./components/CaseModal/RightPanel";
import TinyCasePreview from "./components/TinyCasePreview";
import LoadingContext from "../../contexts/LoadingContext";
import { useDataContext } from "../../contexts/DataContext";

const StyledContainer = styled(motion.div)`
  display: flex;
  height: 100vh;
  padding-top: 100rem;
  padding-bottom: 90rem;
  justify-content: space-between;
  align-items: flex-start;
  ${mobileMedia} {
    height: 100%;
    flex-direction: column;
    justify-content: normal;
  }
  .left-panel {
    font-family: Prompt;
    flex: 0 1 494rem;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 85rem 0 0 150rem;
    height: auto;
    ${mobileMedia} {
      padding-left: 20px;
    }
    h2 {
      max-width: 500rem;
      font-size: 70rem;
      line-height: 106rem;
      font-weight: 500;
      margin-bottom: 10rem;
      ${mobileMedia} {
        max-width: 100%;
        font-size: 32px;
        line-height: 48px;
        font-weight: 500;
        margin: 20px 0 10px 0;
      }
    }
    .desc-wrapper {
      margin-bottom: 75rem;
      flex: 0 0 160rem;
      font-family: Prompt;
      font-size: 18px;
      line-height: 32px;
      min-height: 166px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      ${mobileMedia} {
        flex: 1;
        font-size: 18px;
        line-height: 32px;
        margin-bottom: 20px;
        min-height: auto;
        -webkit-line-clamp: 8;
      }
    }
    .link-btn {
      width: 160px;
      height: 33px;
      line-height: 33px;
      font-size: 14px;
    }
    .modal-trigger {
      position: fixed;
      left: 150rem;
      bottom: 100rem;
      width: 24rem;
      color: white;
      ${mobileMedia} {
        position: relative;
        width: 26px;
        right: 20px;
        margin-left: auto;
        right: 20px;
        left: auto;
      }
    }
  }
  .right-panel {
    display: flex;
    flex: 1;
    width: 100%;
    position: relative;
    top: -15rem;
    justify-content: flex-end;
    ${mobileMedia} {
      max-height: 50vh;
    }
    img {
      flex: 1;
      width: 100%;
      object-fit: cover;
      ${mobileMedia} {
        max-height: 100vw;
      }
    }
  }
  .down-arrow {
    display: none;
    ${mobileMedia} {
      position: absolute;
      display: block;
      top: 82vh;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 9;
    }
  }
`;
const StyleCloseBtn = styled.div`
  display: none;
  ${mobileMedia} {
    position: fixed;
    display: flex;
    width: 100%;
    height: 40px;
    bottom: 40px;
    align-items: center;
    justify-content: center;
  }
  svg {
    ${mobileMedia} {
      width: 34px;
      height: 34px;
    }
  }
`;

const Case: FC = () => {
  const {
    contents: { cases, caseStudyBtn },
  } = useDataContext();
  const {
    state: { shouldResetCasePage },
    dispatch,
  } = useContext(GlobalContext);
  const { visible, dispatchVisible, dispatchProgress } =
    useContext(LoadingContext);
  const [current, setCurrent] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const [enableScroll, setEnableScroll] = useState<boolean>(true);

  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handlePreviewOnclick = (i: number) => {
    setCurrent(i);
    setModalVisible(false);
  };

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
  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setEnableScroll(false);
      }, 400);
    } else {
      setEnableScroll(true);
    }
  }, [modalVisible]);

  const slides: ISlideConfig[] = cases.map(
    ({ title, image, tags, description, id, primaryColor }, index) => ({
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
              className={
                "bg-white text-black link-btn hover:shadow-lg hover:bg-gray-100"
              }
            >
              {caseStudyBtn}
            </button>
            <button onClick={handleModalOpen} className={"modal-trigger"}>
              <Category />
            </button>
          </div>
          <div className={"right-panel select-none"}>
            <img src={image} alt="" />
          </div>
          {index !== cases.length - 1 && (
            <DownArrow width="22px" height="10px" className="down-arrow" />
          )}
        </StyledContainer>
      ),
      style: { backgroundColor: primaryColor },
    })
  );

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
          <StyleCloseBtn>
            <button
              onClick={() => {
                setModalVisible(false);
              }}
            >
              <Close />
            </button>
          </StyleCloseBtn>
          <i className={"lg:w-1/4 md:w-1/3 m-2"} />
          <i className={"lg:w-1/4 md:w-1/3 m-2"} />
        </RightPanel>
      </CaseModal>
    </div>
  );
};

export default Case;
