import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import Header from "./components/Header.tsx";
import { fetchUsers } from "./features/users/usersSlice.ts";

store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <Header />
      <App />
    </React.StrictMode>
  </Provider>
);
