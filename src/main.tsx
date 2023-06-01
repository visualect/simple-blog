import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import Header from "./components/Header.tsx";
import { fetchUsers } from "./features/users/usersSlice.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./features/users/UsersList.tsx";
import UserItem from "./features/users/UserItem.tsx";
import { fetchAllPosts } from "./features/posts/postsSlice.ts";
import PostPage from "./features/posts/PostPage.tsx";

store.dispatch(fetchUsers());
store.dispatch(fetchAllPosts());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserItem />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
