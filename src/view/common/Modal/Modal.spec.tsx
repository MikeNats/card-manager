import React from 'react'
import Modal from './Modal'
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe("Modal", () => {
    let onChangeHandler = jest.fn()
    
    it('renders as expected', () => {
     const  component = shallow(<Modal
        isVisible={false}
        title="test"
        setVisibility={onChangeHandler}
        ><p>test</p></Modal>)

      expect(component).toMatchSnapshot();
    })

      it('should set props', () => {	
        const component = shallow(<Modal  
          isVisible={false}
          title="test"
          setVisibility={onChangeHandler}
          ><p>test</p></Modal>)
          expect(component.props().className).toEqual('comp-modal hide');
          expect(component.find('h2').text()).toEqual('test')
      });

      it('should populate given children', () => {	
        const component = mount(<Modal  
          isVisible={false}
          title="test"
          setVisibility={onChangeHandler}
          ><p>test</p></Modal>).find('p');
          expect(component).toBeTruthy();
          expect(component.text()).toEqual('test')
      });

      it('should invoke `clickHandler` on click', () => {
          const event = { persist: ()=>{}, currentTarget: {value: "spam"}};	
          mount(<Modal  
            isVisible={false}
            title="test"
            setVisibility={onChangeHandler}
            ><p>test</p></Modal>).find('span').simulate('click', event)
          
          expect(onChangeHandler.mock.calls.length).toEqual(1);
      });
});
