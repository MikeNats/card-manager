import React from 'react'
import CardDetailsList from './CardDetailsList'
import CardDetails from '../CardDetails/CardDetails'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CardModel } from '../../../domain/card/entity'
Enzyme.configure({ adapter: new Adapter() })
const mockCard: Array<CardModel> = [{
  id: "1231234234",
  type: "Mastercard",
  name: "Jhon Done",
  cardNumber: "1231234234",
  expiration: "10/24",
  cvc:"432"
},
{
  id: "764534253",
  type: "Visa",
  name: "Jane Done",
  cardNumber: "65432345",
  expiration: "10/22",
  cvc:"412"
}] 
describe("Card", () => {

  it('renders as expected', () => {
    const component = shallow(<CardDetailsList
      cardCollection={mockCard}/>)

    expect(component).toMatchSnapshot();
  })

  it('should return a collection of CardDetails', () => {	
    const component = shallow(<CardDetailsList
      cardCollection={mockCard}/>)

      expect(component.find('li').length).toEqual(2)
      expect(component.find(CardDetails).length).toEqual(2)
  });
});
 