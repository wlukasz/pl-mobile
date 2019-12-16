import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import UserTagInForm from './UserTagInForm'

export class PayPoliForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      weekly: null,
      amountToPay: 0,
      error: ''
    }
  }

  componentDidMount() {
    this.setUpWeekly()
  }    

  setUpWeekly() {
    if (this.props.poli) {
      const amountsKeys = Object.keys(this.props.poli.weekly_rates_array)
      const weekly = amountsKeys.map( (weeks, index) => {
        let weekOrWeeks
        if (weeks == 1) {
          weekOrWeeks = 'week'
        } else {
          weekOrWeeks = 'weeks'
        }
        return (
          <option
            key={index}
            value={this.props.poli.weekly_rates_array[weeks].amount_to_pay}
          >
          {weeks} {weekOrWeeks} = ${this.props.poli.weekly_rates_array[weeks].amount_to_pay}</option>
        )
      })
      this.setState(() => ({ weekly }))
    } 
  }

  onAmountToPayChange = (e) => {
    const amountToPay = e.target.value
    this.setState(() => ({ amountToPay }))
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.amountToPay || this.state.amountToPay === 0) {
      this.setState(() => ({ error: 'Please select an amount' })) 
    } else {
      this.setState(() => ({ error: '' })) 
      this.props.onSubmit({
        tagId: this.props.poli.tagid,
        amountToPay: this.state.amountToPay
      })
    }
  }

  render() {
    return (
      <div>
        <UserTagInForm 
          allProps={this.props.poli ? this.props.poli : null} 
        />
        <form className="form content-container" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <Form.Group controlId="selectPaymentAmount">
            <Form.Label>Select payment amount</Form.Label>
            <Form.Control as="select" size="lg" onChange={this.onAmountToPayChange}>
              <option value="0">Please select...</option>
              {this.state.weekly !== null && [ ...this.state.weekly ]}
            </Form.Control>
          </Form.Group>
          <div>
            <button className="button-style">Pay with POLi...</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    poli: state.poli.poli ? state.poli.poli.allProps : null
  }
}

export default connect(mapStateToProps)(PayPoliForm)
