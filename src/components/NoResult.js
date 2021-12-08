import React from 'react'
import { Card, StyledBody, StyledAction } from 'baseui/card'
import { Button } from 'baseui/button'
import { useNavigate } from 'react-router-dom'

const NoResult = props => {
  let navigate = useNavigate()

  return (
    <div class="container w-1/3 mx-auto mt-20">
      <Card>
        <StyledBody>
          No result. You can go to listing page and choose your favorite NFT to
          buy now
        </StyledBody>
        <StyledAction>
          <Button onClick={() => navigate('/')}>Back to listing</Button>
        </StyledAction>
      </Card>
    </div>
  )
}

export default NoResult
