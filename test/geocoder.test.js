const NodeGeocoder = require('node-geocoder');


const options = {
  provider: 'google',
  apiKey: 'AIzaSyAisanRgGF25lhPR7TSu_VDRggQqwH5MVg',
}

const geocoder = NodeGeocoder(options);

describe('Connecting to Google API', () => {
  const address = '444 Washington Blvd Jersey City, NJ 07310';
  const badAddress = '69 Candyland Lane Cary, California 27564'

  describe('invalid address', () => {
    it('should return an empty array', (done) => {
      geocoder.geocode({ address: badAddress, minConfidence: .95 }).then(data => {
        expect(data).toEqual([]);
        done();
      }).catch(err => {
        done(err);
      });
    })
  })

  describe('valid address', () => {
    it('should return the correct coordinates', (done) => {
      geocoder.geocode({ address, minConfidence: .95 }).then(data => {
        const dataObj = data[0];
        expect(dataObj).toHaveProperty('latitude', 40.7224587);
        expect(dataObj).toHaveProperty('longitude', -74.03543309999999)
        done();
      }).catch(err => {
        done(err);
      });
    })
  });
});