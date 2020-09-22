import React from 'react'
import PageHeader from './PageHeader'
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe("PageHeader", () => {    
    it('renders as expected', () => {
     const component = shallow(
        <PageHeader
          description="description"
          title="title"/>)

      expect(component).toMatchSnapshot();
    })

    it('should set props', () => {	
      const component = shallow(<PageHeader  
        description="description"
        title="title"/>)
        expect(component.find('h1').text()).toEqual('title');
        expect(component.find('p').text()).toEqual('description');

    });

});
