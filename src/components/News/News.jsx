import React, { useState, useEffect} from 'react'
import { Row, Col } from 'antd'

import CardModel from '../Card/Card'
import { getNews } from '../../services/newsAPI/NewsAPI'
import './news.css'


export default function News() {
    const [data, setData] = useState([])


    useEffect(() => {
        getNews()
            .then(res => {
                setData(res.data.articles)
            })
    }, [])

    return (
        <Row gutter={[0, 20]} justify='space-around'> 
             { data && data.map((item, index) => {
                return (
                    <Col
                        xs={{span: 22}} 
                        sm={{span: 22}}
                        md={{span: 12}} 
                        lg={{span: 10}}
                        xl={{span: 7}}
                        key={index}
                        style={{ display:'flex', justifyContent:'center'}}
                    >
                        <CardModel author={item.author} content={item.content} description={item.description} publishe={item.publishedAt} title={item.title} image={item.urlToImage}/>
                    </Col>
                    )
                })}
        </Row>
    )
}
