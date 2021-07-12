import React from 'react'
import { Row, Col, List } from "antd"
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'

import './todo.css'
import Protect from '../../assests/images/protect.png'

export default function ToDo() {
    return (
        <Row align='middle'>
            <Col
                xs={{span:20, offset:2}} 
                sm={{span:20, offset:2}} 
                md={{span:20, offset:2}} 
                lg={{span:20, offset:2}}
                className='advides__header'
                
            >
                <p>What you need to do</p>
                <h3>How to protect yourself</h3>
            </Col>
            <Col 
                xs={{span:20, offset:2}} 
                sm={{span:20, offset:2}} 
                md={{span:5, offset:3}} 
                lg={{span:4, offset:6}} 
                className='advides__detail'
            >
                <List>
                    <h3>You should do</h3>
                    <List.Item key='rule-one'><CheckOutlined style={{color:'green'}}/> Stay at home</List.Item>
                    <List.Item key='rule-two'><CheckOutlined style={{color:'green'}}/> Wear mask</List.Item>
                    <List.Item key='rule-three'><CheckOutlined style={{color:'green'}}/> Use Sanitizer</List.Item>
                    <List.Item key='rule-four'><CheckOutlined style={{color:'green'}}/> Disinfect your home</List.Item>
                    <List.Item key='rule-five'><CheckOutlined style={{color:'green'}}/> Wash your hands</List.Item>
                    <List.Item key='rule-six'><CheckOutlined style={{color:'green'}}/> Frequent self-isolation</List.Item>
                </List>
            </Col>
            <Col 
                xs={{span:20, offset:2}} 
                sm={{span:20, offset:2}} 
                md={{span:5, offset:1}} 
                lg={{span:4, offset:1}} 
                className='advides__detail'
            >
            <List>
                <h3>You should avoid</h3>
                    <List.Item key='rule-seven'><CloseOutlined style={{color:'red'}}/> Avoid infected people</List.Item>
                    <List.Item key='rule-eight'><CloseOutlined style={{color:'red'}}/> Avoid animals</List.Item>
                    <List.Item key='rule-nine'><CloseOutlined style={{color:'red'}}/> Avoid handshaking</List.Item>
                    <List.Item key='rule-ten'><CloseOutlined style={{color:'red'}}/> Avoid infected surfaces</List.Item>
                    <List.Item key='rule-eleven'><CloseOutlined style={{color:'red'}}/> Don't touch your face</List.Item>
                    <List.Item key='rule-twelve'><CloseOutlined style={{color:'red'}}/> Avoid droplets</List.Item>
                </List>
            </Col>
            <Col
                xs={{span:20, offset:2}} 
                sm={{span:20, offset:2}} 
                md={{span:6, offset:1}} 
                lg={{span:6, offset:1}}
            >
                <img src={Protect} alt='#src' width='100%'/>
            </Col>
        </Row> 
    )
}
