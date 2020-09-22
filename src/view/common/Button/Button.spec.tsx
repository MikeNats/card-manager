import React from 'react'
import Button from './Button'
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

   
describe("Button", () => {
  describe('component', () => {
    let component
    let button = (clickHandler: Function) => <Button onClickHandler={clickHandler} className="test" >text</Button>
    let onClickHandler = jest.fn()
    
    it('renders as expected', () => {
      component = shallow(button(onClickHandler))

      expect(component).toMatchSnapshot();
   });
   it('should set className based on props', () => {	
    component = shallow(button(onClickHandler))

    expect(component.props().className).toEqual('comp-button test');
  });
  it('should set text based on props', () => {	
    component = shallow(button(onClickHandler))
    
    expect(component.props().children).toEqual('text');
  });
   it('should invoke `clickHandler` on click', () => {	
      component = shallow(button(onClickHandler)).simulate('click')
      
  	  expect(onClickHandler.mock.calls.length).toEqual(1);
  	});
  });
});
