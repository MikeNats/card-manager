import React from 'react'
import CardForm from './CardForm'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CardModel } from '../../../domain/card/entity'
import {OPERATION} from './types'
import * as services from'../../../service/Cards'
jest.mock('../../../service/Cards');

Enzyme.configure({ adapter: new Adapter() })
const mockCard: CardModel ={
  id: "1231234234",
  type: "mastercard",
  name: "Jhon Done",
  cardNumber: "5500000000000004",
  expiration: "10/24",
  cvc:"432"
};

async function tick() {
  return await new Promise(resolve =>
    setTimeout(resolve, 1000))
} 

describe("CardForm", () => {

  it('renders as expected', () => {
    const component = shallow(<CardForm
      cardData={mockCard}
      operation={OPERATION.EDIT}
  />)

    expect(component).toMatchSnapshot();
  })
  describe("Validations", () => {
    const validateDeleteButtonStatus = (component: any, assertValue: boolean, operation: OPERATION) => 
      operation === OPERATION.EDIT ? expect(component.find("#delete-card-button").props().disabled).toEqual(assertValue) : 
      expect(component.find("#delete-card-button").props().className).toEqual('hide');
    [OPERATION.CREATE, OPERATION.EDIT].forEach((operation: OPERATION) => {
      it(`should not allow to submit if card name is empty - ${operation}`, () => {
        const component = shallow(<CardForm
          newInstance={true}
          cardData={Object.assign({},mockCard, {name: ""})}
          operation={operation}
      />)  
        validateDeleteButtonStatus(component, false, operation)
        expect(component.find("#create-update-card-button").props().disabled).toEqual(false)
      })

     it(`should not allow to submit if card name is three not letters followed by space last name three letters - ${operation}`,  () => {
      ["a", "aa", "aaa ", "aaa a", "aaa aa"].forEach(senarion => {
        const component = shallow(<CardForm
          newInstance={true}
          cardData={Object.assign({}, mockCard, {name:senarion})}
          operation={operation} 
        />) 
        component.find("#card-name").simulate('blur', {preventDefault: ()=>{}})

        tick().then(() =>{
          expect(component.find("#card-name").props().error).toEqual(true)
        })

      })  
    })
      
      it(`should not allow to submit if card number is empty - ${operation}`, () => {
        const component = shallow(<CardForm
          newInstance={true}
          cardData={Object.assign({},mockCard, {cardNumber: ""})} 
          operation={operation}
      />) 

      tick().then(() =>{
        validateDeleteButtonStatus(component, false, operation)
        expect(component.find("#create-update-card-button").props().disabled).toEqual(true)      })
      })
  
      it(`should not allow to submit if card expiration is empty - ${operation}`, () => {
        const component = shallow(<CardForm
          newInstance={true}
          cardData={Object.assign({},mockCard, {expiration: ""})} 
          operation={operation}
      />)  
      tick().then(() =>{
        expect(component.find("#create-update-card-button").props().disabled).toEqual(true)
          validateDeleteButtonStatus(component, false, operation)})
      })

      it(`should not allow to submit if card expiration is not mm/yy - ${operation}`, () => {
        const component = shallow(<CardForm
          newInstance={true}
          cardData={Object.assign({},mockCard, {expiration: "80/20"})} 
          operation={operation}
      />)  
      tick().then(() =>{
        component.find("#expirecy-date").simulate('blur', {preventDefault: ()=>{}})
        expect(component.find("#expirecy-date").props().error).toEqual(true)})
      })
  
      it(`should not allow to submit if card cvc is empty - ${operation}`, () => {
        const component = shallow(<CardForm 
          newInstance={true}
          cardData={Object.assign({},mockCard, {cvc: ""})} 
          operation={operation}
      />)   

      tick().then(() =>{
        expect(component.find("#create-update-card-button").props().disabled).toEqual(true)
          validateDeleteButtonStatus(component, false, operation)})
      })

      it(`should not allow to submit if card cvc can not parsed to int - ${operation}`, () => {
        services.createNewCard.mockImplementation(() => Promise.resolve());
        services.updateCrad.mockImplementation(() => Promise.resolve());
        const component = shallow(<CardForm 
          cardData={Object.assign({},mockCard, {cvc: "erwe"})}  
          operation={operation}
      />)  
       
        tick().then(() =>{
          component.find("form").first().simulate('submit', {preventDefault: ()=>{}})
          expect(component.find("#cvc").props().error).toEqual(true)})
        })
     it(`should not allow to submit if card data is not valid - ${operation}`, () => {
        const component = shallow(<CardForm
          cardData={Object.assign({},mockCard, {cardNumber:"wdeadc45s6c"})}
          operation={operation} 
      />)  
       
      tick().then(() =>{
          component.find("#card-number").simulate('blur', {preventDefault: ()=>{}})
          expect(component.find("#card-number").props().error).toEqual(true)})
      })

      it(`should submit if card data is valid - ${operation}`, () => {
        const component = shallow(<CardForm
          cardData={mockCard} 
          operation={operation} 
      />)  
        expect(component.find("#create-update-card-button").props().disabled).toEqual(false)
          validateDeleteButtonStatus(component, false, operation)
      })
    })
    describe("Submition", () => {
      afterEach(() => {    
        jest.clearAllMocks();
      });
      describe("Create", () => {
        it('should invoke createNewCard', async () => {
          services.createNewCard.mockImplementation(() => Promise.resolve());
          const component = shallow(<CardForm
            cardData={mockCard} 
            operation={OPERATION.CREATE} 
        />)  
 
          component.find("form").first().simulate('submit', {preventDefault: ()=>{}})
          expect(services.createNewCard).toBeCalled()
        }) 
      })
      describe("Update", () => { 
        it('should invoke updateCrad', async () => {
          services.updateCrad.mockImplementation(() => Promise.resolve());
          const component = shallow(<CardForm
            cardData={mockCard} 
            operation={OPERATION.EDIT} 
        />)  

          component.find("form").first().simulate('submit', {preventDefault: ()=>{}})
          expect(services.updateCrad).toBeCalled()
        })
      }) 
      describe("Delete", () => {
        it('should invoke createNewCard', async () => {
          services.deleteCrad.mockImplementation(() => Promise.resolve());
          const component = mount(<CardForm
            cardData={mockCard} 
            operation={OPERATION.EDIT}  
        />)   
          component.find("#delete-card-button").find('button').simulate('click')
          expect(services.deleteCrad).toBeCalled()
        })
      })
    })

  })
})
