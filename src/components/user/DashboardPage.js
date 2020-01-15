import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../general/PageHeader'
import AllUserTags from '../tags/AllUserTags'
import getPoliTransaction from '../../utils/poli/getPoliTransaction'
import insertPoliRentRecord from '../../utils/poli/insertPoliRentRecord'
import insertTenancyRentRecord from '../../utils/poli/insertTenancyRentRecord'

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false
    }
  }

  async componentDidMount() {
    this.setState(() => ({ error: false }))
    const poliToken = localStorage.getItem('poliToken')
    if (poliToken) {
      const poliTransaction = await getPoliTransaction(this.props.token)
      console.log('poliTransaction:', poliTransaction) 
      
      if (poliTransaction.TransactionStatusCode === 'Completed') {
        // insert txn record to database x2 tables
        const poliRentRecordDbResponse = await insertPoliRentRecord({ token: this.props.token, poliToken, ...poliTransaction })
        console.log('DashboardPage, poliRentRecordDbResponse:', poliRentRecordDbResponse)
        if (poliRentRecordDbResponse.affectedRows === 0) {
          this.setState(() => ({ error: 'Transaction complete, but error saving POLi payment record.' }))
        }
        
        const poliAllProps = JSON.parse(localStorage.getItem('poliAllProps'))
        const tenancyRentRecordResponse = await insertTenancyRentRecord({ token: this.props.token, tagid: poliAllProps.tagid, amount_paid: poliTransaction.AmountPaid, date_paid: poliTransaction.EndDateTime })
        console.log('DashboardPage, tenancyRentRecordResponse:', tenancyRentRecordResponse)
        if (tenancyRentRecordResponse.affectedRows === 0) {
          this.setState(() => ({ error: this.state.error + 'Transaction complete, but error saving tenancy payment record.' }))
        }
        
        // TODO:
        // refresh mobile_data in db-tenancy agreement table for this TAG
        // get TAGs
        // set some message re completed transaction
      } else {
        // set some message
      }
  
      localStorage.removeItem('poliToken')
      localStorage.removeItem('poliAllProps')
    }
  }

  render() {
    return (
      <div className="Users">
        <PageHeader title={`Your Dashboard, ${this.props.firstName}`} />
        {this.state.error !== false && <p className="error-msg">{this.state.error}</p>}
        <AllUserTags />
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    firstName: state.user.firstName,
  }
}

export default connect(mapStateToProps)(DashboardPage)