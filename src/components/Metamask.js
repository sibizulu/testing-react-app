import React, { useEffect } from 'react'
import { Button } from 'baseui/button'
import { useEthers, useEtherBalance } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

const Metamask = ({ handleFormState }) => {
  const { activateBrowserWallet, account, error } = useEthers()

  useEffect(() => {
    handleFormState({ wallet: account })
  }, [account])

  const handleConnectWallet = async () => {
    await activateBrowserWallet()
  }

  return (
    <div className="mb-5">
      <Button size="compact" onClick={activateBrowserWallet}>
        Metamask
      </Button>
    </div>
  )
}

export default Metamask
