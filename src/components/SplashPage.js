import React from 'react'
import { history } from '../routers/AppRouter'

export const SplashPage = () => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">PeterLandlord</h1>
      <p>Rent Payment Interface</p>
      <button className="button-style" onClick={ () => { history.push('/login') }}>Login</button>
    </div>
  </div>
)

export default SplashPage