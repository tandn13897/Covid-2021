import React from 'react'
import { useSelector }  from 'react-redux'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

export default function GlobalLoading({children}) {
    const isLoading = useSelector(state => state.GlobalReducer.isLoading)
    
    return (
        <div>
            <Spin 
                spinning={isLoading} 
                tip='Loading...' size='large'
                style={{maxHeight:'100vh'}}
                indicator={<SyncOutlined spin/>}
            >
               {children}
           </Spin>
        </div>
    )
}
