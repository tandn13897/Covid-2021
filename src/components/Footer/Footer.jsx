import React from 'react'
import {Affix} from 'antd'
import './footer.css'

export default function Footer() {
    return (
        <div>
            <Affix offsetBottom={'0'}>
                <footer>Copyright @2021 by TDN</footer>
            </Affix>
        </div>
    )
}
