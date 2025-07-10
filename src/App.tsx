import { BrowserRouter } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Navigation from "./routes/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        theme="colored"
        autoClose={500}
        hideProgressBar={true}
        transition={Slide}
      />
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
