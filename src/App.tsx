import React, { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppLayout } from "./types";
import DataContext from "./contexts/DataContext";
import Layout from "./containers/Layout/Layout";
import routesConfig, { RouteType } from "./routes";
import LoadingContext from "./contexts/LoadingContext";
import Loading from "./components/Loading/Loading";
import mockData from "./constants/mockData";
import GlobalContext, {
  FooterIconEnum,
  GlobalContextDispatcherType,
  GlobalContextStateType,
} from "./contexts/GlobalContext";

const defaultGlobalContext: GlobalContextStateType = {
  footerIconName: FooterIconEnum.Default,
  carouselVisible: false,
  shouldResetCasePage: false,
  shouldResetHomePage: false,
};

function RouteWithSubRoutes(route: RouteType) {
  return (
    <Route
      key={route.path as string}
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <route.component key={route.path} {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  const [globalState, setGlobalState] =
    useState<GlobalContextStateType>(defaultGlobalContext);

  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const timer = useRef<NodeJS.Timer>();

  const globalStateDispatcher: GlobalContextDispatcherType = useCallback(
    (newState) => {
      setGlobalState((prevState) => ({ ...prevState, ...newState }));
    },
    [setGlobalState]
  );
  const resizeHandler = () => {
    const designWidth = 1440;

    const size = document.documentElement.clientWidth / designWidth;
    const html = document.querySelector("html");
    if (html) {
      html.style.fontSize = `${size}px`;
    }
  };
  useEffect(() => {
    resizeHandler();
    window.onresize = resizeHandler;
    return () => {
      window.onresize = null;
    };
  }, []);

  const dispatchProgress = (v: number) => {
    setProgress(v);
  };

  const dispatchVisible = (v: boolean, delay = 200) => {
    if (!timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setVisible(v);
    }, delay);
  };

  useEffect(() => {
    dispatchProgress(50);
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{ dispatchProgress, dispatchVisible, visible }}
    >
      <GlobalContext.Provider
        value={{ state: globalState, dispatch: globalStateDispatcher }}
      >
        <BrowserRouter>
          <DataContext.Provider value={mockData as AppLayout}>
            <Loading progress={progress} visible={visible}>
              <Layout>
                <AnimatePresence exitBeforeEnter initial={false}>
                  <Switch
                    location={window.location as any}
                    key={window.location.pathname}
                  >
                    {routesConfig.map(({ ...rest }) => (
                      <RouteWithSubRoutes key={rest.path as string} {...rest} />
                    ))}
                  </Switch>
                </AnimatePresence>
              </Layout>
            </Loading>
          </DataContext.Provider>
        </BrowserRouter>
      </GlobalContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
