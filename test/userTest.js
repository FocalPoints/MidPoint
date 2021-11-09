const fs = require('fs');
const path = require('path');
const db = require('../server/controllers/databaseController')

const testJsonFile = path.resolve(__dirname, './userTest.json')

describe('addUser' )
  it('should add a user to the database', async () => {
    let user = {
      firstName: 'test',
      lastName: 'test',
      address: '4733 49th street Flusing, NY 11377'
    }
    let result = await db.addUser(user)
    