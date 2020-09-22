import React, {useEffect, useState} from 'react';
import { isValidCardName, isValidCardNumber, isValidDate, isValidCvc } from '../../../domain/card/cardService'
import Input from '../../common/Input/Input'
import { throttle } from 'lodash'
import {CardFormProps, OPERATION} from './types' 
import Button from '../../common/Button/Button'
import {  createUpdateCard } from './utils'
import { deleteCrad } from '../../../service/Cards'
import { addSpaceEveryFourChars, addSlashEveryTwoChars } from '../../../domain/card/cardService'
  

const CardForm = function({operation, cardData, newInstance}: CardFormProps) {
  const [name, setName] = useState(cardData.name || '')
  const [cardNumber, setCardNumber] = useState(addSpaceEveryFourChars(cardData.cardNumber || ''))
  const [expiration, setExpiration] = useState(cardData.expiration || '')
  const [cvc, setCvc] = useState(cardData.cvc || '')  

  const [invalidname, setInvalidName] = useState(false)
  const [invalidCardNumber, setInvalidCardNumber] = useState(false)
  const [invalidexpiration, setInvalidexpiration] = useState(false)
  const [invalidCvc, setInvalidCvc] = useState(false)
  const [asyncError, setAsyncError] = useState(false)
  const [validName, seValidName] = useState(false)
  const [validCardNumber, setValidCardNumber] = useState(false)
  const [validexpiration, setValidexpiration] = useState(false)
  const [validCvc, setValidCvc] = useState(false)
   
  useEffect(() => {
     setAsyncError(false)
    if(operation === OPERATION.CREATE) {
      setName('') 
      setCardNumber('')
      setExpiration('')
      setCvc('')
    }

    seValidName(false)
    setValidCardNumber(false) 
    setValidexpiration(false)
    setValidCvc(false)
  }, [newInstance, operation])

  const submitForm = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    validateForm();
    if (!invalidname &&
      !invalidCardNumber &&
      !invalidexpiration &&
      !invalidCvc) {
        createUpdateCard(operation,
          {id: cardData.id, 
          type: cardData.type,
          name, cardNumber, 
          expiration,  
          cvc}).catch(e => {
            setAsyncError(true)})
      }
  }
  const deleteCard = () => 
    deleteCrad(cardData.id)
      .catch(e => setAsyncError(true))

  const onnameChange = throttle(name => 
    setName(name), 200)

  const onCardNumberChange = throttle(inputCardNumber => 
    setCardNumber(addSpaceEveryFourChars(inputCardNumber)), 200)

  const onexpirationChange = throttle(inputexpiration => 
    setExpiration(addSlashEveryTwoChars(inputexpiration)), 200) 

  const onCvcChange = throttle(inputCvc => 
    setCvc(inputCvc), 200)

  const validateForm = () => {
    nameValidation()
    cardNumberValidation()
    expirationValidation()
    cvcValidation()
  }

  const nameValidation = () => {
    if (!isValidCardName(name)) {
      setInvalidName(true)
      seValidName(false)
    } else {
      setInvalidName(false)
      seValidName(true)
    }
  }

  const cardNumberValidation = () => {
    if (!isValidCardNumber(cardNumber)) {
      setInvalidCardNumber(true)
      setValidCardNumber(false)
    } else {
      setInvalidCardNumber(false)
      setValidCardNumber(true)
    }
  }
      

  const expirationValidation = () => {
    if(!isValidDate(expiration)) {
      setInvalidexpiration(true) 
      setValidexpiration(false)
    } else {
      setInvalidexpiration(false)
      setValidexpiration(true)
    }
  }

  const cvcValidation = () =>{
   if(!isValidCvc(cvc)) {
    setInvalidCvc(true)
    setValidCvc(false)
   } else {
    setInvalidCvc(false)
    setValidCvc(true)
   }
  }
   
  return (<section className="comp-card-form">
    { asyncError ? <h3>Oops somthing went wrong...</h3> :
      <>
      <form onSubmit={submitForm}>
          <Input 
              title="Name in card"
              placeholder="Jhon Cabruci"
              type="text"
              id="card-name"
              name="card-name"
              errorMessage="Please fill your name"
              className={validName ? 'valid' : ''}
              onBlur={nameValidation}
              value={name}
              error={invalidname}
              onChangeHandler={onnameChange}/>
          <Input 
            title="Card number"
            type="text"
            placeholder="5532 1234 5545 8014"
            id="card-number"
            name="card-number"
            errorMessage="Please enter a valid card number"
            className={validCardNumber ? 'valid' : ''}
            onBlur={cardNumberValidation}
            maxLength={19}  
            value={cardNumber}  
            error={invalidCardNumber}
            onChangeHandler={onCardNumberChange}/>
          <Input
            title="Expirecy date"
            placeholder="08/21"
            type="text"
            id="expirecy-date"
            name="expirecy-date"
            maxLength={5} 
            errorMessage="Please enter a valid expirecy date"
            className={validexpiration ? 'valid' : ''}
            onBlur={expirationValidation}
            value={expiration}
            error={invalidexpiration}
            onChangeHandler={onexpirationChange}/>
          <Input
            title="CVC (Security code)"
            placeholder="009"
            type="text" 
            id="cvc"
            name="cvc"
            errorMessage="Please enter a valid security code"
            className={validCvc ? 'valid' : ''}
            onBlur={cvcValidation}
            value={`${cvc}`}
            maxLength={3}  
            error={invalidCvc}
            onChangeHandler={onCvcChange}/>

          <Button 
            id="create-update-card-button" 
            disabled= {!!(
              !name &&
              !cardNumber &&
              (!expiration && expiration.split("").length !==5 )  &&
              (!cvc && `${cvc}`.split("").length !==3 ))
            }>Confirm</Button> 
      </form>
     <Button 
        id="delete-card-button"
        disabled= {!cardData.id}
        className={operation === OPERATION.EDIT ? '' : 'hide'} 
        onClickHandler={deleteCard}>Delete Card</Button></>
      }
    </section>
  ) 
} 

export default React.memo(CardForm)