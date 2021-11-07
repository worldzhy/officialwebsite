import { createContext } from "react";

export type LoadingContextType = {
  dispatchVisible: (value: boolean, delay?: number) => void;
  dispatchProgress: (value: number) => void;
  visible: boolean;
};
const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType
);
export default LoadingContext;
