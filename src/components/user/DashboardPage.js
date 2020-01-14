import React from 'react'
import { connect } from 'react-redux'
import PageHeader from '../general/PageHeader'
import AllUserTags from '../tags/AllUserTags'
import getPoliTransaction from '../../utils/poli/getPoliTransaction'

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: ''
    }
  }

  async componentDidMount() {
    if (localStorage.getItem('poliToken')) {
      const poliTransaction = await getPoliTransaction(this.props.token)
      console.log('poliTransaction:', poliTransaction) 
      
      if (poliTransaction.TransactionStatusCode === 'Completed') {
        // TODO:
        // insert txn record to database x2 tables
        // refresh mobile_data in db-tenancy agreement table for this TAG
        // get TAGs
        // set some message re completed transaction
      }
  
      localStorage.removeItem('poliToken')
      localStorage.removeItem('poliAllProps')
    }
  }

  render() {
    return (
      <div className="Users">
        <PageHeader title={`Your Dashboard, ${this.props.firstName}`} />
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