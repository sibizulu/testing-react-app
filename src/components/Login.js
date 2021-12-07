import React, { useState, useEffect } from 'react'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { login } from '../actions'

export default ({ handleFormState }) => {
  const [userName, setUserName] = useState('dibin')
  const [password, setPassword] = useState('dibinItsmyne')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (userName !== '' && password !== '') {
      setIsError(false)
    }
  }, [userName, password])

  const handleLogin = async () => {
    if (userName === '' || password === '') {
      setIsError(true)
      return
    }

    setIsLoading(true)
    try {
      const res = await login({ userName, password })
      handleFormState({ token: res.data.data.data })
    } catch (e) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  return (
    <div className="w-1/2 mb-5">
      <div className="my-2">
        <Input
          {...{
            value: userName,
            onChange: e => setUserName(e.target.value),
            placeholder: 'Username',
            clearOnEscape: true
          }}
        />
      </div>
      <div className="my-2">
        <Input
          {...{
            value: password,
            type: 'password',
            onChange: e => setPassword(e.target.value),
            placeholder: 'Password',
            clearOnEscape: true
          }}
        />
      </div>
      {isError && (
        <p className="text-sm text-red-500">Please enter valid data</p>
      )}
      <Button {...{ isLoading, onClick: handleLogin }}>Login</Button>
    </div>
  )
}
