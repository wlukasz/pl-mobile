import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../general/PageHeader'
import PayPoliForm from './PayPoliForm'

export class PayPoli extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      error: false
    }
  }

  onSubmit = async (props) => {
    console.log('PayPoli, onSubmit, props:', props)
  }  

  render() {
    return (
      <div>
        <PageHeader title={`Pay with POLi, ${this.props.firstName}`} />
        <div className="content-container">
          {this.state.error !== false && <p className="error-msg">{this.state.error}</p>}
          <PayPoliForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName,
  }
}

export default connect(mapStateToProps)(PayPoli)