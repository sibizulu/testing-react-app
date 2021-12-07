import React, { useState, useEffect } from 'react'
import { Button } from 'baseui/button'
import { orderConfirm } from '../actions'
import { useSendTransaction } from '@usedapp/core'
import { utils } from 'ethers'
import { dummyReceivingWallet } from '../utils'

const Payment = ({ handleFormState, formState, setMessage }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { sendTransaction, state } = useSendTransaction({
    transactionName: 'Send Ethereum'
  })

  useEffect(() => {
    const handlePaymentConfirmation = async () => {
      setIsLoading(true)

      let assetStatus = false
      try {
        const res = await orderConfirm(
          {
            orderId: formState.order,
            paymentMethod: 'crypto',
            paymentReference: 'payment-ref'
          },
          formState.token
        )
        assetStatus = true
      } catch (e) {
        console.log(e)
      }
      setIsLoading(false)
      return assetStatus
    }

    if (state.status === 'Success') {
      const res = handlePaymentConfirmation()
      handleFormState({ asset: res, payment: true })
    }
    if (state.status === 'Fail' || state.status === 'Exception') {
      handleFormState({ payment: false })
    }
  }, [state])

  const handlePayment = async () => {
    setIsLoading(true)
    setMessage('')
    try {
      await sendTransaction({
        to: dummyReceivingWallet,
        value: utils.parseEther('0.001')
      })
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  return (
    <div className="mb-5">
      <Button size="compact" onClick={handlePayment} isLoading={isLoading}>
        Pay With Crypto
      </Button>
    </div>
  )
}

export default Payment
