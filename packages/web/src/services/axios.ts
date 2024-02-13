import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
  //headers: { 'X-Custom-Header': 'foobar' },
})
