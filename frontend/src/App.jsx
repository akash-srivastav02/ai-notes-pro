import Summarizer from "./components/Summarizer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        <Summarizer />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;