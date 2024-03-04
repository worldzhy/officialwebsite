import {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { PAGInit } from "libpag";
import { useMediaQuery } from "usehooks-ts";
import { useLocation } from "react-router-dom";
import { useDataContext } from "./DataContext";
import LoadingContext from "./LoadingContext";
import { MobileMediaQuery } from "../constants";

type PagFile = {
  current: any;
  transition?: any;
  reverse?: any;
};

export interface PagContextProps {
  PAG: any;
  pagFiles: PagFile[];
}

const HomePagePath = "/home";

const PagContext = createContext<PagContextProps>(undefined!);

const PagProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const pagRef = useRef<any>();
  const [pag, setPag] = useState<any>(null);
  const [pagFiles, setPagFiles] = useState<PagFile[]>([]);
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(MobileMediaQuery);
  const { dispatchProgress } = useContext(LoadingContext);
  const {
    contents: {
      home: { videos },
    },
  } = useDataContext();

  const fetchFile = (url: string) =>
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then(async (buffer) => {
        const { PAGFile } = pagRef.current;
        const pagFile = await PAGFile.load(buffer);
        return pagFile;
      });
  const handleLoadFile = async (index: number) => {
    if (!pagFiles[index] && videos[index]) {
      const {
        video: { mobileCurrent, mobileTransition, mobileReverse },
      } = videos[index];
      pagFiles[index] = {
        current: await fetchFile(mobileCurrent),
        transition: mobileTransition
          ? await fetchFile(mobileTransition)
          : undefined,
        reverse: mobileReverse ? await fetchFile(mobileReverse) : undefined,
      };
      setPagFiles([...pagFiles]);
      handleLoadFile(index + 1);
    }
  };
  const updateProgress = (progress: number) => {
    if (HomePagePath === pathname) {
      dispatchProgress(progress);
    }
  };

  useEffect(() => {
    if (!isMobile) return;
    PAGInit().then(async (p) => {
      pagRef.current = p;
      updateProgress(60);
      await handleLoadFile(0);
      updateProgress(80);
      setPag(p);
    });
  }, []);

  return (
    <PagContext.Provider value={{ PAG: pag, pagFiles }}>
      {children}
    </PagContext.Provider>
  );
};

export const usePagContext = () => {
  const context = useContext(PagContext);
  if (!context) {
    throw new Error("usePagContext should be used within the PagProvider!");
  }

  return context;
};

export default PagProvider;
