import React, { Component } from 'react';
import * as bootstrap from 'bootstrap';

class Access extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageToDisplay: 'login123',
    };
  }

  render() {
    if (this.state.pageToDisplay === 'login') return (
      <div>
        <h1>login Page</h1>
      </div>
    );
    
    // else
    return (
      <div>
        <h1>sign-in Page</h1>
      </div>
    );
  }
}

export default Access;

