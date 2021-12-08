import React, { useState, useEffect } from 'react'
import { Button } from 'baseui/button'
import { orderConfirm } from '../actions'
import { useSendTransaction } from '@usedapp/core'
import { utils } from 'ethers'
import { dummyReceivingWallet } from '../utils'
import { useEthers } from '@usedapp/core'

const Payment = ({ handleFormState, formState, setMessage, data }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { chainId } = useEthers()
  const { sendTransaction, state } = useSendTransaction({
    transactionName: 'Send Ethereum'
  })
  const networks = network => {
    const nets = {
      97: 'BNB',
      80001: 'MATIC',
      3: 'ETH',
      4: 'ETH',
      42: 'ETH'
    }
    return nets[network] ? nets[network] : null
  }

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
      handlePaymentConfirmation().then(res => {
        handleFormState({ asset: res, payment: true })
      })
    }
    if (state.status === 'Fail' || state.status === 'Exception') {
      handleFormState({ payment: false })
    }
  }, [state])

  const handlePayment = async () => {
    setIsLoading(true)
    setMessage('')
    try {
      if (data?.convertedPrices[networks(chainId)]) {
        await sendTransaction({
          to: dummyReceivingWallet,
          value: utils.parseEther(
            data?.convertedPrices[networks(chainId)].toString()
          )
        })
      } else {
        throw 'Something went wrong'
      }
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex gap-10 mb-5">
      {networks(chainId) !== null && (
        <Button size="compact" onClick={handlePayment} isLoading={isLoading}>
          {`Pay ${data?.convertedPrices[networks(chainId)]} ${networks(
            chainId
          )}`}
        </Button>
      )}
      <Button size="compact" disabled={true}>
        Pay {data?.price} USD
      </Button>
    </div>
  )
}

export default Payment
