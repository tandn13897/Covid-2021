import React, { useEffect, useState } from 'react'
import {Row, Col, Typography, Spin} from 'antd'
import {ExperimentOutlined, FrownOutlined, SmileOutlined} from '@ant-design/icons'
import moment from 'moment'
import { getDefaultData, getCountriesData } from '../../../../services/covidAPI/CovidAPI'
import numeral from 'numeral'
import HighLightCard from '../../../../components/HighLight/HighLight'

import CountryTables from './CountryTables'
import Map from './Map'
import "leaflet/dist/leaflet.css";
import LineChart from './LineChart'

const { Title } = Typography

const rowStyle = {
    marginTop:'10px', 
    marginLeft:'0', 
    marginRight:'0'
}

export default function Global() {
    const [isLoading, setIsLoading] = useState(false)
    const [covidInfoGlobal, setCovidInfoGlobal] = useState([])
    const [covidInfoCountries, setCovidInfoCountries] = useState([])
    const [casesType, setCasesType] = useState("cases");


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
            <div>
                <Row style={rowStyle}>
                    <Col
                        xs={24} sm={24} md={{span:15, offset:0}} lg={{span:12, offset:3}} xl={{span:12, offset:3}}
                    >
                        <p className='country_detail_title'>Last 24 hours update</p>
                    </Col>
                </Row>
                <Row gutter={[10, 20]} style={rowStyle}>
                    <Col
                        xs={12} sm={12} md={{span:8, offset:0}} lg={{span:6, offset:3}} xl={{span:6, offset:3}}
                    >
                        <HighLightCard name={'New Cases'} info={`${numeral(covidInfoGlobal.todayCases).format('0,0')}`} type={'New Cases'} icon={<ExperimentOutlined/>} key='1'/>
                    </Col>
                    <Col    
                        xs={12} sm={12} md={{span:8, offset:0}} lg={{span:6, offset:0}} xl={{span:6, offset:0}} 
                    >
                        <HighLightCard name={'New Deaths'} info={`${numeral(covidInfoGlobal.deathsPerOneMillion).format('0,0')}`} type={'New Deaths'} icon={<FrownOutlined/>}  key='2'/>
                    </Col>
                    <Col
                        xs={24} sm={{span:18, offset:3}} md={{span:8, offset:0}} lg={{span:6, offset:0}} xl={{span:6, offset:0}}                    
                    >
                        <HighLightCard name={'New Recovered'} info={`${numeral(covidInfoGlobal.todayRecovered).format('0,0')}`} type={'New Recover'} icon={<SmileOutlined />} key='3'/> 
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col
                        xs={24} sm={24} md={{span:15, offset:0}} lg={{span:12, offset:3}} xl={{span:12, offset:3}}
                    >
                        <p className='country_detail_title'>Total Data</p>
                    </Col>
                </Row>
                <Row gutter={[10, 20]} style={rowStyle}>
                    <Col
                        xs={12} sm={12} md={{span:8, offset:0}} lg={{span:6, offset:3}} xl={{span:6, offset:3}}
                    >
                        <HighLightCard name={'Total Cases'} info={`${numeral(covidInfoGlobal.cases).format('0.0a')}`} type={'Total Cases'} icon={<ExperimentOutlined/>} key='4'/>
                    </Col>
                    <Col
                        xs={12} sm={12} md={{span:8, offset:0}} lg={{span:6, offset:0}} xl={{span:6, offset:0}} 
                    >
                        <HighLightCard name={'Total Deaths'} info={`${numeral(covidInfoGlobal.deaths).format('0.0a')}`} type={'New Deaths'} icon={<FrownOutlined/>}  key='5'/>
                    </Col>
                    <Col
                        xs={24} sm={{span:18, offset:3}} md={{span:8, offset:0}} lg={{span:6, offset:0}} xl={{span:6, offset:0}}
                    >
                        <HighLightCard name={'Total Recovered'} info={`${numeral(covidInfoGlobal.recovered).format('0.0a')}`} type={'Total Recover'} icon={<SmileOutlined />} key='6'/>
                    </Col>
                </Row>
            </div>
        )
    }


    useEffect(() => {
        setIsLoading(true)
        getDefaultData()
            .then(res => {
                setCovidInfoGlobal(res.data)
                setIsLoading(false)
            })
            .catch(error => {
                alert(error)
            })
    }, [])

    useEffect(() => {
        getCountriesData()
            .then(res => {
                setCovidInfoCountries(res.data)
            })
            .catch(error => {
                alert(error)
            })
    },[])

    return (
        <div style={{padding:'30px'}}>
            <Row align='middle' justify='center' style={{marginTop:'30px'}}>
                <Col 
                    xs={24} 
                    sm={24} 
                    md={{span:20, offset:1}} 
                    lg={{span:20, offset:1}}
                    style={{
                        textAlign:'center'
                    }}
                >
                    <Title level={3} italic>COVID-19 CORONAVIRUS PANDEMIC</Title>
                    <p
                        style={{
                            fontSize:'25px',
                            padding:'20px 10px'
                        }}
                    >
                        Globally, as of {`${moment(new Date()).format('MMMM Do YYYY')}`}, there have been 
                        <span style={{color:'blue', fontSize:'30px', fontStyle:'italic'}}> {numeral(covidInfoGlobal.cases).format('0.0a')} confirmed cases </span>
                        of COVID-19, it affected 
                        <span style={{color:'red', fontSize:'30px', fontStyle:'italic'}}> {numeral(covidInfoGlobal.affectedCountries).format('0,0')} countries</span>
                    </p>
                </Col>   
            </Row>
            {handleLoading()}
            <Map
                countries={covidInfoCountries}
                casesType={casesType}
            />
            <LineChart/>
            <CountryTables data={covidInfoCountries}/>
        </div>
    )
}
