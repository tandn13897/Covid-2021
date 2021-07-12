import React, { useEffect, useState } from 'react'
import {Row, Col, Typography, Card, message, Spin} from 'antd'
// import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import { getDefaultData } from '../../../../services/covidAPI/CovidAPI'
import EarthAndCovid from '../../../../assests/images/earth-and-covid.jpg'
import CountryTables from './CountryTables'

const { Title } = Typography

const CardStyle = (type) => {
    if (type === 'New Cases' || type === 'Total Cases') return ({color:'gray', fontSize:'30px', backgroundColor:'gold' })
    if (type === 'New Deaths' || type === 'Total Deaths') return ({color:'black', fontSize:'30px', backgroundColor:'red'})
    if (type === 'New Recover' || type === 'Total Recover') return ({fontSize:'30px', backgroundColor:'greenyellow'})
}

function HighlightCard ({ name, info, type}) {
    return (
        <Col 
            xs={24} 
            sm={12} 
            md={{span: 6, offset:1}} 
            style={{
                textAlign:'center'
            }}
        >
            <Card
                title={name} 
                hoverable 
                headStyle={CardStyle(type)}
                bodyStyle={{fontSize:'20px'}}
            >
                {info}
            </Card>
        </Col>
    )
}

export default function Global() {
    const [isLoading, setIsLoading] = useState(false)
    const [covidInfoGlobal, setCovidInfoGlobal] = useState([])
    const [covidInfoCountries, setCovidInfoCountries] = useState([])

    const handleLoading = () => {
        if (isLoading) {
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
        return (
            <Row gutter={[20, 40]} justify='center' align='middle'>
                <HighlightCard name={'New Cases'} info={`${covidInfoGlobal.NewConfirmed} Cases`} type={'New Cases'}/>
                <HighlightCard name={'New Deaths'} info={`${covidInfoGlobal.NewDeaths} Deaths`} type={'New Deaths'}/>
                <HighlightCard name={'New Recover'} info={`${covidInfoGlobal.NewRecovered} Cases`} type={'New Recover'}/>
                <HighlightCard name={'Total Cases'} info={`${covidInfoGlobal.TotalConfirmed} Cases`} type={'Total Cases'}/>
                <HighlightCard name={'Total Deaths'} info={`${covidInfoGlobal.TotalDeaths} Deaths`} type={'Total Deaths'}/>
                <HighlightCard name={'Total Recover'} info={`${covidInfoGlobal.TotalRecovered} Cases`} type={'Total Recover'}/>
            </Row>
        )
    }


    useEffect(() => {
        setIsLoading(true)
        getDefaultData()
            .then(res => {
                setCovidInfoGlobal(res.data.Global)
                setCovidInfoCountries(res.data.Countries)
                setIsLoading(false)
                console.log(covidInfoCountries)
            })
            .catch(error => {
                message.error(error)
            })
    }, [])

    // const dataGlobalByDate = [
    //     { name: 'New Cases', value: covidInfoGlobal.NewConfirmed },
    //     { name: 'New Deaths', value: covidInfoGlobal.NewDeaths },
    //     { name: 'New Recover', value: covidInfoGlobal.NewRecovered }
    // ]

    // const dataGlobalTotal = [
    //     { name: 'Total Cases', value: covidInfoGlobal.TotalConfirmed },
    //     { name: 'Total Deaths', value: covidInfoGlobal.TotalDeaths },
    //     { name: 'Total Recover', value: covidInfoGlobal.TotalRecovered }
    // ]

    return (
        <div style={{padding:'30px'}}>
            <Row align='middle' justify='center' style={{margin:'30px'}}>
                <Col 
                    xs={24} 
                    sm={24} 
                    md={{span:21, offset:2}} 
                    lg={{span:21, offset:2}}
                    style={{
                        textAlign:'center'
                    }}
                >
                    <Title level={3} italic>COVID-19 CORONAVIRUS PANDEMIC</Title>
                    <img src={EarthAndCovid} alt='#src' width='40%' height='auto'/>
                    <p
                        style={{
                            fontSize:'25px',
                            padding:'20px 10px'
                        }}
                    >Last update: {`${moment(covidInfoGlobal.Date).format('MMMM Do YYYY, h:mm:ss a')}`}</p>
                </Col>
                
            </Row>
            {handleLoading()}
            {/* <Row>
            <ResponsiveContainer width="100%" height="300px">
                <PieChart width={400} height={400}>
                    <Pie data={dataGlobalByDate} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
                    <Pie data={dataGlobalTotal} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                </PieChart>
            </ResponsiveContainer>
            </Row> */}
            <CountryTables data={covidInfoCountries}/>
        </div>
    )
}
