import { CardModel } from './entity'
import { v4 as uuidv4 } from 'uuid'; 
import valid from 'card-validator';
import creditCardType from "credit-card-type";
import { ReactText } from 'react'

export const createCard = (card: CardModel): CardModel => Object.freeze({
    id: card && card.id ? card.id : uuidv4(),
    type: card && card.cardNumber ? creditCardType(`${card.cardNumber}`)[0].type : '',
    name: card.name,
    cardNumber: card.cardNumber,
    expiration: card.expiration, 
    cvc: card.cvc
});
 
export const canBeParshedToInt = (input: string): boolean => !!(input.split("").filter(el => !isNaN(parseInt(el))).length > 0)

export const isValidCardName = (name: string):boolean =>  
  !!(name &&  /^([\w]{3,})+\s+([\w\s]{3,})+$/i.test(name))
 
export const isValidCardNumber = (cardNum: string): boolean =>
  !!(cardNum && (valid.number(`${cardNum}`)).isPotentiallyValid)


export const isValidDate = (date: string):boolean => 
!!(date && /^(0[1-9]|1[0-2])\/\d{2}$/.test(date));

export const isValidCvc = (cvc: ReactText):boolean => 
!!(cvc  && /^\d{3}$/.test(`${cvc}`) && canBeParshedToInt(`${cvc}`));  

export const addSpaceEveryFourChars = (input: string | number): string  => 
  `${input}`.replace(/[^\dA-Z]/gi, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()

export const addSlashEveryTwoChars= (input: string | number): string  => 
  `${input}`.replace(/[^\dA-Z]/gi, '')
    .replace(/(.{2})/, '$1/')
    .trim()