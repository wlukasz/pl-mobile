import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../general/PageHeader'
import PayPoliForm from './PayPoliForm'

export class PayPoli extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      formSubmitted: false,
      error: false
    }
  }

  onSubmit = async (props) => {
    this.setState(() => ({ formSubmitted: true }))
    console.log('PayPoli, onSubmit, props:', props)
  }  

  render() {
    return (
      <div>
        <PageHeader title={`Pay with POLi, ${this.props.firstName}`} />
        {!this.state.formSubmitted ? 
        <div>
          <div className="content-container">
            {this.state.error !== false && <p className="error-msg">{this.state.error}</p>}
            <PayPoliForm
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
        :
        <p>Form has been submitted</p>}
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