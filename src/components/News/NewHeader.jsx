import React, {useState, useEffect} from 'react'
import { Row, Col } from 'antd'
import Data from '../../data/news.json'

export default function NewHeader() {
    const [technologyData, setTechnologyData] = useState([])

    useEffect(() => {
        setTechnologyData(Data.header)
    }, [])

    return (
        <div style={{margin:'20px 0'}}>    
            {technologyData[0] && technologyData[1] && technologyData[2]?
            (
            <Row gutter={[0, 20]}>
                <Col xs={{span:22, offset:1}} sm={{span:20, offset:2}} md={{span:20, offset:2}} lg={{span:10, offset:2}}>
                    <div
                        style={{backgroundImage:`url('${technologyData[0].urlToImage}')`}} 
                        className='news_one'
                    >
                        <div>
                            {technologyData[0].title}
                        </div>
                    </div>
                </Col>
                <Col xs={{span:22, offset:1}} sm={{span:20, offset:2}} md={{span:20, offset:2}} lg={{span:10, offset:0}}>
                    <Row>
                        <Col span={24}>
                            <div style={{backgroundImage:`url('${technologyData[1].urlToImage}')`}} className='news_two'>
                                <div>
                                    {technologyData[1].title}
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div style={{backgroundImage:`url('${technologyData[2].urlToImage}')`}} className='news_three'>
                                <div>
                                    {technologyData[2].title}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>)
            :
            (null)
            } 
        </div>
    )
}