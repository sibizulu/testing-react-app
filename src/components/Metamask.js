import React, { useEffect } from 'react'
import { Button } from 'baseui/button'
import { useEthers, useEtherBalance } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

const Metamask = ({ handleFormState }) => {
  const { activateBrowserWallet, account } = useEthers()

  useEffect(() => {
    handleFormState({ wallet: account })
  }, [account])

  const handleConnectWallet = async () => {
    console.log('ee')
    const res = await activateBrowserWallet()
    console.log('done', res)
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
