import axios from 'axios'

export default axios.create({
  baseURL: 'https://sandbox.itsmyne.club/api',
  headers: {
    'Content-type': 'application/json',
    'x-api-key': 'HO1JNVZQA589VE4VMZR3FNC77X6ZT74WUV5976HU'
  }
})
