import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

import ConnectedAccess, { Access } from './client/components/Access.jsx';
import configureStore from 'redux-mock-store';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {

  let wrapper;

  describe('Dumb Component - Access', () => {
    // pass in dummy props of the sort that it expects
    const props = {
      pageToDisplay: 'login',
      loggedIn: false,
      midpoint: { lat: 40.7142700, lng: -74.0059700 },
      currentUser: {},
      selectedLocations: [],
      friendsList: [],
      notFriendsList: [],
    };

    beforeAll(() => {
      wrapper = shallow(<Access {...props} />);
    });

    it('renders the DUMB component', () => {
      expect(wrapper.length).toEqual(1);
    })

    it('Renders a div, className loginStyles, with six child divs', () => {
      expect(wrapper.find('div.loginStyles').children()).toHaveLength(6);
    });

    it('Renders two buttons', () => {
      let count = 0;
      wrapper.find('button').forEach(node => {
        count++;
      });
      expect(count).toBe(2);
    });
  });

  // xdescribe('Connected Component - Access', () => {
  //   const initialState = { loggedIn: false };
  //   const mockStore = configureStore();
  //   let store;
  //   let container;

  //   beforeEach(() => {
  //     store = mockStore(initialState):
  //     container = shallow(<ConnectedHome store={store} />);
  //   });

  //   it('renders ')
  // });
});