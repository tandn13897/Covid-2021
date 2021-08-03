import React from 'react'
import {Row, Col} from 'antd'
import HighLightCard from '../../../components/HighLight/HighLight'
import numeral from 'numeral'
import CountryMap from './CountryMap'
import InfoDetail from './InfoDetail'
import ChartDetail from './ChartDetail'
import {ExperimentOutlined, FrownOutlined, SmileOutlined} from '@ant-design/icons'

const rowStyle = {
    marginTop:'10px', 
    marginLeft:'0', 
    marginRight:'0',
}

export default function CountryDetail({data, historyData}) {
    return (
        <div> 
            <Row style={rowStyle}>
                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >
                    <p className='country_header'>{data.country}</p>
                </Col>
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
                    <HighLightCard name={'New Cases'} info={`${numeral(data.todayCases).format('0,0')}`} type={'New Cases'} icon={<ExperimentOutlined/>} key='1'/>
                </Col>
                <Col    
                    xs={12} sm={12} md={{span:8, offset:0}} lg={{span:6, offset:0}} xl={{span:6, offset:0}} 
                >
                    <HighLightCard name={'New Deaths'} info={`${numeral(data.deathsPerOneMillion).format('0,0')}`} type={'New Deaths'} icon={<FrownOutlined/>}  key='2'/>
                </Col>
                <Col
                    xs={24} sm={{span:18, offset:3}} md={{span:8, offset:0}} lg={{span:6, offset:0}} xl={{span:6, offset:0}}                    
                >
                    <HighLightCard name={'New Recovered'} info={`${numeral(data.todayRecovered).format('0,0')}`} type={'New Recover'} icon={<SmileOutlined />} key='3'/>                     </Col>
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
                    <HighLightCard name={'Total Cases'} info={`${numeral(data.cases).format('0.0a')}`} type={'Total Cases'} icon={<ExperimentOutlined/>} key='4'/>
                </Col>
                <Col
                    xs={12} sm={12} md={{span:8, offset:0}} lg={{span:6, offset:0}} xl={{span:6, offset:0}} 
                >
                    <HighLightCard name={'Total Deaths'} info={`${numeral(data.deaths).format('0.0a')}`} type={'New Deaths'} icon={<FrownOutlined/>}  key='5'/>
                </Col>
                <Col
                    xs={24} sm={{span:18, offset:3}} md={{span:8, offset:0}} lg={{span:6, offset:0}} xl={{span:6, offset:0}}
                >
                    <HighLightCard name={'Total Recovered'} info={`${numeral(data.recovered).format('0.0a')}`} type={'Total Recover'} icon={<SmileOutlined />} key='6'/>
                </Col>
            </Row>
            <Row gutter={[10, 20]} style={rowStyle}>
                <Col
                    xs={{span:24, offset:0}} sm={{span:20, offset:2}} md={{span:12, offset:6}} lg={{span:7, offset:3}} xl={{span:6, offset:3}}
                >
                    <InfoDetail data={data}/>
                </Col>
                <Col
                    xs={{span:24, offset:0}} sm={{span:24, offset:0}} md={{span:24, offset:0}} lg={{span:12, offset:0}} xl={{span:12, offset:0}}
                    className='responsive__country-map'
                >
                    <CountryMap data={data}/>
                </Col>
            </Row>
            <ChartDetail history={historyData}/>
        </div>
    )
}
