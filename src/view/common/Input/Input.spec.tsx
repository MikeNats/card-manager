import React from 'react'
import Input from './Input'
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe("Input", () => {
  describe('component', () => {
    let onChangeHandler = jest.fn()
    
    it('renders as expected', () => {
     const  component = shallow(<Input  
        id="password" 
        name="password"
        type="password"
        placeholder="password"
        error={false}
        errorMessage="error message"
        onChange={onChangeHandler}
        required/>)

      expect(component).toMatchSnapshot();
    });

    describe("input", () => {
      it('should set props', () => {	
        const component = mount(<Input  
          id="password" 
          name="password"
          type="password"
          placeholder="password"
          error={true}
          errorMessage="error message"
          onChange={onChangeHandler}/>).find('input')
          expect(component.props().name).toEqual('password');
          expect(component.props().type).toEqual('password');
          expect(component.props().className).toEqual('error'); 
          expect(component.props().id).toEqual('password');  
      });

      it('should invoke `clickHandler` on click', () => {
          const event = { persist: ()=>{}, currentTarget: {value: "spam"}};	
          shallow(<Input  
            id="password" 
            name="password"
            type="password"
            placeholder="password"
            error={false}
            errorMessage="error message"
            onChange={onChangeHandler}/>).find('input').simulate('change', event)
          
          expect(onChangeHandler.mock.calls.length).toEqual(1);
      });
    });
    describe("input error message", () => {
      it('should set props', () =>{
        const component = mount(<Input  
          id="password" 
          name="password"
          type="password"
          placeholder="password"
          error={true}
          errorMessage="error message"
          onChange={onChangeHandler}/>).find('p')
          expect(component.props().className).toEqual('errorMessage hide show'); 
          expect(component.props().children).toEqual('error message'); 
      });
    });
  });
});
