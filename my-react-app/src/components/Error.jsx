import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default function Error () {
  return (
    <div>
      <Alert key={'warning'} variant={'warning'}>
          Something went wrong. Try again!
        </Alert>
    </div>
  )
}