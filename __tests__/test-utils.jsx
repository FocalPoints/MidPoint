
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, waitForElement, fireEvent, screen } from '@testing-library/react';
import { App } from '../client/App';
import { reducers } from '../client/reducers/combineReducer';

test('signup button renders a new components', async () => {
  render(<App />)

  // should show login initially, and not signup
  expect(screen.getByText(/login/i)).toBeInTheDocument()
  expect(screen.queryByText(/sign-up/i)).not.toBeInTheDocument()

  // after clicking the 'sign-up' button, it should now render the sign-up page
  fireEvent.click(screen.getByRole('button', { name: /Sign-up/i }))
  expect(screen.getByText(/sign-up/i)).toBeInTheDocument()
})

// // after some time, the user should be received
// expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
// expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
// expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

// Hoist helper functions (but not vars) to reuse between test cases
// const renderComponent = ({ pageToDisplay }) =>
//   render(
//     <Provider store={createStore(reducers, { pageToDisplay })}>
//       <Access />
//     </Provider>
//   );

// it('renders signup page', async () => {
//   // Render new instance in every test to prevent leaking state
//   const { getByText } = renderComponent({ pageToDisplay: "Sign-up Page" });

//   await waitForElement(() => getByText("Sign-up Page"));
// });

// it('renders login page', async () => {
//   // Render new instance in every test to prevent leaking state
//   const { getByText } = renderComponent({ count: 5 });

//   fireEvent.click(getByText('+1'));
//   await waitForElement(() => getByText(/clicked 6 times/i));
// });

// export * from '@testing-library/react'