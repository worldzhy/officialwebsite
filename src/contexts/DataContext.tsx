import { createContext } from "react";
import { AppLayout } from "../types";

const DataContext = createContext<AppLayout>({} as AppLayout);
export default DataContext;
