import React, {useState} from "react";
import { Button, Avatar, Popover} from 'antd'
import { BellOutlined, DownOutlined} from '@ant-design/icons'
import { useHistory } from 'react-router'
import './userInfo.css'

const ButtonStyle = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    color:'#fff'
}

export default function UserInfo() {
    const [visible, setVisible] = useState(false)
    const username = localStorage.getItem('token')
    const history = useHistory()

    const handleVisibleChange = visible => {
        setVisible(visible)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }

    return (
    <div className="header_user_info">
        <ul>
            <li>
                <Button
                    type="ghost"
                    shape="circle"
                    size="large"
                    icon={<BellOutlined />}
                    style={ButtonStyle}
                />
            </li>
            <li>
                <Popover
                    trigger="click"
                    visible={visible}
                    placement="bottomRight"
                    onVisibleChange={handleVisibleChange}
                    style={{margin:'0'}}
                    content={
                    <ul className="content-user-info">
                        <li>
                            <a href="#">Account</a>
                        </li>
                        <li>
                            <a href="#">Setting</a>
                        </li>
                        <li>
                            <a href="#">Change Password</a>
                        </li>
                        <li onClick={handleLogout}>
                            <a href="#">Logout</a>
                        </li>
                    </ul>
                    }
                >
                    <Button
                        type="ghost"
                        shape="round"
                        size="large"
                        className="btn-user-info"
                    >
                        <Avatar className="avatar">{username.slice(0,1).toUpperCase()}</Avatar>
                            {username.toUpperCase()}
                        <DownOutlined />
                    </Button>
                </Popover>
            </li>
        </ul>
    </div>
  );
}
