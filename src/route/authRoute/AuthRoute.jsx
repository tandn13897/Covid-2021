import React from 'react'
import { Redirect, Route} from 'react-router-dom'

function AuthRoute({component: Component, ...rest}) {
    const checkUser = () => {
        const username = localStorage.getItem('user')
        const password = localStorage.getItem('password')
        console.log('User Info:', username, password)
        if (username === 'admin' && password === '123') return true;
        return false
    };
 
    return (
        <div>
            <Route
                 {...rest}
                 render={(props) => 
                 checkUser() ? (
                    <Redirect
                    to={{
                        pathname: '/', 
                        state: {from: props.location}}}/>
                 ) : (
                    <Component {...props}/>
                 )} 
            />
        </div>
    )
}

export default AuthRoute