import React from 'react'
import { Card, Button } from 'antd'
import moment from 'moment'
import './card.css'
import '../../assests/font/font.css'

const headerStyle = {
    fontSize:'20px',
    backgroundColor:'rgb(68, 177, 35)',
}


export default function CardModel({ author, content, description, publishe, title, image, loading}) {
    return (
            <Card
                hoverable
                title={title}
                loading={loading}
                headStyle={headerStyle}
                className='card-modal'
            >
                <div className='card-modal__content'>
                    <img src={image} alt='#src'/>    
                    <div>
                        {description}
                        <p>{moment(publishe).format('MMMM Do YYYY')}</p>
                    </div>
                </div>
                <div className='description'>
                    <div>
                        <p>{content}</p>
                        <p>By {author}</p>
                    </div>
                    <Button type='text' size='large'>Read more...</Button>
                </div>
            </Card>  
    )
}
