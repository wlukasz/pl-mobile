import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../general/PageHeader'
import PayPoliForm from './PayPoliForm'
import initiatePoliTransaction from '../../utils/poli/initiatePoliTransaction'
import insertPoliToken from '../../utils/poli/insertPoliToken'
import { storePoliToken } from '../../actions/poli'

export class PayPoli extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      formSubmitted: false,
      error: false
    }
  }

  onSubmit = async (props) => {
    this.setState(() => ({ formSubmitted: true, error: false }))
    console.log('PayPoli, onSubmit, props:', props)
    const poliInitiated = await initiatePoliTransaction(props)
    console.log('poliInitiated:', poliInitiated)
    if (poliInitiated.Success === true) {
      const splitNavigateUrl = poliInitiated.NavigateURL.split("?Token=")
      const poliToken = splitNavigateUrl[1]
      const poliTokenInserted = await insertPoliToken(props, poliToken)
      if (poliTokenInserted.affectedRows === 1) {
        console.log('poliTokenInserted:', poliTokenInserted)
        this.props.storePoliToken({ allProps: props.poli, poliToken })
      } else {
        this.setState(() => ({ error: 'Unexpected Error. Transaction aborted.' }))
      }
      localStorage.setItem('poliAllProps', JSON.stringify(props.poli))
      localStorage.setItem('poliToken', poliToken)
      window.location.href = poliInitiated.NavigateURL
    } else {
      this.setState(() => ({ error: poliInitiated.ErrorMessage }))
    }
  }  

  render() {
    return (
      <div>
        <PageHeader title={`Pay with POLi, ${this.props.firstName}`} />
        {this.state.error !== false && <p className="error-msg">{this.state.error}</p>}
        {!this.state.formSubmitted ? 
        <div>
          <div className="content-container">
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

const mapDispatchToProps = (dispatch) => ({
  storePoliToken: (props) => dispatch(storePoliToken(props))
})

export default connect(mapStateToProps, mapDispatchToProps)(PayPoli)