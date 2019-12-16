import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { history } from '../../routers/AppRouter'
import { tagToPay } from '../../actions/poli'

export class UserTag extends React.Component {
  constructor(props) {
    super(props)
  }

  onButtonClick = () => {
    const tagToPay = {
      allProps: this.props.allProps
    }
    this.props.tagToPay(tagToPay)
    history.push('/paypoli')
  }

  render() {
    return (
      <div className="content-container">
        <Card border={this.props.dashTagBarColor} style={{ width: '100%', marginBottom: '1.5rem' }}>
          <Card.Body>
            <Card.Title>{this.props.property}</Card.Title>
            <Button 
              variant={this.props.dashTagBarColor} 
              style={{ width: '100%' }} size="lg"
              onClick={this.onButtonClick}
            > 
              {this.props.dashTagBarMsg}
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  tagToPay: (props) => dispatch(tagToPay(props))
})

export default connect(undefined, mapDispatchToProps)(UserTag)