import React, { useState, useEffect} from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Row, Col, Typography, Button } from 'antd';
import { getAllCovidData } from '../../../../services/covidAPI/CovidAPI'
import { handleChangeData } from '../../../../unity/Unity'

const {Title} = Typography

export default function LineChart() {
    const [allCaseCovid, setAllCaseCovid] = useState([])
    const [allDeathCovid, setAllDeathCovid] = useState([])
    const [allRecoveredCovid, setAllRecoveredCovid] = useState([])
    const [optionDataCases, setOptionDataCases] = useState([])
    const [optionDataDeaths, setOptionDataDeaths] = useState([])
    const [optionDataRecovered, setOptionDataRecovered] = useState([])
    const [reportType, setReportType] = useState('all')

    useEffect(() => {
        const fetchData = async () => {
            await getAllCovidData()
            .then(res => {
                let chartDataCases = handleChangeData(res.data,'cases')
                let chartDataDeaths = handleChangeData(res.data, 'deaths')
                let chartDataRecovered = handleChangeData(res.data, 'recovered')
                setAllCaseCovid(chartDataCases)
                setAllDeathCovid(chartDataDeaths)
                setAllRecoveredCovid(chartDataRecovered)
            }) 
            .catch(err => {
                alert(err)
            })
        }

        fetchData()
    },[])

    useEffect(() => {
        let customDataCases = [];
        let customDataDeaths = [];
        let customDataRecovered = []
        switch(reportType) {
            case 'all':
                customDataCases = allCaseCovid
                customDataDeaths = allDeathCovid
                customDataRecovered = allRecoveredCovid
                break;
            case '30':
                customDataCases = allCaseCovid.slice(allCaseCovid.length - 30)
                customDataDeaths = allDeathCovid.slice(allDeathCovid.length - 30)
                customDataRecovered = allRecoveredCovid.slice(allRecoveredCovid.length - 30)
                break;
            case '7':
                customDataCases = allCaseCovid.slice(allCaseCovid.length - 7)
                customDataDeaths = allDeathCovid.slice(allDeathCovid.length - 7)
                customDataRecovered = allRecoveredCovid.slice(allRecoveredCovid.length - 7)
                break;
            default:
                customDataCases = allCaseCovid
                customDataDeaths = allDeathCovid
                customDataRecovered = allRecoveredCovid
                break;
        }
        setOptionDataCases(customDataCases)
        setOptionDataDeaths(customDataDeaths)
        setOptionDataRecovered(customDataRecovered)
    }, [allCaseCovid, reportType, allDeathCovid, allRecoveredCovid])

    return (
        <Row style={{height:'1000px', padding:'30px 0'}}>
            <Col
                xs={24} 
                sm={24} 
                md={{span:20, offset:2}} 
                lg={{span:20, offset:2}} 
            >
                <Title level={2}>Worldwide Situation</Title>
            </Col>
            <Col
                xs={24} 
                sm={24} 
                md={{span:20, offset:2}} 
                lg={{span:20, offset:2}}
            >
                <Button type='text' onClick={() => setReportType('all') }>All</Button>
                <Button type='text' onClick={() => setReportType('30')}>30 Days</Button>
                <Button type='text' onClick={() => setReportType('7')}>7 Dyas</Button>
            </Col>
            <Col xs={24} sm={24} md={{span:20, offset:2}} lg={{span:20, offset:2}} >
                <Title level={4}>Cases</Title>
            </Col>
            <Col
                xs={24} 
                sm={24} 
                md={{span:20, offset:2}} 
                lg={{span:20, offset:2}}
            >
                { allCaseCovid ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={optionDataCases}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                            }}
                    >
                        <CartesianGrid strokeDasharray='4 4'/>
                        <XAxis dataKey='day'/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='case' stroke="#CC1034" fill="rgba(204, 16, 52, 0.5)"/>
                    </AreaChart>
                </ResponsiveContainer>
                )
                :
                (null)}
            </Col>
            <Col xs={24} sm={24} md={{span:20, offset:2}} lg={{span:20, offset:2}} >
                <Title level={4}>Deaths</Title>
            </Col>
            <Col
                xs={24} 
                sm={24} 
                md={{span:20, offset:2}} 
                lg={{span:20, offset:2}}
            >
                { allDeathCovid ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={optionDataDeaths}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                            }}
                    >
                        <CartesianGrid strokeDasharray='4 4'/>
                        <XAxis dataKey='day'/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='case' stroke="#CC1034" fill="rgba(204, 16, 52, 0.5)"/>
                    </AreaChart>
                </ResponsiveContainer>
                )
                :
                (null)}
            </Col>
            <Col xs={24} sm={24} md={{span:20, offset:2}} lg={{span:20, offset:2}} >
                <Title level={4}>Recovered</Title>
            </Col>
            <Col
                xs={24} 
                sm={24} 
                md={{span:20, offset:2}} 
                lg={{span:20, offset:2}}
            >
                { allRecoveredCovid ? 
                (
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={optionDataRecovered}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                            }}
                    >
                        <CartesianGrid strokeDasharray='4 4'/>
                        <XAxis dataKey='day'/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='case' stroke="#CC1034" fill="rgba(204, 16, 52, 0.5)"/>
                    </AreaChart>
                </ResponsiveContainer>
                )
                :
                (null)}
            </Col>
        </Row>
    )
}
