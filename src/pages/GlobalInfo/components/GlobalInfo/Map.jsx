import React from 'react'
import { MapContainer as LeafletMap, TileLayer,Circle, Popup} from 'react-leaflet'
import { Row, Col, Card, Typography, Space} from 'antd'
import numeral from 'numeral'

import './map.css'
import "leaflet/dist/leaflet.css";

const { Text } = Typography

const showDataOnMap = (data, casesType = "cases") =>
    data.map((country, index) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={'#CC1034'}
            fillColor={'#CC1034'}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType]) * 200
            }
            key={index}
        >
        <Popup>
            <Card
                title={<p>
                    <img src={country.countryInfo.flag} alt='#src' width='50px' style={{border:'1px solid black'}}/>
                    {'\u00A0'}
                    {country.country}
                </p>}
            >
                <Space direction='vertical'>
                    <Text type='warning'>Cases: {numeral(country.cases).format('0,0')}</Text>
                    <Text type='danger'>Deaths: {numeral(country.deaths).format('0,0')}</Text>
                    <Text type='success'>Recovered: {numeral(country.recovered).format('0,0')}</Text>
                </Space>
            </Card>
        </Popup>
    </Circle>
));

export default function CovidMap({countries, casesType}) {
    
    return (
        <Row style={{marginTop:'20px'}}>
            <Col
                xs={24} 
                sm={24} 
                md={{span:20, offset:2}} 
                lg={{span:20, offset:2}}
                style={{
                    textAlign:'center'
                }}
            >
                <div className='map_container'>
                    <LeafletMap center={[34.80746,-40.4796]} zoom={3}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {showDataOnMap(countries, casesType)}
                    </LeafletMap>
                </div>
            </Col>
        </Row>
    )
}
