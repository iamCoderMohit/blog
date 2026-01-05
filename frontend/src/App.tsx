import {Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Landing from "./pages/Landing";
import BgTheme from "./layouts/BgTheme";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NewBlog from "./pages/NewBlog";

export default function App() {
  return (
      <Routes>
        <Route element={<BgTheme />}>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/new" element={<NewBlog />} />
        </Route>
      </Routes>
  );
}
