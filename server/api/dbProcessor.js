const dbQuery = require('../db/dbQuery')

const dbProcessor = async body => {
  console.log('body in dbProcessor', body)
  let dbParams = null
  switch (body.reqName) {
    
    case 'fetchPasswordPlus':
      dbParams = {
        sql: 'SELECT id, group_id, first_name, last_name, email, password FROM ?? WHERE ?? = ?',
        inserts: ['tbl_member', 'email', body.email]
      }
      break

    case 'fetchUser':
      dbParams = {
        sql: 'SELECT * FROM ?? WHERE ?? = ?',
        inserts: ['tbl_member', 'id', body.id]
      }
      break

    case 'updateUser':
      dbParams = {
        sql: 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?',
        inserts: ['tbl_member', 'first_name', body.first_name, 'last_name', body.last_name, 'email', body.email, 'id', body.id]
      }
      break

    case 'getTagData':
      dbParams = {
        sql: `SELECT ?? FROM ?? WHERE ?? is NULL AND EXISTS
        (SELECT 1 FROM ?? WHERE tbl_tenancy_group.tenancy_agreement_id = tbl_tenancy_agreement.id
        AND tbl_tenancy_group.tenant_id = ?)`,
        inserts: ['mobile_data', 'tbl_tenancy_agreement', 'date_closed', 'tbl_tenancy_group', body.id]
      }
      break

    case 'insertPoliToken':
      dbParams = {
        sql: 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?)',
        inserts: ['tbl_poli_initiated_txn', 'token', 'paytyp', 'member_id', 'tag_id', 'property_id',
        body.poliToken, body.poli.paytype, body.memid, body.poli.tagid, body.poli.propid]
      }
      break
      
    case 'insertPoliRentRecord':
      dbParams = {
        sql: `INSERT INTO ?? 
        (??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        inserts: [
          'tbl_poli_rent_record',
          'token', 
          'CountryName', 
          'FinancialInstitutionCountryCode', 
          'TransactionID', 
          'MerchantEstablishedDateTime', 
          'PayerAccountNumber', 
          'PayerAccountSortCode', 
          'MerchantAccountSortCode', 
          'MerchantAccountName', 
          'MerchantData', 
          'CurrencyName', 
          'TransactionStatus', 
          'IsExpired', 
          'MerchantEntityID', 
          'UserIPAddress', 
          'POLiVersionCode', 
          'MerchantName', 
          'TransactionRefNo', 
          'CurrencyCode', 
          'CountryCode', 
          'PaymentAmount', 
          'AmountPaid', 
          'EstablishedDateTime', 
          'StartDateTime', 
          'EndDateTime', 
          'BankReceipt', 
          'BankReceiptDateTime', 
          'TransactionStatusCode', 
          'ErrorCode', 
          'ErrorMessage', 
          'FinancialInstitutionCode', 
          'FinancialInstitutionName', 
          'MerchantReference', 
          'MerchantAccountNumber', 
          'PayerFirstName', 
          'PayerFamilyName', 
          'PayerAccountSuffix',

          body.poliToken,
          body.CountryName, 
          body.FinancialInstitutionCountryCode, 
          body.TransactionID, 
          body.MerchantEstablishedDateTime, 
          body.PayerAccountNumber, 
          body.PayerAccountSortCode, 
          body.MerchantAccountSortCode, 
          body.MerchantAccountName, 
          body.MerchantData, 
          body.CurrencyName, 
          body.TransactionStatus, 
          body.IsExpired, 
          body.MerchantEntityID, 
          body.UserIPAddress, 
          body.POLiVersionCode, 
          body.MerchantName, 
          body.TransactionRefNo, 
          body.CurrencyCode, 
          body.CountryCode, 
          body.PaymentAmount, 
          body.AmountPaid, 
          body.EstablishedDateTime, 
          body.StartDateTime, 
          body.EndDateTime, 
          body.BankReceipt, 
          body.BankReceiptDateTime, 
          body.TransactionStatusCode, 
          body.ErrorCode, 
          body.ErrorMessage, 
          body.FinancialInstitutionCode, 
          body.FinancialInstitutionName, 
          body.MerchantReference, 
          body.MerchantAccountNumber, 
          body.PayerFirstName, 
          body.PayerFamilyName, 
          body.PayerAccountSuffix
        ]
      }
      break

    case 'insertTenancyRentRecord':
      dbParams = {
        sql: 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?)',
        inserts: ['tbl_tenancy_rent_record', 'tenancy_id', 'amount_paid', 'date_paid', 'financial_year_end', 'method',
        body.tagid, body.amount_paid, body.date_paid, body.finYear, 'POLi']
      }
      break
        
    default:
      return false
  }

  const dbResult = async () => {
    return await dbQuery(dbParams)
  }
  const result = await dbResult()

  console.log('result in dbProcessor:', result)
  return result
}

module.exports = dbProcessor