import {Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Landing from "./pages/Landing";
import BgTheme from "./layouts/BgTheme";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NewBlog from "./pages/NewBlog";
import MyBlogs from "./pages/MyBlogs";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import Tag from "./pages/Tag";
import Search from "./pages/Search";

export default function App() {
  return (
      <Routes>
        <Route element={<BgTheme />}>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/new" element={<NewBlog />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
          <Route path="/tag/:tagname" element={<Tag />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
  );
}
