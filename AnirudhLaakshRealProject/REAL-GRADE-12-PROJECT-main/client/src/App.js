import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes as Switch, Route } from "react-router-dom";
import axios from "axios";
import NoPageFound from "./containers/NoPageFound";
import Ribbon from "./containers/Ribbon";
import HomePage from "./containers/Home";
import ConfigPage from "./containers/ConfigPage";
import EditRow from "./containers/EditPage";
import LoginPage from "./containers/LoginPage";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

function App() {
  return (
    <>
      <Ribbon />
      <Switch>
        <Route path="/" exact element={<LoginPage client={client} />} />
        <Route path="/home" exact element={<HomePage client={client} />} />
        <Route
          path="/configpage"
          exact
          element={<ConfigPage client={client} />}
        />
        <Route
          path="/editrow/:id"
          exact
          element={<EditRow client={client} />}
        />
        <Route path="*" element={<NoPageFound />} />
      </Switch>
    </>
  );
}

export default App;
