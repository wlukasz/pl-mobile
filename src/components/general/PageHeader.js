import React from 'react'
import LoadingBar from 'react-redux-loading-bar'

const PageHeader = (props) => (
  <div className="page-header">
    <div className="content-container">
      <LoadingBar className="loading" />
      <h1 className="page-header__title">{props.title}</h1>
    </div>
</div>
)

export default PageHeader;