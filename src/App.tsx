import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppLayout } from "./types";
import DataContext from "./contexts/DataContext";
import Layout from "./containers/Layout/Layout";
import routesConfig, { RouteType } from "./routes";

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
  const mockData: AppLayout = {
    headers: {
      logo: "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/logo-white.png",
      name: "inceptionpad",
      items: [
        { label: "home", path: "/home" },
        { label: "case", path: "/case" },
        { label: "contact", path: "/contact" },
      ],
    },
    contents: {
      home: [
        {
          text: "test",
          position: "center",
          video: {
            current: "http://localhost:8000/page-00-00.mp4",
            transition: "http://localhost:8000/page-00-01.mp4",
          },
        },
        {
          text: "test1",
          position: "left",
          video: {
            current: "http://localhost:8000/page-01-01.mp4",
            transition: "http://localhost:8000/page-01-02.mp4",
          },
        },
        {
          text: "test2",
          position: "left",
          video: {
            current: "http://localhost:8000/page-02-02.mp4",
            transition: "http://localhost:8000/page-02-03.mp4",
          },
        },
        {
          text: "test3",
          position: "left",
          video: {
            current: "http://localhost:8000/page-03-03.mp4",
          },
        },
      ],
      cases: [
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "black",
          image: "http://localhost:8000/1.png",
          thumbImage:
            "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
          id: "1",
          tags: ["Big Data", "AI"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "pink",
          image: "http://localhost:8000/1.png",
          thumbImage:
            "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
          id: "2",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "grey",
          image: "http://localhost:8000/1.png",
          thumbImage:
            "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
          id: "3",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "black",
          image: "http://localhost:8000/1.png",
          thumbImage:
            "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
          id: "4",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "pink",
          image: "http://localhost:8000/1.png",
          thumbImage:
            "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
          id: "5",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "grey",
          image: "http://localhost:8000/1.png",
          thumbImage:
            "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
          id: "6",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "black",
          image: "http://localhost:8000/1.png",
          thumbImage:
            "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
          id: "7",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "pink",
          image: "http://localhost:8000/1.png",
          thumbImage:
            "https://officialwebsite-067174804713.s3.amazonaws.com/deletable_tmp_images/case-171346.png",
          id: "8",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "grey",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "9",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "black",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "10",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "pink",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "11",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "grey",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "12",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "black",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "12",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "pink",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "14",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "grey",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "15",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "black",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "16",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "pink",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "17",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "grey",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "18",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "black",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "19",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "pink",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "20",
          tags: ["Big Data"],
        },
        {
          title: "TitanHouse",
          description:
            "Three-time successful exit team choosing InceptionPad as the core developer of their platform" +
            "Rapid implementation of functions" +
            "Start from the business value proposition, not requirement sheets",
          primaryColor: "grey",
          image: "http://localhost:8000/1.png",
          thumbImage: "http://localhost:8000/1-mini.png",
          id: "21",
          tags: ["Big Data"],
        },
      ],
    },
  };
  return (
    <BrowserRouter>
      <DataContext.Provider value={mockData as AppLayout}>
        <Layout>
          <Switch>
            {routesConfig.map(({ ...rest }) => (
              <RouteWithSubRoutes key={rest.path as string} {...rest} />
            ))}
          </Switch>
        </Layout>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
