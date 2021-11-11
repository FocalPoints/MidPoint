
  const testFetch = () => {
    const body = {latitude : 37.786882, longitude: -122.399972};
    fetch('/api/yelp', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => console.log('FRONTEND FETCH', res.JSON()))
      .catch(err => console.log('ERROR FETCHING FROM FRONT END'));
  }
