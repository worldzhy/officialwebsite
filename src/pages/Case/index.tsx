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

const StyledContainer = styled.div`
  display: flex;
  min-height: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  .left-panel {
    flex: 0 1 500px;
    display: flex;
    flex-direction: column;
    padding-left: 150px;
    h2 {
      max-width: 500px;
      font-size: 70px;
      line-height: 106px;
      font-weight: 500;
    }
    .desc-wrapper {
      margin-bottom: 20px;
      flex: 0 0 160px;
      font-size: 18px;
      line-height: 32px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
    .link-btn {
      margin: 10px 0;
      width: 130px;
      height: 33px;
    }
    .modal-trigger {
      margin: 10px 0;
      width: 20px;
      color: white;
    }
  }
  .right-panel {
    display: flex;
    align-items: flex-start;
    flex: 0 0 700px;
    image {
      object-fit: cover;
    }
  }
`;

const Case = () => {
  const {
    contents: { cases },
  } = useContext(DataContext);
  const [current, setCurrent] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const [enableScroll, setEnableScroll] = useState<boolean>(true);

  const slides: ISlideConfig[] = cases.map(
    ({ title, image, tags, description, id, primaryColor }, i) => {
      return {
        content: (
          <StyledContainer
            className={
              "case-content-wrapper md:justify-end md:items-end  xl:justify-center xl:items-center"
            }
            key={id}
            style={{
              backgroundColor: primaryColor,
              color: "white",
            }}
          >
            <div className={"left-panel"}>
              <h2 className={"truncate"}>{title}</h2>
              <CaseTags tags={tags} />
              <p className={"desc-wrapper overflow-ellipsis break-word"}>
                {description}
              </p>
              <button
                style={{
                  visibility: current === i ? "visible" : "hidden",
                  opacity: current === i ? 1 : 0,
                  transition: "all ease-in-out 1s 2s",
                }}
                className={
                  "bg-white text-black link-btn hover:shadow-lg hover:bg-gray-100"
                }
              >
                View Case Study
              </button>
              <button
                onClick={handleModalOpen}
                className={"modal-trigger"}
                style={{
                  visibility: current === i ? "visible" : "hidden",
                  opacity: current === i ? 1 : 0,
                  transform: current === i ? "scale(1)" : "scale(0.9)",
                  transition: "all ease-in .2s 2s",
                }}
              >
                <img src={"/image/category.png"} alt="category" />
              </button>
            </div>

            <motion.div className={"right-panel select-none"}>
              <img src={image} alt={`image case of ${title}`} />
            </motion.div>
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
          enableAutoScroll={enableScroll}
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
            <TinyCasePreview onClick={() => handlePreviewOnclick(i)} {...c} />
          ))}
          <i className={"lg:w-1/4 md:w-1/3 m-2"} />
          <i className={"lg:w-1/4 md:w-1/3 m-2"} />
        </RightPanel>
      </CaseModal>
    </div>
  );
};

export default Case;
