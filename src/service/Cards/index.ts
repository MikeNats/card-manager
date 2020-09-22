import {getEnvVar} from '../../utils/getEnviromentVariable'
import {API} from '../../enums/API'
import {fetchData} from '../fetch'
import {CardModel} from '../../domain/card/entity'
import {CancelToken} from 'axios'

export const createNewCard = (card: CardModel, cancelToken?: CancelToken)  =>  new Promise(resolve => resolve()) 
// (card: CardModel, cancelToken?: CancelToken) => fetchData({
//   url: process.env[getEnvVar(process.env.NODE_ENV, API.CREATE_CARD)],
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   cancelToken, 
//   data: {
//     ...card 
//   }})

export const deleteCrad = (id: string, cancelToken?: CancelToken) =>  new Promise(resolve => resolve()) 
// (id: string, cancelToken?: CancelToken) => fetchData({
//   url: process.env[getEnvVar(process.env.NODE_ENV, `${API.DELETE_CARD}/${id}`)],
//   method: 'DELETE',
//   cancelToken})

export  const updateCrad = (card: CardModel, cancelToken?: CancelToken) => new Promise(resolve => resolve())
// (card: CardModel, cancelToken?: CancelToken) => fetchData({
//   url: process.env[getEnvVar(process.env.NODE_ENV, `${API.UPDATE_CARD}/${card.id}`)],
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   cancelToken,
//   data: {
//     ...card
//   }}) 

export const getCards = (cancelToken?: CancelToken) => fetchData({
  url: process.env[getEnvVar(process.env.NODE_ENV, API.GET_CARDS)],
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  cancelToken
})