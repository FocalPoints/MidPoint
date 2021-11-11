import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

// ConnectedAccess refers to the default export from the file, the destructuring is used to separately
// import the dumb component named Access which is not connected to mapStateToProps or mapDispatchToProps.
// In order to test the DUMB component, had to also specifically export it (see line 34 of Access.jsx)
import ConnectedAccess, { Access } from './client/components/Access.jsx';
import configureStore from 'redux-mock-store';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });


describe('React unit tests', () => {

  let wrapper;

  describe('Shallow Render REACT COMPONENTS', () => {
    // pass in dummy props of the sort that Access expects
    const props = {
      pageToDisplay: 'login',
      loggedIn: false,
      midpoint: { lat: 40.7142700, lng: -74.0059700 },
      currentUser: {},
      selectedLocations: [],
      friendsList: [],
      notFriendsList: [],
    };
    describe('Access component', () => {
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
  });

  xdescribe('REACT-REDUX (Shallow + passing the store directly)', () => {
    const initialState = {
      pageToDisplay: 'login',
      loggedIn: false,
      midpoint: { lat: 40.7142700, lng: -74.0059700 },
      currentUser: {},
      selectedLocations: [],
      friendsList: [],
      notFriendsList: [],
      currentUserID: 12
    };
    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
      store = mockStore(initialState);
      container = shallow(<ConnectedAccess store={store} />);
    });

    it('renders the connected(SMART) component', () => {
      expect(container.length).toEqual(1);
    })
  });
});