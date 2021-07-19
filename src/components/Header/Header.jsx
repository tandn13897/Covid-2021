import React, { useEffect, useState } from "react";
import { Row, Col, Drawer, Button, Menu, Affix } from "antd";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import {
  GlobalOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  ReadOutlined,
  HomeOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import UserInfo from "./components/UserInfo";
// import CovidLogo from '../../assests/images/corona-5348198_640.jpg'
import './header.css'
import '../../assests/font/font.css'

const RowStyle = {
    height: 'auto',
    backgroundColor:'#018475',
    lineHeight:'3',
    padding:'15px',
    margin:'10px 0px',
}

const MenuStyle = {
    backgroundColor:'#018475',
    fontSize: '20px',
    color:'white',
}

const MenuItemStyle = {
    display:'flex',
    alignItems:'center'
}

const LinkStyle = {
    color: '#fff',
    textDecoration:'none'

}

export default function Header() {
    const [visible, setVisible] = useState(false);
    const [showResponsiveMenu, setShowResponsiveMenu] = useState(false)
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

    const handleToLoginPage = () => {
        history.push('/login')
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 769) {
                setShowResponsiveMenu(true)
            } else {
                setShowResponsiveMenu(false)
            }
        }
        window.addEventListener('resize',handleResize)   
    })

return (
    <div className='header__container'>
        <Row>
            <Col 
                xs={24} 
                sm={24} 
                md={{span:22, offset:1}} 
                lg={{span:22, offset:1}}
            >
                <div className='header__logo'>
                    <h4>Covid-19 Tracking Web</h4>
                </div>
            </Col>
        </Row>
        <Affix offsetTop={-10}>
            <Row style={RowStyle}>
                <Col
                    xs={24} 
                    sm={24} 
                    md={{span:22, offset:1}} 
                    lg={{span:20, offset:2}}
                >
                    <div className='header__menu'>
                        <div className='header__main-menu'> 
                            <div>
                                { showResponsiveMenu ? 
                                (
                                    <div className='header__main-menu-responsive'>
                                <Button onClick={showDrawer} icon={<MenuOutlined />}/>
                                <Drawer
                                    placement="left"
                                    closable={false}
                                    onClose={onClose}
                                    visible={visible}
                                    drawerStyle={{backgroundColor:'#018475'}}
                                >
                                    <Menu mode='inline' style={MenuStyle}>
                                        <Menu.Item key='home' icon={<ReadOutlined />} style={MenuItemStyle}>
                                            <Link to='/' style={LinkStyle}>Home</Link></Menu.Item>
                                        <Menu.Item key='global' icon={<GlobalOutlined />} style={MenuItemStyle}>
                                            <Link to='/global' style={LinkStyle}>Global</Link></Menu.Item>
                                        <Menu.Item key='detail' icon={<EnvironmentOutlined />} style={MenuItemStyle}>
                                            <Link to='/country/:countryId' style={LinkStyle}>Detail</Link></Menu.Item>
                                    </Menu>
                                </Drawer>
                            </div>
                                )
                                :
                                (<Menu mode='horizontal' style={MenuStyle}>
                                    <Menu.Item key='home' icon={<HomeOutlined /> } style={MenuItemStyle}>
                                        <Link to='/' style={LinkStyle}>Home</Link>
                                    </Menu.Item>
                                    <Menu.Item key='global' icon={<GlobalOutlined />} style={MenuItemStyle}>
                                        <Link to='/global' style={LinkStyle}>Global</Link>
                                    </Menu.Item>
                                    <Menu.Item key='detail' icon={<EnvironmentOutlined />} style={MenuItemStyle}>
                                        <Link to='/country/:countryId' style={LinkStyle}>Detail</Link>
                                    </Menu.Item>
                                </Menu>)
                                }
                            </div>
                            {/* <div className='header__main-menu-responsive'>
                                <Button onClick={showDrawer} icon={<MenuOutlined />}/>
                                <Drawer
                                    placement="left"
                                    closable={false}
                                    onClose={onClose}
                                    visible={visible}
                                    drawerStyle={{backgroundColor:'#018475'}}
                                >
                                    <Menu mode='inline' style={MenuStyle}>
                                        <Menu.Item key='home' icon={<ReadOutlined />} style={MenuItemStyle}>
                                            <Link to='/' style={LinkStyle}>Home</Link></Menu.Item>
                                        <Menu.Item key='global' icon={<GlobalOutlined />} style={MenuItemStyle}>
                                            <Link to='/global' style={LinkStyle}>Global</Link></Menu.Item>
                                        <Menu.Item key='detail' icon={<EnvironmentOutlined />} style={MenuItemStyle}>
                                            <Link to='/country/:countryId' style={LinkStyle}>Detail</Link></Menu.Item>
                                    </Menu>
                                </Drawer>
                            </div> */}
                        </div>
                        <div className='header__user-menu'>
                            { checkUser() ? 
                            (<UserInfo/>)
                            :
                            (<Button type='text' icon={<LoginOutlined/>} style={MenuItemStyle} onClick={handleToLoginPage}>Login</Button>) }
                        </div>
                    </div>
                </Col>
            </Row>
        </Affix>
    </div>
  );
}
