import * as services from'../../../service/Cards'
import {OPERATION} from './types'
import {addSpaceEveryFourChars, addSlashEveryTwoChars, createUpdateCard} from './utils'
jest.mock('../../../service/Cards');

describe('CradForm utils',() => {
  const card = {
    id: "1231234234",
    type: "mastercard",
    name: "Jhon Done",
    cardNumber: "55000 00000 000004",
    expiration: "10/24",
    cvc:"432"
  }
  describe('createUpdateCard',() => {

    it('should invoke updateCrad when operation is edit', () =>{
      services.updateCrad.mockImplementation(() => Promise.resolve());
      createUpdateCard(OPERATION.EDIT,card)
      expect(services.updateCrad).toHaveBeenCalledWith({
        id: "1231234234",
        type: "mastercard",
        name: "Jhon Done",
        cardNumber: 5500000000000004,
        expiration: "10/24",
        cvc:432 
      })
    })
    it('should invoke updateCrad when operation is create', () =>{
        services.updateCrad.mockImplementation(() => Promise.resolve());
        createUpdateCard(OPERATION.CREATE, Object.assign({}, card, {type:""}))
        expect(services.updateCrad).toHaveBeenCalledWith({
          id: "1231234234",
          type: "mastercard",
          name: "Jhon Done",
          cardNumber: 5500000000000004,
          expiration: "10/24",
          cvc:432 
        })
    })
  })
}) 