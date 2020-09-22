
import React from 'react'
import {ModalType} from './types'
const Modal = ({isVisible=false, setVisibility, title, children}:ModalType) => {
 const hideModal = () => setVisibility(false)
 return <div className={`comp-modal ${isVisible ? '' : 'hide'}`}>
   <div className="bg"></div>
    <div className="content">
      <span onClick={hideModal} className="icon"></span>
      <h2>{title}</h2>
      {children} 
    </div>
  </div>} 

export default React.memo(Modal); 