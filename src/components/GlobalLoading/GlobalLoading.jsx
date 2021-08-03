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
                style={loadingStyle}
                indicator={<SyncOutlined spin/>}
            >
               {children}
           </Spin>
        </div>
    )
}

const loadingStyle = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:'2',
    maxHeight:'none',
    width:'100vw',
    position:'fixed',
    top:'0',
    left:'0',
    backgroundColor:'rgba(0,0,0,0.2)',
    height:'100vh'
}
