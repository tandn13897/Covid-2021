import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import AuthRoute from "./route/authRoute/AuthRoute";
// import PrivateRoute from "./route/privateRoute/PrivateRoute";
import LoginAndRegisterForm from "./pages/LoginAndRegister/index";
import HomePage from "./pages/Home/HomePage";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading";

function Notfound(props) {
  return <div>Oppss... Not found</div>;
}

function App() {
  return (
    <div>
      <GlobalLoading>
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/login" component={LoginAndRegisterForm} />
            <Route path="/" component={HomePage} />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </GlobalLoading>
    </div>
  );
}

export default App;
