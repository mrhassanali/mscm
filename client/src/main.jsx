import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
//Redux
import store from "./state/store";
import { Provider } from "react-redux";

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store)

import { AppProvider } from "./context/AppContext";// Context Api

      
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <AppProvider> 
          <App />
        </AppProvider>

      </PersistGate>
    </Provider>
  </React.StrictMode>
);
