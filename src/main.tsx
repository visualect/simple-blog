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
import { fetchPosts } from "./features/posts/postsSlice.ts";
import PostPage from "./features/posts/PostPage.tsx";
import EditPost from "./features/posts/EditPost.tsx";
import { fetchComments } from "./features/comments/commentsSlice.ts";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
store.dispatch(fetchComments());

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
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
