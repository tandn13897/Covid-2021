import React from 'react'
import { Redirect, Route} from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {

   const checkUser = () => {
       const username = localStorage.getItem('user')
       const password = localStorage.getItem('password')
       if (username === 'admin' && password === '123') return true;
       return false
   };

   return (
       <div>
           <Route
                {...rest}
                render={(props) => 
                checkUser() ? (
                    <Component {...props}/>
                ): (
                    <Redirect
                    to={ {pathname: '/login'}}/>
                )} 
           />
       </div>
   )
}

export default PrivateRoute