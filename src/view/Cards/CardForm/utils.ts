import { OPERATION, CardModelInput } from './types'
import {createCard} from '../../../domain/card/cardService' 
import {createNewCard, updateCrad} from '../../../service/Cards'


export const createUpdateCard = (operation: OPERATION, cardData: CardModelInput ):Promise<any> => 
   operation === OPERATION.EDIT ? 
      updateCrad({
        id: cardData.id,
        type: cardData.type,
        name:cardData.name, 
        cardNumber: +`${cardData.cardNumber}`.replace(/\s/g, ""),
        expiration: cardData.expiration,
        cvc: +`${cardData.cvc}`})
   :
      createNewCard(createCard({
        id: '', 
        type: '',
        name:cardData.name, 
        cardNumber: +`${cardData.cardNumber}`.replace(/\s/g, ""),
        expiration: cardData.expiration,
        cvc: +`${cardData.cvc}`}))



