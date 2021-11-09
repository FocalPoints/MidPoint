const exp = require('constants');
const fs = require('fs');
const path = require('path');
const db = require('../server/controllers/databaseController')

const testJsonFile = path.resolve(__dirname, './userTest.json')

describe('addUser', () => { 
  //checks if 
  it ('should add a user to the database', async () => {
    let user = {
      username: 'test',
      password: 'password',
      address: '4733 49th street Flushing, NY 11377'
    }
    let result = await db.addUser(user)
    expect (result).toBe(true);
    const dataTest = JSON.parse(fs.readFileSync(testJsonFile,));
    expect(dataTest.length).toEqual(result);
  })

  // checks if the fucntion encrypts the password
  it ('should encrypt the password'), async () => {
    let user = {
      username: 'test',
      password: 'password',
      address: '4733 49th street Flushing, NY 11377',
    }
    let result = await db.addUser(user)
    expect (result).toBe(true);
    //expect the input user.password to NOT equal the encrypted password
    expect(user.password).not.toEqual(result.password);
  }
  
  
  
  
})
