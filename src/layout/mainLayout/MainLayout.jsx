import React, { useState } from "react";
import { Row, Col, Drawer, Button, Menu, PageHeader, Typography, Affix } from "antd";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import {
  CloseOutlined,
  GlobalOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  ReadOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import "./mainLayout.css";
import Logo from "../../assests/images/corona-5348198_640.jpg";
import CoverImg from '../../assests/images/illustration.png';


const {Text} = Typography

export default function MainLayout() {
    const [visible, setVisible] = useState(false);
    const history = useHistory()

    const checkUser = () => {
        const username = localStorage.getItem('user')
        const password = localStorage.getItem('password')
        console.log('User Info:', username, password)
        if (username === 'admin' && password === '123') return true;
        return false
    };

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user')
        history.push('/login')
    }

    const handleGoToLoginForm = () => {
        history.push('/login')
    }

return (
    <div>
        <Affix>
        <Row className='menu'>
            <Col xs={24} sm={24} md={24} lg={{span:21, offset:2}}>
                <PageHeader
                    ghost={true}
                    title='Covid.'
                    extra={[
                        <Button onClick={showDrawer} icon={<MenuOutlined />} className='menu__btn'/>
                    ]}
                    className='menu__header'
                >
                     <Drawer
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            visible={visible}
                            style={{backgroundColor:'rbga(255,255,255,0.1)'}}
                        >
                            <div>
                                <img src={Logo} width="auto" height="120px" alt='#src'/>
                                <Button icon={<CloseOutlined />} onClick={onClose}/>
                            </div>
                            <Menu>
                                <Menu.Item key='global' icon={<GlobalOutlined />}><Link to='/global'>Global</Link></Menu.Item>
                                <Menu.Item key='domestic' icon={<EnvironmentOutlined />}><Link to='/domestic'>Domestic</Link></Menu.Item>
                                <Menu.Item key='news' icon={<ReadOutlined />}><Link to='/news'>News</Link></Menu.Item>
                                {checkUser() ? 
                                (<Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Menu.Item>) 
                                : 
                                (<Menu.Item icon={<LogoutOutlined />} onClick={handleGoToLoginForm}>Signin</Menu.Item>)}
                            </Menu>
                        </Drawer>
                </PageHeader>
            </Col>
        </Row>
        </Affix>
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} className='intro'>
                <span>COVID-19 AWARENESS</span>
                <h1>Stay Safe - Stay Home</h1>
                <p>Protect yourself and be supportive to others</p>
                <img src={CoverImg} width='100%' alt='#src'/>
            </Col>
        </Row>
        <Row>
            <Col xs={24} sm={24} md={24} lg={{span:21, offset:2}}>
            <div className='abstract'>
                <ul>
                    <li><Text italic strong>COVID-19 is the disease caused by SARS-CoV-2, the coronavirus that emerged in December 2019.</Text></li>
                    <li><Text italic strong>The coronavirus can be spread from person to person. It is diagnosed with a laboratory test.</Text></li>
                </ul>
                {checkUser() ? 
                null 
                : 
                (<div>
                    <h3>Signin to read more!</h3>
                    <Button size='large' type='default' icon={<LoginOutlined />} className='signin-btn' onClick={handleGoToLoginForm}>Signin</Button>
                </div>)}
            </div>
            </Col>
        </Row>
    </div>
  );
}
