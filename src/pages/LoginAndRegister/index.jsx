import React from 'react'
import {Row, Col, Tabs} from 'antd'

import './login.css'
import Login from './Login'
import Register from './Register'

const { TabPane } = Tabs;

export default function LoginAndRegisterForm() {

    return (
        <div>
            <Row>
                <Col xs={24} sm={24} md={24} lg={{span:20, offset:2}}>
                    <section>
                        <div className='login-and-Resgister'>
                        <Tabs 
                            defaultActiveKey="login-form" 
                            type='line' 
                            tabPosition='top'
                            size='large'
                            centered
                            tabBarStyle={{
                                marginBottom:0,
                                marginLeft:10,
                                marginRight:10,
                            }}
                        >
                            <TabPane tab="Login" key="login-form">
                                <Login/>
                            </TabPane>
                            <TabPane tab="Register" key="register-form">
                                <Register/>
                            </TabPane>
                        </Tabs>
                        </div>
                    </section>
                </Col>
            </Row>
        </div>
    )
}

