import React from 'react'
import CardContainer from './CardContainer'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CardModel } from '../../../domain/card/entity'
import Modal from '../../common/Modal/Modal'
import CardDetailsList from '../CardDetailsList/CardDetailsList'
import PageHeader from '../../common/PageHeader/PageHeader'
import CardForm from '../CardForm/CardForm'
import Button from '../../common/Button/Button'
import {useCardService} from './hooks/useCardService'
jest.mock('./hooks/useCardService');

Enzyme.configure({ adapter: new Adapter() })
const mockCard: CardModel ={
  id: "1231234234",
  type: "Mastercard",
  name: "Jhon Done",
  cardNumber: "1231234234",
  expiration: "10/24",
  cvc:"432"
};
 

describe("CardContainer", () => {

  it('should render a CardContainer if data have been fetched', () => {	
    useCardService.mockImplementation(() => (
      [[mockCard],
      false,
      false])) 

    const component = shallow(<CardContainer/>)
    expect(component.childAt(0).type()).toEqual(PageHeader);
    expect(component.childAt(1).type()).toEqual(CardDetailsList);
    expect(component.childAt(2).type()).toEqual("footer"); 
    expect(component.childAt(3).type()).toEqual(Modal);
    expect(component.find(CardForm).type()).toEqual(CardForm);

  });
  it('should render only loading PageHeader', () => {	
    useCardService.mockImplementation(() => (
      [[mockCard],
      false, 
      true])) 
 
    const component = shallow(<CardContainer/>)
    expect(component.childAt(0).type()).toEqual(PageHeader);
    expect(component.childAt(0).props().description).toEqual("...is loading");
    expect(component.find(CardDetailsList)).toEqual({});
    expect(component.find(Button)).toEqual({});
    expect(component.find(Modal)).toEqual({});
    expect(component.find(CardForm)).toEqual({});
  });
  it('should render only error PageHeader', () => {	
    useCardService.mockImplementation(() => (
      [[], 
      true, 
      false])) 
 
    const component = shallow(<CardContainer/>)
    expect(component.childAt(0).type()).toEqual(PageHeader);
    expect(component.childAt(0).props().description).toEqual("Oops... something went wrong");
    expect(component.find(CardDetailsList)).toEqual({});
    expect(component.find(Button)).toEqual({});
    expect(component.find(Modal)).toEqual({});
    expect(component.find(CardForm)).toEqual({});
  });
  
});
