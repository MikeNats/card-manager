import React, {useState} from 'react';
import Card from '../Card/Card'
import Modal from '../../common/Modal/Modal'
import CardForm from '../CardForm/CardForm'
import { OPERATION } from '../CardForm/types'
import {CardDetailsProps} from './types'

const CardDetails = function({cardData}:CardDetailsProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
    return (<div className="comp-card-details">
      <Card
        edit={true}
        toggleModal={setIsModalVisible}
        cardData={cardData}/>
      <Modal 
        title="Edit your card"
        isVisible={isModalVisible}  
        setVisibility={setIsModalVisible}>    
        <Card
          toggleModal={setIsModalVisible}
          edit={false}
          cardData={cardData}/> 
        <CardForm 
          newInstance={isModalVisible}
          operation={OPERATION.EDIT}
          cardData={cardData}/>
      </Modal>
  </div>)
} 
 
export default React.memo(CardDetails)