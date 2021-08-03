import React from 'react'
import {
    FacebookOutlined,
    LinkedinOutlined,
    GithubOutlined
} from '@ant-design/icons'
import './footer.css'

export default function Footer() {
    return (
        <footer>
            <div>
                <h4>Mock Project</h4>
                <p>Contact me via:</p>
            </div>
            <ul>
                <li><a href='https://www.facebook.com/profile.php?id=100003110736596'><FacebookOutlined /></a></li>
                <li><a href='https://www.linkedin.com/in/ng%E1%BB%8Dc-t%E1%BA%A5n-540a511aa/'><LinkedinOutlined /></a></li>
                <li><a href='https://github.com/tandn13897'><GithubOutlined /></a></li>
            </ul>
        </footer> 
    )
}
