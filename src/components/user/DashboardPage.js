import React from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import PageHeader from '../general/PageHeader'
import AllUserTags from '../tags/AllUserTags'
import getPoliTransaction from '../../utils/poli/getPoliTransaction'
import insertPoliRentRecord from '../../utils/poli/insertPoliRentRecord'
import insertTenancyRentRecord from '../../utils/poli/insertTenancyRentRecord'
import refreshUserTags from '../../utils/user/refreshUserTags'
import getTagData from '../../utils/user/getTagData'
import { updateTags } from '../../actions/tags'

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
      this.props.showLoading()
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
        
        // refresh mobile_data in db-tenancy agreement table for this memid
        const tagsRefreshed = await refreshUserTags({ token: this.props.token, memid: this.props.memid })
        console.log('tagsRefreshed:', tagsRefreshed)

        // get TAGs
        const tagData = await getTagData(this.props.memid, this.props.token)
        this.props.updateTags(tagData)  

        this.props.hideLoading()

        // set some message re completed transaction
        this.setState(() => ({ error: 'Payment complete.' }))
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
    memid: state.user.id,
    firstName: state.user.firstName,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateTags: (props) => dispatch(updateTags(props)),
  showLoading: () => dispatch(showLoading()),
  hideLoading: () => dispatch(hideLoading())
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage)