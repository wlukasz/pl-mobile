import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import moment from 'moment'
import UserTagInForm from './UserTagInForm'

export class PayPoliForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dailyArray: null,
      weeklyArray: null,
      amountToPay: 0,
      error: ''
    }
  }

  componentDidMount() {
    if (this.props.poli) {
      if (this.props.poli.daily_rates_array) {
        this.setUpPayAmountsOptionsArray(this.props.poli.daily_rates_array, 'day')
      }
      this.setUpPayAmountsOptionsArray(this.props.poli.weekly_rates_array, 'week')
    }
  }    

  async setUpPayAmountsOptionsArray(ratesObject, periodName) {
    const amountsKeys = Object.keys(ratesObject)
    let optionsArray = amountsKeys.map( (numberOfPeriods, index) => {
      let period
      if (numberOfPeriods == 1) {
        period = periodName 
      } else {
        period = periodName + 's'
      }
      
      return (
        <option
        key={index + periodName}
        value={ratesObject[numberOfPeriods].amount_to_pay}
        >
        {numberOfPeriods} {period} = ${ratesObject[numberOfPeriods].amount_to_pay}</option>
        )
      })

      if (periodName !== 'day') {
        await this.setState(() => ({ dailyArray: optionsArray }))
      } else {
        await this.setState(() => ({ weeklyArray: optionsArray }))
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
              {this.props.poli && this.props.poli.future_weekly_rent.rate &&
              <option value="0">
                *** Weekly Rent changes to ${Math.round(this.props.poli.future_weekly_rent.rate)} on {moment(this.props.poli.future_weekly_rent.effective_date).format("D MMM YYYY")}
              </option>
              }
              {this.state.weeklyArray && [ ...this.state.weeklyArray ]}
              {this.state.dailyArray && [ ...this.state.dailyArray ]}
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
