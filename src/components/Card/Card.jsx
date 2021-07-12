import React from 'react'
import { Card } from 'antd'

const { Meta } = Card

export default function CardModel({ author, content, description, publishe, title, image}) {
    return (
        <Card
            hoverable
            title={title}
            cover={
                <img src={image} alt='#src' height='250px'/>
            }
            style={{
                width:'85%', 
            }}
            >
                <Meta
                    title={`Author: ${author}`}
                    description={description}
                />
                {content}
                <p>{publishe}</p>
         </Card>
    )
}
