import { CardModel } from '../../../domain/card/entity'

export type CardProps= {
  cardData: CardModel
  toggleModal:Function
  edit: boolean
}