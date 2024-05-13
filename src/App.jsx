import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Posts from "./pages/Home";
import NotFound from "./pages/NotFound";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SinglePost from "./pages/SinglePost";
import AdminNav from "./pages/admin/AdminNav";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminComments from "./pages/admin/AdminComments";
import Login from "./pages/admin/Login";
import Home from "./pages/Home";

const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home/>} />
        <Route path="posts/:id" element={<SinglePost />} />
        <Route path="*" element={<NotFound />} />
        <Route path="admin" element={<Outlet />}>
          <Route index element={<Login />} />
          <Route path=":name" element={<AdminNav/>}>
            <Route path="posts" element={<AdminPosts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="comments" element={<AdminComments />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
