import React from 'react'
import {Space} from 'antd'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../../route/privateRoute/PrivateRoute'
import MainLayout from '../../layout/mainLayout/MainLayout'
import Footer from '../../components/Footer/Footer'
import Domestic from './components/DomesticInfo/Domestic'
import Global from './components/GlobalInfo/Global'
import ToDo from '../../components/Advised/ToDo'
import News from '../../components/News/News'

export default function HomePage() {
    return (
        <div>
            <MainLayout/>
            {/* <News/> */}
            <Space direction='vertical' size='large' style={{width:'100%'}}>
            <Switch>
                <Route exact path='/news'><News/></Route>                    <PrivateRoute path='/global' component={Global}/>
                <PrivateRoute path='/domestic' component={Domestic}/>
            </Switch>
            <ToDo/>
            <Footer/>
            </Space>
        </div>
    )
}
