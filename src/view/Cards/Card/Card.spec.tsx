import React from 'react'
import Card from './Card'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CardModel } from '../../../domain/card/entity'
Enzyme.configure({ adapter: new Adapter() })
const mockCard: CardModel = {
  id: "1231234234",
  type: "Mastercard",
  name: "Jhon Done",
  cardNumber: 1231234234,
  expiration: "10/24",
  cvc: 432
}
describe("Card", () => {
  let onChangeHandler = jest.fn()

  it('renders as expected', () => {
    const component = shallow(<Card
      cardData={mockCard}
      toggleModal={onChangeHandler}
      edit={true}
      />)

    expect(component).toMatchSnapshot();
  })

  it('should set props', () => {	
    const component = shallow(<Card   
      cardData={mockCard}
      toggleModal={onChangeHandler}
      edit={true}/>)

      expect(component.find('.top').childAt(0).find('span').text()).toEqual(`${mockCard.cvc}`);
      expect(component.find('.top').childAt(1).find('span').text()).toEqual(mockCard.expiration);
      expect(component.find('.bottom').childAt(0).find('span').text()).toEqual(mockCard.name);
      expect(component.find('.bottom').childAt(1).find('span').text()).toEqual("1231 2342 34");
  });

  it('should invoke `clickHandler` on click', () => {
      const event = { persist: ()=>{}, currentTarget: {value: "spam"}};	
      mount(<Card    
        cardData={mockCard}
        toggleModal={onChangeHandler}
        edit={true}/>).find('button').simulate('click', event)
      
      expect(onChangeHandler.mock.calls.length).toEqual(1);
  });
});
