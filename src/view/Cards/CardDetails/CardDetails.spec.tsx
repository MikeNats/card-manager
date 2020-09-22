import React from 'react'
import CardDetails from './CardDetails'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CardModel } from '../../../domain/card/entity'
import Card from '../Card/Card'
import Modal from '../../common/Modal/Modal'
import CardForm from '../CardForm/CardForm'
Enzyme.configure({ adapter: new Adapter() })
const mockCard: CardModel ={
  id: "1231234234",
  type: "Mastercard",
  name: "Jhon Done",
  cardNumber: 1231234234,
  expiration: "10/24",
  cvc:432
};
describe("CearDetails", () => {

  it('renders as expected', () => {
    const component = shallow(<CardDetails
      cardData={mockCard}
      />)

    expect(component).toMatchSnapshot();
  })

  it('should render a Card', () => {	
    const component = shallow(<CardDetails
      cardData={mockCard}
    />)

    expect(component.childAt(0).type()).toEqual(Card);
  });

  it('should render a Modal', () => {	
    const component = shallow(<CardDetails
      cardData={mockCard}
    />)

    expect(component.childAt(1).type()).toEqual(Modal);
  });

  it('should Modal have as children: Card and CardForm', () => {	
    const component = shallow(<CardDetails
      cardData={mockCard}
    />)

    expect(component.childAt(1).find(Modal)).toBeTruthy();
    expect(component.childAt(1).find(CardForm)).toBeTruthy();
  });
  
});
