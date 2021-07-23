import React, {useEffect} from 'react'
import { Redirect, Route} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { GlobalActions, GlobalReducer} from '../../redux/slices/slicesDetails/GlobalSlices'

function AuthRoute({component: Component, ...rest}) {
    const isUserLogin = useSelector(state => state.GlobalReducer.isLogin)
    const dispacth = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) return dispacth(GlobalActions.getUserLogin(true));
        return dispacth(GlobalActions.getUserLogin(false))
    })
 
    return (
        <div>
            <Route
                 {...rest}
                 render={(props) => 
                 isUserLogin ? (
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