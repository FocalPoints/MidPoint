import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as bootstrap from 'bootstrap';

// class Access extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pageToDisplay: 'login123',
//     };
//   }

//   render() {
//     if (this.state.pageToDisplay === 'login') return (
//       <div>
//         <h1>login Page</h1>
//       </div>
//     );
    
//     // else
//     return (
//       <div>
//         <h1>sign-in Page</h1>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   'totalMarkets': state.mainPage.pageToDisplay,
//   'totalCards': state.markets.totalCards,
//   'marketList': state.markets.marketList,
//   'lastMarketId': state.markets.lastMarketId
// });


const mapStateToProps = ({
   mainPage: { pageToDisplay } 
  }) => ({
  pageToDisplay
});

// const mapDispatchToProps = dispatch => ({
//   syncMarkets: () => dispatch(actions.syncMarkets()),
// });



const Access = ({pageToDisplay}) => {


        if (pageToDisplay === 'login') return (
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

// export default Access;
export default connect(mapStateToProps, null)(Access);

