import React from "react";

export enum FooterIconEnum {
  Default = "default",
  Triangle = "triangle",
}

export type GlobalContextStateType = {
  footerIconName: FooterIconEnum;
  carouselVisible: boolean;
  shouldResetHomePage: boolean;
  shouldResetCasePage: boolean;
};

export type GlobalContextDispatcherType<S = Partial<GlobalContextStateType>> = (
  newState: S
) => void;
export type GlobalContextType = {
  state: GlobalContextStateType;
  dispatch: GlobalContextDispatcherType;
};

const GlobalContext = React.createContext<GlobalContextType>(
  null as unknown as GlobalContextType
);

export default GlobalContext;
