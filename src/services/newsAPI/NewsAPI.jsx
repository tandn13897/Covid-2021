
import axios from 'axios'

const key = '24223353842e4a38b7597111208dcf6f'
const url = 'https://newsapi.org/v2/top-headlines?'
const country = 'us'
const health = 'health'
const technology = 'technology'

export const getNews = () => axios.get(`${url}country=${country}&category=${health}&apiKey=${key}`)
export const getNewsTechnology = () => axios.get(`${url}country=${country}&category=${technology}&apiKey=${key}`)