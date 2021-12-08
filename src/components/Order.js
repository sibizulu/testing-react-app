import React, { useState } from 'react'
import { Button } from 'baseui/button'
import { createOrder } from '../actions'

const Order = ({ handleFormState, formState, data }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleOrder = async () => {
    setIsLoading(true)
    const orderObj = {
      amount: data.price,
      currency: 'USD',
      assetId: data._id,
      numberOfCopy: 1
    }

    try {
      const res = await createOrder(orderObj, formState.token)
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
