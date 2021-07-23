import React, {useState, useEffect} from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Row, Col, Typography, Button } from 'antd';
import { handleChangeData, handleChangeDataTotal } from '../../../unity/Unity'
import _ from 'lodash'
import numeral from 'numeral';

const { Title } = Typography

export default function ChartDetail({history}) {
    const [countryCases, setCountryCases] = useState([])
    const [countryDeaths, setCountryDeaths] = useState([])
    const [countryRecovered, setCountryRecovered] = useState([])
    const [countryTotalCases, setCountryTotalCases] = useState([])
    const [countryTotalDeaths, setCountryTotalDeaths] = useState([])
    const [countryTotalRecovered, setCountryTotalRecovered] = useState([])
    const [countryOptionCases, setCountryOptionCases] = useState([])
    const [countryOptionDeaths, setCountryOptionDeaths] = useState([])
    const [countryOptionRecovered, setCountryOptionRecovered] = useState([])
    const [countryOptionTotalCases, setCountryOptionTotalCases] = useState([])
    const [countryOptionTotalDeaths, setCountryOptionTotalDeaths] = useState([])
    const [countryOptionTotalRecovered, setCountryOptionTotalRecovered] = useState([])
    const [reportType, setReportType] = useState('all')

    // const [allCountryData, setAllCountryData] = useState([])

    useEffect(() => {
        if (history.timeline) {
            let chartCasesData = handleChangeData(history.timeline, 'cases')
            let chartDeathsData = handleChangeData(history.timeline, 'deaths')
            let chartRecoveredData = handleChangeData(history.timeline, 'recovered')
            let chartAllCases = handleChangeDataTotal(history.timeline, 'cases')
            let chartAllDeaths = handleChangeDataTotal(history.timeline, 'deaths')
            let chartAllRecovered = handleChangeDataTotal(history.timeline, 'recovered')
            
            // chartAllCases = chartAllCases.map((item, index) => {
            //     return (
            //         {date: item.day, cases: numeral(item.case).format('0.0a')}
            //     )
            // })

            // chartAllDeaths = chartAllDeaths.map((item, index) => {
            //     return (
            //         {date: item.day, deaths: numeral(item.case).format('0.0a')}
            //     )
            // })

            // chartAllRecovered = chartAllRecovered.map((item, index) => {
            //     return (
            //         {date: item.day, recovered: numeral(item.case).format('0.0a')}
            //     )
            // })

            // let mergeData = _(chartAllCases)
            //     .concat(chartAllDeaths, chartAllRecovered)
            //     .groupBy('date')
            //     .map(_.spread(_.merge))
            //     .value();

            setCountryCases(chartCasesData)
            setCountryDeaths(chartDeathsData)
            setCountryRecovered(chartRecoveredData)
            setCountryTotalCases(chartAllCases)
            setCountryTotalDeaths(chartAllDeaths)
            setCountryTotalRecovered(chartAllRecovered)

            // setAllCountryData(mergeData)
        }
    },[history])

    useEffect(() => {
        let customDataCases = [];
        let customDataDeaths = [];
        let customDataRecovered = [];
        let customTotalDataCases = [];
        let customTotalDataDeaths = [];
        let customTotalDataRecovered = [];
        switch(reportType) {
            case 'all':
                customDataCases = countryCases
                customDataDeaths = countryDeaths
                customDataRecovered = countryRecovered
                customTotalDataCases = countryTotalCases
                customTotalDataDeaths = countryTotalDeaths
                customTotalDataRecovered = countryTotalRecovered
                break;
            case '30':
                customDataCases = countryCases.slice(countryCases.length - 30)
                customDataDeaths = countryDeaths.slice(countryDeaths.length - 30)
                customDataRecovered = countryRecovered.slice(countryRecovered.length - 30)
                customTotalDataCases = countryTotalCases.slice(countryTotalCases.length - 30)
                customTotalDataDeaths = countryTotalDeaths.slice(countryTotalDeaths.length - 30)
                customTotalDataRecovered = countryTotalRecovered.slice(countryTotalRecovered.length - 30)
                break;
            case '7':
                customDataCases = countryCases.slice(countryCases.length - 7)
                customDataDeaths = countryDeaths.slice(countryDeaths.length - 7)
                customDataRecovered = countryRecovered.slice(countryRecovered.length - 7)
                customTotalDataCases = countryTotalCases.slice(countryTotalCases.length - 7)
                customTotalDataDeaths = countryTotalDeaths.slice(countryTotalDeaths.length - 7)
                customTotalDataRecovered = countryTotalRecovered.slice(countryTotalRecovered.length - 7)
                break;
            default:
                customDataCases = countryCases
                customDataDeaths = countryDeaths
                customDataRecovered = countryRecovered
                customTotalDataCases = countryTotalCases
                customTotalDataDeaths = countryTotalDeaths
                customTotalDataRecovered = countryTotalRecovered
                break;
        }
            setCountryOptionCases(customDataCases)
            setCountryOptionDeaths(customDataDeaths)
            setCountryOptionRecovered(customDataRecovered)
            setCountryOptionTotalCases(customTotalDataCases)
            setCountryOptionTotalDeaths(customTotalDataDeaths)
            setCountryOptionTotalRecovered(customTotalDataRecovered)
    }, [reportType, countryCases, countryDeaths, countryRecovered, countryTotalCases, countryTotalDeaths, countryTotalRecovered])

    return (
        <Row style={{height:'1800px', marginTop:'50px'}}>
            <Col
                xs={24} 
                sm={24} 
                md={{span:20, offset:3}} 
                lg={{span:20, offset:3}}
            >
                <Button type='text' onClick={() => setReportType('all') }>All</Button>
                <Button type='text' onClick={() => setReportType('30')}>30 Days</Button>
                <Button type='text' onClick={() => setReportType('7')}>7 Dyas</Button>
            </Col>
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
                {countryOptionCases ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryOptionCases}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                            }}
                    >
                        <CartesianGrid strokeDasharray='4 4'/>
                        <XAxis dataKey='day' angle={-15} dy={5}/>
                        <YAxis />
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
                {countryOptionDeaths ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryOptionDeaths}
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
                {countryOptionRecovered ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryOptionRecovered}
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
                <Title level={2}>Total Cases</Title>
            </Col>
            <Col
                xs={{span:24, offset:0}} sm={{span:24, offset:0}} md={{span:24, offset:0}} lg={{span:18, offset:3}} xl={{span:18, offset:3}}
            >
                {countryOptionTotalCases ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryOptionTotalCases}
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
                <Title level={2}>Total Deaths</Title>
            </Col>
            <Col
                xs={{span:24, offset:0}} sm={{span:24, offset:0}} md={{span:24, offset:0}} lg={{span:18, offset:3}} xl={{span:18, offset:3}}
            >
                {countryOptionTotalDeaths ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryOptionTotalDeaths}
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
                <Title level={2}>Total Recovered</Title>
            </Col>
            <Col
                xs={{span:24, offset:0}} sm={{span:24, offset:0}} md={{span:24, offset:0}} lg={{span:18, offset:3}} xl={{span:18, offset:3}}
            >
                {countryOptionTotalRecovered ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={320}
                        data={countryOptionTotalRecovered}
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
        </Row>
    )
}
