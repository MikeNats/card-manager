import React, {useState} from 'react';
import PageHeader from '../../common/PageHeader/PageHeader'
import CardForm from '../CardForm/CardForm'
import {OPERATION} from '../CardForm/types'
import CardDetailsList from '../CardDetailsList/CardDetailsList'
import Modal from '../../common/Modal/Modal'
import Button from '../../common/Button/Button'
import {useCardService} from './hooks/useCardService'
    

const CardContainer = function() {
  const [cards, error, isLoading ] = useCardService()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => setIsModalVisible(true)
  const render = () => {
    if(isLoading){
      return <PageHeader
        title={"Your cards"}
        description={"...is loading"}/> 
    }else if(error) { 
      return <PageHeader 
        title={"Your cards"}
        description={"Oops... something went wrong"}/>
   } else {
      return (<>
        <PageHeader 
          title={"Your cards"}
          description={"Add, edit or delete your cards any time"}/>
        <CardDetailsList  
            cardCollection={cards} />
        <footer>
          <div className="row">
            <Button onClickHandler={showModal}>Add new card</Button>
          </div>
        </footer>
        <Modal 
          title="Add your card details"
          isVisible={isModalVisible} 
          setVisibility={setIsModalVisible}>
                
          <CardForm 
            newInstance={isModalVisible}
            operation={OPERATION.CREATE}  
            cardData={{id: '', type: '', name: '', cardNumber: '', expiration: '', cvc: ''}}/>
        </Modal>
    </>)
  }
}

return  <section className="comp-card-container">{render()}</section>
}

export default CardContainer