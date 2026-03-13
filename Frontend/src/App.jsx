import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
