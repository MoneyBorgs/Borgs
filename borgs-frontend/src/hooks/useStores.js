import React from "react";
import RootStore from "../stores/RootStore";

// Hook allowing root store to be accessible from all components
const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);