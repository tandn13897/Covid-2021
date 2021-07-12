import axios from "axios";

export const getCountries = () => axios.get('https://api.covid19api.com/countries');
export const getDefaultData = () => axios.get('https://api.covid19api.com/summary');

export const getCountry = (slug) => axios.get(`https://api.covid19api.com/dayone/country/${slug}`)
