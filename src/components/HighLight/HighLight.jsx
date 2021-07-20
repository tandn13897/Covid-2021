import React from 'react'
import {Card} from 'antd'

const CardStyle = (type) => {
    if (type === 'New Cases' || type === 'Total Cases') 
        return ({fontSize:'20px', backgroundColor:'rgb(167, 255, 255)', textAlign:'right', height:'100%', padding:'35px 20px'})
    if (type === 'New Deaths' || type === 'Total Deaths') 
        return ({fontSize:'20px', backgroundColor:'rgb(252, 170, 170)', textAlign:'right', height:'100%', padding:'35px 20px'})
    if (type === 'New Recover' || type === 'Total Recover') 
        return ({fontSize:'20px', backgroundColor:'rgb(230, 243, 194)', textAlign:'right', height:'100%', padding:'35px 20px'})
}

const cardIcon = {
    position:'absolute', 
    top:'-3px', 
    left:'10px', 
    fontSize:'30px'
}

const highlightCardStyle = {
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    margin:'0 10px'
}

export default function HighLightCard({name, info, type, icon}) {
    return (
        <Card
            hoverable 
            bodyStyle={CardStyle(type)}
            style={highlightCardStyle}   
        >
            <p style={{margin:'0', fontSize:'35px', overflow:'hidden', textOverflow:'ellipsis'}}>{info}</p>
            <p>{name}</p>
            <div style={cardIcon}>{icon}</div>
    </Card>
    )
}
