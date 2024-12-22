import Main from "./pages/main";
import Login from "./pages/login/index";
import About from "./pages/about";
import Notes from "./pages/notes/index";
import ViewNote from "./pages/viewNote";
import NewNote from "./pages/newNote";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/signUp";
import EditNote from "./pages/editNote";
import NotFound from "./pages/notFound";
import UserContextProvider from "./components/UserContextProvider";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: (
          <RequireAuth>
            <About />
          </RequireAuth>
        ),
      },
      {
        path: "notes",
        element: (
          <RequireAuth>
            <Notes />
          </RequireAuth>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "notes/new",
        element: (
          <RequireAuth>
            <NewNote />
          </RequireAuth>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "notes/:id",
        element: (
          <RequireAuth>
            <ViewNote />
          </RequireAuth>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "notes/:id/edit",
        element: (
          <RequireAuth>
            <EditNote />
          </RequireAuth>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/error",
        element: <NotFound />,
      },
    ],
  },
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
