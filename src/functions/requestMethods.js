import axios from 'axios'

const BASE_URL = 'https://lifeworthhmoenrolleeapp.com/api/'

// FUNCTION TO HANDLE REQUESTS THAT DOES NOT REQUIRE AUTH
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: '*',
    'Content-Type': 'application/json',
  },
})
