import "./App.css";
import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <main className="pt-14 sm:pt-16">
          <AppRoutes />
          <ToastContainer />

          <Toaster position="top-right" richColors />
        </main>
      </div>
    </>
  );
}

export default App;
