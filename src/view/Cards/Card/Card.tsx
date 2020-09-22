import React from 'react';
import { CardProps } from './types'
import Button from '../../common/Button/Button'
import { addSpaceEveryFourChars } from '../../../domain/card/cardService'

const Card = ({cardData, toggleModal, edit}: CardProps) => {
  const hideModal = () => toggleModal(true); 
  
  return (<div className={`comp-card ${cardData.type}`}>
    <div className="top">
      <div className="info">
        <h5>CVC</h5>
        <span>{cardData.cvc}</span> 
      </div>
        <div className="info">
          <h5>EXPIRES</h5>
          <span>{cardData.expiration}</span>
        </div>
    </div> 
    <div className="bottom">
      <div><span className="card-name">{cardData.name}</span></div>
      <div><span className="card-number">{addSpaceEveryFourChars(cardData.cardNumber)}</span></div>
      <Button onClickHandler={hideModal} className={`toggle-modal ${edit ? '' : 'hide' }`}/>
    </div>
</div>)
}


export default React.memo(Card)