import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
