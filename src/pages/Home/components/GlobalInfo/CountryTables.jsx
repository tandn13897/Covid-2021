import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Tabs } from 'antd'

const { TabPane } = Tabs;

export default function CountryTables({ data }) {
    const [topHighestCaseCountry, setTopHighestCaseCountry] = useState([])
    const [topHighestDeathsCountry, setTopHighestDeathsCountry] = useState([])
    const [topHighestRecoveredCountry, setTopHighestRecoveredCountry] = useState([])

    const columns = [
        { key: 'country', title: 'Country', dataIndex: 'Country', responsive:['xs', 'sm', 'md']},
        { key: 'total_cases', title: 'Total Cases', dataIndex: 'TotalConfirmed', responsive:['sm', 'md']},
        { key: 'total_deaths', title: 'Total Deaths', dataIndex: 'TotalDeaths', responsive:['md']},
        { key: 'total_recovered', title: 'Total Recovered', dataIndex: 'TotalRecovered', responsive:['md']},
        { key: 'detail',title: 'More Detail', responsive:['xs', 'sm', 'md'], render: ( row ) => <a href='#'>{row.Country}</a>},
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
                    return b.TotalConfirmed - a.TotalConfirmed
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
                    return b.TotalDeaths - a.TotalDeaths
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
                    return b.TotalRecovered - a.TotalRecovered
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
        <Row align='middle' justify='center' style={{margin:'30px'}}>
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
                        <Table columns={columns} dataSource={data} bordered />
                    </TabPane>
                    <TabPane tab='Top 10 Highest Cases' key='highestCase'>
                        <Table columns={columns} dataSource={topHighestCaseCountry} bordered pagination={false}/>
                    </TabPane>
                    <TabPane tab='Top 10 Highest Deaths' key='highestDeaths'>
                        <Table columns={columns} dataSource={topHighestDeathsCountry} bordered pagination={false}/>
                    </TabPane>
                    <TabPane tab='Top 10 Highest Recovered' key='highestRecovered'>
                        <Table columns={columns} dataSource={topHighestRecoveredCountry} bordered pagination={false}/>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}
