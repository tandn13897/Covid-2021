import React, { useState, useEffect} from 'react'
import { Row, Col, Typography, Spin } from 'antd'

import CardModel from '../../components/Card/Card'
import './home.css'
import NewHeader from './component/NewsHeader'
import '../../assests/font/font.css'
import Data from '../../data/news.json'

const {Title} = Typography

export default function News() {
    const [newsData, setNewsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const loadingComponent = () => {
        return (
            <div style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                zIndex:'2',
                maxHeight:'none',
                width:'100%'
            }}>
                <Spin size='large'></Spin>
            </div>
        )
    }

    useEffect(() => {
        setIsLoading(true)
        setNewsData(Data.article)
        setIsLoading(false)
    }, [])

    return (
        <div>
        <div style={{textAlign:'center', width:'100%'}}>
            <Title level={1} italic type='success'>News</Title>
        </div>
        <NewHeader/>
        <Row gutter={[0, 40]} justify='space-around'>
            { isLoading ? loadingComponent() : null} 
                { newsData && newsData.map((item, index) => {
                    return (
                        <Col
                            key={index}
                            span={20}
                        >
                            <CardModel author={item.author} content={item.content} description={item.description} publishe={item.publishedAt} title={item.title} image={item.urlToImage} loading={isLoading}/>
                        </Col>
                        )
                    })}
        </Row>
        </div>
    )
}

