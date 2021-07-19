import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import AuthRoute from "./route/authRoute/AuthRoute";
import PrivateRoute from "./route/privateRoute/PrivateRoute";
import LoginAndRegisterForm from "./pages/LoginAndRegister/index";
import HomePage from "./pages/Home/HomePage";
import Detail from "./pages/DetailCountry/index";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading";
import { useHistory } from 'react-router-dom'

function Notfound(props) {
  return <div>Oppss... Not found</div>;
}

function App() {
  const history = useHistory()

  return (
    <div className='global_container'>
      <GlobalLoading>
        <BrowserRouter history={history}>
          <Switch>
            <AuthRoute path="/login" component={LoginAndRegisterForm} />
            <PrivateRoute path='/country/:countryId' component={Detail}/>
            <Route path="/" component={HomePage} />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </GlobalLoading>
    </div>
  );
}

export default App;
