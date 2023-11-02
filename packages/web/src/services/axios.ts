import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://webchat-2mad.onrender.com',
  timeout: 10000,
  //headers: { 'X-Custom-Header': 'foobar' },
})
