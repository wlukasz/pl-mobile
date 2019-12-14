import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default (props) => {
  return (
    <div className="content-container">
      <Card border="info" style={{ width: '100%', marginBottom: '1.5rem' }}>
        <Card.Body>
          <Card.Title>{props.property}</Card.Title>
          <Button variant={props.dashTagBarColor} style={{ width: '100%' }} size="lg">{props.dashTagBarMsg}</Button>
        </Card.Body>
      </Card>
    </div>
  )
}
