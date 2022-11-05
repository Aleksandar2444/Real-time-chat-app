import { Helmet } from "react-helmet";
import "./App.css";
import MainPage from "./MainPage/MainPage";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Navbar />
      <MainPage />
    </div>
  );
}

export default App;
