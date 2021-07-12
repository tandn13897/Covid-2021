
import axios from 'axios'

const key = '24223353842e4a38b7597111208dcf6f'
const url = 'https://newsapi.org/v2/top-headlines?'
const country = 'us'
const category = 'health'

export const getNews = () => axios.get(`${url}country=${country}&category=${category}&apiKey=${key}`)