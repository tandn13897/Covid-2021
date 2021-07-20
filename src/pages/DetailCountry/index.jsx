import React, {useState, useEffect} from 'react'
import { Select, Row, Col, Spin} from 'antd'
import Header from '../../components/Header/Header'
import { getCountriesData } from '../../services/covidAPI/CovidAPI'
import { GlobalActions, GlobalReducer } from '../../redux/slices/slicesDetails/GlobalSlices'
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCountryDetailCovidData, 
        getCountryHistoryCovidData } from '../../services/covidAPI/CovidAPI'
import CountryDetail from './components/CountryDetail'
import './detailCountry.css'

const {Option} = Select

export default function Detail() {
    const countryDetailId = useSelector(state => state.GlobalReducer.countryId)
    const [countryData, setCountryData] = useState([])
    const [countries, setCountries] = useState([])
    const [countryHistoryData, setCountryHistoryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dispacth = useDispatch()
    const history = useHistory()

    useEffect(() => {
        getCountriesData()
            .then(res => {
                setCountries(res.data)
            })
            .catch(err => {
                alert(err)
            })
    },[])

    const handleInputKey = (id) => {
        dispacth(GlobalActions.getCountryId(id)) 
        history.push(`/country/${id}`)    
    }

    useEffect(() => {
        setIsLoading(true);
        const getCountryData = async () => {
            await getCountryDetailCovidData(countryDetailId)
            .then(res => {
                setCountryData(res.data)   
            })
            .catch(err => {
                alert(err)
            });

            await getCountryHistoryCovidData(countryDetailId)
            .then(res => {
                setCountryHistoryData(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                alert(err)
            })

        }
        
        getCountryData()
    }, [countryDetailId])

    return (
        <div>
            <Header/>
            <Row>
                <Col
                    xs={{span:20, offset:2}} 
                    sm={{span:20, offset:2}} 
                    md={{span:16, offset:4}} 
                    lg={{span:16, offset:4}}
                    flex
                    style={{justifyContent:'center', alignItems:'center'}}
                >
                <Select
                    showSearch
                    style={{width:'100%'}}
                    placeholder='Select a country'
                    optionFilterProp='children'
                    filterOption={(input, option) => 
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={handleInputKey}
                >
                    {countries && countries.map((country,index) => {
                        return (
                            <Option value={country.countryInfo.iso3} key={index}>
                                {/* <img src={country.countryInfo.flag} alt='#src' height='16px' width='20px'/> */}
                                {`${'\u00A0'}${country.country}`}
                            </Option>
                        )
                    })}
                </Select>
                </Col>
            </Row>
            { isLoading ? 
            (
                <div style={loadingStyle}>
                    <Spin size='large'></Spin>
                </div>
            )
            :
            (
                <CountryDetail data={countryData} historyData={countryHistoryData}/>
            )}
        </div>
    )
}

const loadingStyle = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:'2',
    maxHeight:'none',
    width:'100vw',
    position:'fixed',
    top:'0',
    left:'0',
    backgroundColor:'rgba(0,0,0,0.2)',
    height:'100vh'
}
