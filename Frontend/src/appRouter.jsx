import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Welcome } from "./components/pages/Welcome.jsx";
import { NotFound } from "./components/pages/NotFound.jsx";
import { Service1 } from "./components/pages/Service1.jsx";
import { Service2 } from "./components/pages/Service2.jsx";
import { Service3 } from "./components/pages/Service3.jsx";
import { Service4 } from "./components/pages/Service4.jsx";
import { SignUp } from "./components/pages/SignUp.jsx";
import { Login } from "./components/pages/Login.jsx";
import { Verification } from "./components/pages/Verification.jsx";
import { Home } from "./components/pages/Home.jsx";
import { AllTask } from "./components/pages/AllTask.jsx";
import { TaskDetails } from "./components/pages/TaskDetails.jsx";
import { Setting } from "./components/pages/Setting.jsx";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "service1",
        element: <Service1 />,
      },
      {
        path: "service2",
        element: <Service2 />,
      },
      {
        path: "service3",
        element: <Service3 />,
      },
      {
        path: "service4",
        element: <Service4 />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "alltask",
        element: <AllTask />,
      },
      {
        path: "details",
        element: <TaskDetails />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);
