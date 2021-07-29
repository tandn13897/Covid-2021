import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import AuthRoute from "./route/authRoute/AuthRoute";
import PrivateRoute from "./route/privateRoute/PrivateRoute";
import LoginAndRegister from "./pages/LoginAndRegister/index";
import Home from "./pages/Home/index";
import Global from "./pages/GlobalInfo/index";
import Detail from "./pages/DetailCountry/index";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading";
import { useHistory } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Notfound(props) {
  return <div>Oppss... Not found</div>;
}

function App() {
  const history = useHistory();

  return (
    <div className="global_container">
        <GlobalLoading>
            <BrowserRouter history={history}>
            <Header />
            <Switch>
                <AuthRoute path="/login" component={LoginAndRegister} />
                <PrivateRoute path="/country/:countryId" component={Detail} />
                <PrivateRoute path="/global" component={Global} />
                <Route path="/" component={Home} />
                <Route component={Notfound} />
            </Switch>
            <Footer />
            </BrowserRouter>
        </GlobalLoading>
    </div>
  );
}

export default App;
