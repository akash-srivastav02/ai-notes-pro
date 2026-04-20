import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Summarizer from "./components/Summarizer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summarize" element={<Summarizer />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;