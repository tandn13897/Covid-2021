import React, { useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import {  GlobalReducer } from '../../../redux/slices/slicesDetails/GlobalSlices'
import CountriesMap from '../../../data/countries.json'
import L from 'leaflet'
import { MapContainer, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const countryStyle = {
    fillColor:'red',
    fillOpacity:0.5,
    color:'black',
    weight:2,
}

export default function CountryMap({data}) {
    const countryDetailId = useSelector(state => state.GlobalReducer.countryId)
    const [countryMap, setCountryMap] = useState([])
    const [lat, setLat] = useState(20)
    const [long, setLong] = useState(50)

    useEffect(() => {
        if (data) {
            const element = CountriesMap.features.findIndex(
                function(item, i){
                    if ( item.properties.ISO_A3 === countryDetailId)
                    return i
                })
            setCountryMap(CountriesMap.features[element])
            if ( data.countryInfo ) {
                setLat(data.countryInfo.lat)
                setLong(data.countryInfo.long)
            }
        }
    },[countryDetailId, data])

    
    function ChangeView({ center, zoom}) {
        const map = useMap()
        map.setView(center, zoom)
        return null
    }

    return (
        <div style={{height:'100%', margin:'40px 10px 0'}}>
            <MapContainer style={{height:'100%'}} zoom={2} center={[lat, long]}>
                <ChangeView center={[lat, long]} zoom={5}/>
                <GeoJSON data={CountriesMap.features} />
                <GeoJSON data={countryMap} style={countryStyle}/>
            </MapContainer>
        </div>
    )
}
