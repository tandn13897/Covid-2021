import React, { useEffect, useState } from "react";
import { Row, Col, Drawer, Button, Menu, Affix } from "antd";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector, useDispatch} from 'react-redux'
import {
  GlobalOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  ReadOutlined,
  HomeOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {GlobalActions} from '../../redux/slices/slicesDetails/GlobalSlices'

import UserInfo from "./components/UserInfo";
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
    const isUserLogin = useSelector(state => state.GlobalReducer.isLogin)
    const dispacth = useDispatch()
    const history = useHistory()

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) return dispacth(GlobalActions.getUserLogin(true));
        return dispacth(GlobalActions.getUserLogin(false))
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
                                {/* { showResponsiveMenu ? 
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
                                } */}
                                <ul style={MenuStyle} className='menu-item'>
                                    <li key='home' style={MenuItemStyle}>
                                        <HomeOutlined /><Link to='/' style={LinkStyle}>{`${'\u00A0'}`}Home</Link>
                                    </li>
                                    <li key='global' style={MenuItemStyle}>
                                        <GlobalOutlined /><Link to='/global' style={LinkStyle}>{`${'\u00A0'}`}Global</Link>
                                    </li>
                                    <li key='detail' style={MenuItemStyle}>
                                        <EnvironmentOutlined /><Link to='/country/:countryId' style={LinkStyle}>{`${'\u00A0'}`}Detail</Link>
                                    </li>
                                </ul>
                            </div>
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
                            </div>
                        <div className='header__user-menu'>
                            { isUserLogin ? 
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
