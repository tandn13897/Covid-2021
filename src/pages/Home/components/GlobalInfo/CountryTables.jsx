import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Tabs, Button } from 'antd'
import numeral from 'numeral';
import { useDispatch } from 'react-redux'
import { GlobalActions } from '../../../../redux/slices/slicesDetails/GlobalSlices'
import { useHistory } from 'react-router'

const { TabPane } = Tabs;

export default function CountryTables({ data }) {
    const [topHighestCaseCountry, setTopHighestCaseCountry] = useState([])
    const [topHighestDeathsCountry, setTopHighestDeathsCountry] = useState([])
    const [topHighestRecoveredCountry, setTopHighestRecoveredCountry] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    const handleUserChoice = (countryId) => {
        dispatch(GlobalActions.getCountryId(countryId))
        history.push(`/country/${countryId}`)
    }

    const columns = [
        {   key: 'country', 
            title: 'Country', 
            dataIndex: 'country', 
            responsive:['xs', 'sm', 'md'], 
            render: (text, record, index) => 
                (<Button 
                    type='text' 
                    href='#' 
                    icon={<img src={record.countryInfo.flag} alt='#src' height='16px' width='20px'/>}
                    onClick={() => handleUserChoice(record.countryInfo.iso3)}
                >
                        {`${'\u00A0'}${text}`}
                </Button>)
        },
        {   key: 'total_cases', 
            title: 'Total Cases', 
            dataIndex: 'cases', 
            responsive:['xs', 'sm', 'md'], 
            render: (text) => (
                numeral(text).format('0,0')
            )
        },
        {   key: 'total_deaths', 
            title: 'Total Deaths', 
            dataIndex: 'deaths', 
            responsive:['md'],
            render: (text) => (
                numeral(text).format('0,0')
            )
        },
        {   key: 'total_recovered', 
            title: 'Total Recovered', 
            dataIndex: 'recovered', 
            responsive:['md'],
            render: (text) => (
                numeral(text).format('0,0')
            )
        },
    ]

    const topHighestCase = ( arr, n ) => {
        if (arr) {
            if ( n > arr.length ) {
                return false;
            }
            return setTopHighestCaseCountry(
                arr
                .slice()
                .sort((a,b) => {
                    return b.cases - a.cases
                })
                .slice(0, n))
        }
    }

    const topHighestDeaths = ( arr, n ) => {
        if (arr) {
            if ( n > arr.length ) {
                return false;
            }
            return setTopHighestDeathsCountry(
                arr
                .slice()
                .sort((a,b) => {
                    return b.deaths - a.deaths
                })
                .slice(0, n))
        }
    }

    const topHighestRecovered = ( arr, n ) => {
        if (arr) {
            if ( n > arr.length ) {
                return false;
            }
            return setTopHighestRecoveredCountry(
                arr
                .slice()
                .sort((a,b) => {
                    return b.recovered - a.recovered
                })
                .slice(0, n))
        }
    }

    useEffect(() => {
        topHighestCase(data, 10)
        topHighestDeaths(data, 10)
        topHighestRecovered(data, 10)
    }, [data])

    return (
        <Row align='middle' justify='center' style={{margin:'30px 0', padding:'20px 0'}}>
            <Col 
                xs={24} 
                sm={24} 
                md={{span:21, offset:1}} 
                lg={{span:21, offset:1}}
                style={{
                    textAlign:'center'
                }}
            >
                <Tabs type='card'>
                    <TabPane tab='Default' key='default'>
                        <Table columns={columns} dataSource={data} bordered rowKey={record => record.countryInfo.iso3}/>
                    </TabPane>
                    <TabPane tab='Top 10 Highest Cases' key='highestCase'>
                        <Table columns={columns} dataSource={topHighestCaseCountry} bordered pagination={false} />
                    </TabPane>
                    <TabPane tab='Top 10 Highest Deaths' key='highestDeaths'>
                        <Table columns={columns} dataSource={topHighestDeathsCountry} bordered pagination={false} />
                    </TabPane>
                    <TabPane tab='Top 10 Highest Recovered' key='highestRecovered'>
                        <Table columns={columns} dataSource={topHighestRecoveredCountry} bordered pagination={false} />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}
