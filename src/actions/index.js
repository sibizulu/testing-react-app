import http from './axios'

export const login = data => http.post('/user/login', data)
export const createOrder = (data, token) =>
  http.post('/order/create', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
export const orderConfirm = (data, token) =>
  http.post('/payment/sale', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
