import React from 'react'
import {Space} from 'antd'
import Global from './components/GlobalInfo/Global'


export default function HomePage() {
    return (
        <div>
            <Space direction='vertical' size='large' style={{width:'100%'}}>
            <Global/>
            </Space>
        </div>
    )
}
