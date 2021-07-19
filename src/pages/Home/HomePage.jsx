import React from 'react'
import {Space} from 'antd'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../../route/privateRoute/PrivateRoute'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
// import Domestic from './components/DomesticInfo/Domestic'
import Global from './components/GlobalInfo/Global'
import News from '../../components/News/News'

export default function HomePage() {
    return (
        <div>
            <Space direction='vertical' size='large' style={{width:'100%'}}>
            <Header/>
            <Switch>                    
                <PrivateRoute path='/global' component={Global}/>
                <Route exact path='/'><News/></Route> 
            </Switch>
            <Footer/>
            </Space>
        </div>
    )
}
