import React from 'react'
import {Card, Statistic} from 'antd'

const cardStyle = {
    margin:'10px',
    backgroundColor:'rgba(85,255,244,0.7)',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    width:'43%', 
    overflow:'hidden', 
    textOverflow:'ellipsis'
}

export default function InfoDetail({data}) {
    return (
        <div style={{marginTop:'30px', display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            <Card style={cardStyle}>
                <Statistic
                    title='Area'
                    value={data.continent}
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Critical'
                    value={data.critical}
                    suffix='cases'
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Percentage Infected'
                    precision={2}
                    value={(data.cases/data.population)*100}
                    suffix='%'
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Percentage Deaths covid'
                    value={(data.deaths/data.population)*100}
                    precision={2}
                    suffix='%'
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Percentage Recovered covid'
                    value={(data.recovered/data.population)*100}
                    precision={2}
                    suffix='%'
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Infected per 1 million citizen'
                    value={data.casesPerOneMillion}
                    suffix='cases'
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Deaths per 1 million citizen'
                    value={data.deathsPerOneMillion}
                    suffix='cases'
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Recovered per 1 million citizen'
                    value={data.recoveredPerOneMillion}
                    suffix='cases'
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Critical per 1 million citizen'
                    value={data.criticalPerOneMillion}
                    suffix='cases'
                    valueStyle={{color:'red'}}
                />
            </Card>
            <Card style={cardStyle}>
                <Statistic
                    title='Test'
                    value={data.tests}
                    suffix='cases'
                    valueStyle={{color:'red'}}
                />
            </Card>
        </div>
    )
}
