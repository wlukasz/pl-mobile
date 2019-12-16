import React from 'react'
import { Card } from 'react-bootstrap'

export default (props) => {
  console.log('userTagInForm, props:', props)
  return (
    <div className="content-container">
      <Card border={props.allProps ? props.allProps.dash_tag_bar_color : null} style={{ width: '100%', marginBottom: '1.5rem' }}>
        <Card.Body>
          <Card.Title>{props.allProps ? props.allProps.property : null}</Card.Title>
          <Card.Text className="mb-2 text-muted"> 
            {props.allProps ? props.allProps.dash_tag_bar_msg : null}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
