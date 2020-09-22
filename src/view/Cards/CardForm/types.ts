import { CardModel } from '../../../domain/card/entity'
import {ReactText} from 'react'
export type CardFormProps = { 
  operation: OPERATION,
  cardData: CardModel | CardModelInput,
  newInstance: boolean
}

export enum OPERATION{
  EDIT= 'EDIT',
  CREATE= 'CREATE'
}

export interface CardModelInput{
  cardNumber: string
  id: string;
  type: string;
  name: string;
  expiration: string; 
  cvc: ReactText;
}

