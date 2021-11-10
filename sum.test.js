import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Market from '../client/components/Market';
import MarketsDisplay from '../client/components/MarketsDisplay';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {

  describe('Market', () => {
    // TODO: Test the following:
    // 1. A Market should display all of its text props inside a
    // LabeledText component
    // 2. It should also contain a div with two buttons
    // 3. The functions passed down should be invoked on click
    // 4. Market should render a div with a class of `marketBox`, and the
    // interior div wrapping the two buttons should have a class of `flex`
    let wrapper;
    // let addCard;
    // let deleteCard;
    const props = {
      index: 253,
      location: 'Bomba Land',
      cards: 37,
      percentage: '80.00',
    };
    beforeEach(() => {
      addCard = jest.fn();
      deleteCard = jest.fn();
      wrapper = shallow(<Market
        {...props}
        addCard={addCard}
        deleteCard={deleteCard}
      />);
    });

    it('should be a div with className marketBox', () => {
      expect(wrapper.is('div')).toBe(true);
      expect(wrapper.is('.marketbox')).toBe(true);
    });

    it('Should contain a div with classNem flex', () => {
      expect(wrapper.exists('div.flex')).toBe(true);
    });

    it('Should label all of its text', () => {
      const labeled = wrapper.find(LabeledText).map(node => node.props().text);
      expect(labeled).toEqual(Object.values(props));
    });

    it('Should have an add and delete button', () => {
      expect(wrapper.find('button').length).toBe(2);
    });

    it('Should add card on click', () => {
      expect(wrapper.find('button').at(0)).simulate('click');
    });

    it('Should add card on click', () => {
      expect(wrapper.find('button').at(1)).simulate('click');
      expect(deleteCard).toHaveBeenCalled();
    });
  });

});
