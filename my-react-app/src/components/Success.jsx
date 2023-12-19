import React from 'react'
import Alert from 'react-bootstrap/Alert'

export const Success = ({message}) => {
  return (
    <div>
      <Alert key={'success'} variant={'success'}>
          {message}
        </Alert>
    </div>
  )
}


