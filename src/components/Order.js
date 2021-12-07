import React, { useState } from 'react'
import { Button } from 'baseui/button'
import { createOrder } from '../actions'
import { dummyOrder } from '../utils'

const Order = ({ handleFormState, formState }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleOrder = async () => {
    setIsLoading(true)

    try {
      const res = await createOrder(dummyOrder, formState.token)
      handleFormState({ order: res.data.data.data })
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  return (
    <div className="mb-5">
      <Button size="compact" onClick={handleOrder}>
        Buy Now
      </Button>
    </div>
  )
}

export default Order
