import axios from "axios";

const baseURL = 'https://disease.sh/v3/covid-19/'

export const getCountriesData = () => axios.get(`${baseURL}countries`);
export const getDefaultData = () => axios.get(`${baseURL}all`);
export const getAllCovidData = () => axios.get(`${baseURL}historical/all?lastdays=all`)
export const getCountryDetailCovidData = (iso3) => axios.get(`${baseURL}countries/${iso3}`)
export const getCountryHistoryCovidData = (iso3) => axios.get(`${baseURL}historical/${iso3.toLowerCase()}?lastdays=all`)


