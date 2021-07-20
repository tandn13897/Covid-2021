import React, {useState, useEffect} from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Row, Col, Typography, Button } from 'antd';
import { handleChangeData, handleChangeDataTotal } from '../../../unity/Unity'
import _ from 'lodash'
import numeral from 'numeral';

const { Title } = Typography

export default function ChartDetail({history}) {
    const [countryCases, setCountryCases] = useState([])
    const [countryDeaths, setCountryDeaths] = useState([])
    const [countryRecovered, setCountryRecovered] = useState([])
    const [allCountryData, setAllCountryData] = useState([])

    useEffect(() => {
        if (history.timeline) {
            let chartCasesData = handleChangeData(history.timeline, 'cases')
            let chartDeathsData = handleChangeData(history.timeline, 'deaths')
            let chartRecoveredData = handleChangeData(history.timeline, 'recovered')
            let chartAllCases = handleChangeDataTotal(history.timeline, 'cases')
            let chartAllDeaths = handleChangeDataTotal(history.timeline, 'deaths')
            let chartAllRecovered = handleChangeDataTotal(history.timeline, 'recovered')
            
            chartAllCases = chartAllCases.map((item, index) => {
                return (
                    {date: item.day, cases: numeral(item.case).format('0.0a')}
                )
            })

            chartAllDeaths = chartAllDeaths.map((item, index) => {
                return (
                    {date: item.day, deaths: numeral(item.case).format('0.0a')}
                )
            })

            chartAllRecovered = chartAllRecovered.map((item, index) => {
                return (
                    {date: item.day, recovered: numeral(item.case).format('0.0a')}
                )
            })

            let mergeData = _(chartAllCases)
                .concat(chartAllDeaths, chartAllRecovered)
                .groupBy('date')
                .map(_.spread(_.merge))
                .value();

            setCountryCases(chartCasesData)
            setCountryDeaths(chartDeathsData)
            setCountryRecovered(chartRecoveredData)
            setAllCountryData(mergeData)
        }
    },[history])


    return (
        <Row style={{height:'1500px', marginTop:'50px'}}>
            <Col
                xs={{span:23, offset:1}} 
                sm={{span:23, offset:1}} 
                md={{span:20, offset:3}} 
                lg={{span:20, offset:3}} 
            >
                <Title level={2}>New cases</Title>
            </Col>
            <Col
                xs={{span:24, offset:0}} sm={{span:24, offset:0}} md={{span:24, offset:0}} lg={{span:18, offset:3}} xl={{span:18, offset:3}}
            >
                {countryCases ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryCases}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                            }}
                    >
                        <CartesianGrid strokeDasharray='4 4'/>
                        <XAxis dataKey='day' angle={-15} dy={5}/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='case' stroke="#CC1034" fill="rgba(204, 16, 52, 0.5)"/>
                    </AreaChart>
                </ResponsiveContainer>
                )
                :
                (null)
                }
            </Col>
            <Col
                xs={{span:23, offset:1}} 
                sm={{span:23, offset:1}} 
                md={{span:20, offset:3}} 
                lg={{span:20, offset:3}} 
            >
                <Title level={2}>New deaths</Title>
            </Col>
            <Col
                xs={{span:24, offset:0}} sm={{span:24, offset:0}} md={{span:24, offset:0}} lg={{span:18, offset:3}} xl={{span:18, offset:3}}
            >
                {countryDeaths ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryDeaths}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                            }}
                    >
                        <CartesianGrid strokeDasharray='4 4'/>
                        <XAxis dataKey='day' angle={-15} dy={5}/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='case' stroke="#CC1034" fill="rgba(204, 16, 52, 0.5)"/>
                    </AreaChart>
                </ResponsiveContainer>
                )
                :
                (null)
                }
            </Col>
            <Col
                xs={{span:23, offset:1}} 
                sm={{span:23, offset:1}} 
                md={{span:20, offset:3}} 
                lg={{span:20, offset:3}} 
            >
                <Title level={2}>New recovered</Title>
            </Col>
            <Col
                xs={{span:24, offset:0}} sm={{span:24, offset:0}} md={{span:24, offset:0}} lg={{span:18, offset:3}} xl={{span:18, offset:3}}
            >
                {countryRecovered ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryRecovered}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                            }}
                    >
                        <CartesianGrid strokeDasharray='4 4'/>
                        <XAxis dataKey='day' angle={-15} dy={5}/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='case' stroke="#CC1034" fill="rgba(204, 16, 52, 0.5)"/>
                    </AreaChart>
                </ResponsiveContainer>
                )
                :
                (null)
                }
            </Col>
            <Col
                xs={{span:23, offset:1}} 
                sm={{span:23, offset:1}} 
                md={{span:20, offset:3}} 
                lg={{span:20, offset:3}} 
            >
                <Title level={2}>Total Data</Title>
            </Col>
            <Col
                xs={{span:24, offset:0}} sm={{span:24, offset:0}} md={{span:24, offset:0}} lg={{span:18, offset:3}} xl={{span:18, offset:3}}
            >
                {allCountryData ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart
                        width={500}
                        height={320}
                        data={allCountryData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                            }}
                    >
                        <CartesianGrid strokeDasharray='4 4'/>
                        <XAxis dataKey='date' angle={-15} dy={5}/>
                        <YAxis dataKey='recovered' allowDataOverflow={true}/>
                        <Tooltip/>
                        <Line type='monotone' dataKey='cases' stroke="#8884d8" activeDot={{ r: 2 }}/>
                        <Line type='monotone' dataKey='recovered' stroke='#82ca9d'/>
                        <Line type='monotone' dataKey='deaths' stroke='#CC1034'/>
                    </LineChart>
                </ResponsiveContainer>
                )
                :
                (null)
                }
            </Col>
        </Row>
    )
}
