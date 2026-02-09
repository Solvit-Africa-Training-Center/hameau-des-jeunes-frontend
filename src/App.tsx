import "./App.css";
import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <main className="pt-14 sm:pt-16">
          <AppRoutes />
          <ToastContainer />
        </main>
      </div>
    </>
  );
}

export default App;
