import React, { useState, useEffect } from 'react'
import { ProgressSteps, Step } from 'baseui/progress-steps'
import { Button } from 'baseui/button'
import Metamask from './Metamask'
import { Mumbai, DAppProvider, useEthers } from '@usedapp/core'
import { useLocalStorage } from '../hook'
import { Modal, ModalHeader, ModalBody } from 'baseui/modal'
import { Notification, KIND } from 'baseui/notification'
import { truncate } from '../utils'

import Login from './Login'
import Order from './Order'
import Payment from './Payment'

export default ({ isOpen, handlePopup }) => {
  const { account } = useEthers()
  const [formState, setFormState] = useLocalStorage('formState', {})
  const [current, setCurrent] = useState(0)
  const [message, setMessage] = useState('')

  const config: Config = {
    readOnlyChainId: Mumbai.chainID,
    readOnlyUrls: {
      [Mumbai.chainID]: 'https://rpc-mumbai.maticvigil.com'
    }
  }
  const handleFormState = newState =>
    setFormState({ ...formState, ...newState })

  useEffect(() => {
    if (current === 0) {
      setMessage('')
    }
  }, [current])

  useEffect(() => {
    setFormState({})
  }, [])

  useEffect(() => {
    let msg = ''

    if (formState.hasOwnProperty('payment')) {
      msg =
        formState.payment === false
          ? 'Your payment not completed. You can try again'
          : ''
    }
    if (formState.hasOwnProperty('asset')) {
      msg =
        formState.asset === true
          ? 'Your payment successfully completed. You will receive your asset shortly'
          : 'Your payment successfully completed. Asset is not transfered. Please contact admin'
    }

    setMessage(msg)
  }, [formState])

  return (
    <Modal
      onClose={() => handlePopup(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      closeable={false}>
      <ModalHeader>Buy Process</ModalHeader>
      <ModalBody>
        <DAppProvider config={config}>
          <ProgressSteps current={current}>
            <Step
              title={
                formState.wallet
                  ? `Connected Wallet - ${truncate(formState.wallet, 20)}`
                  : `Connecting Wallet`
              }>
              {!formState.wallet && <Metamask {...{ handleFormState }} />}
              <Button
                onClick={() => setCurrent(1)}
                disabled={!formState.wallet}
                size="compact">
                Next
              </Button>
            </Step>
            <Step
              title={formState.token ? `Connected User` : `Connecting User`}>
              {!formState.token && <Login {...{ handleFormState }} />}
              <Button
                onClick={() => setCurrent(2)}
                disabled={!formState.token}
                size="compact">
                Next
              </Button>
            </Step>

            <Step title={formState.order ? `Order created` : `Buy Now`}>
              {!formState.order && (
                <Order {...{ handleFormState, formState }} />
              )}
              <Button
                onClick={() => setCurrent(3)}
                size="compact"
                disabled={!formState.order}>
                Next
              </Button>
            </Step>

            <Step title={formState.payment ? `Payment Completed` : `Payment`}>
              {!formState.payment ? (
                <Payment {...{ handleFormState, formState, setMessage }} />
              ) : (
                <Button
                  onClick={() => {
                    setFormState({})
                    setCurrent(0)
                    handlePopup(false)
                  }}
                  size="compact">
                  Close
                </Button>
              )}
            </Step>
          </ProgressSteps>
          {message !== '' && (
            <Notification
              kind={
                formState.asset && formState.asset === true
                  ? KIND.positive
                  : KIND.warning
              }
              overrides={{
                Body: {
                  style: ({ $theme }) => ({
                    width: '100%'
                  })
                }
              }}>
              {message}
            </Notification>
          )}
        </DAppProvider>
      </ModalBody>
    </Modal>
  )
}
