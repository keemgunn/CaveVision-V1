import express from 'express';
const expressApp = express();

expressApp.get('/', (req, res) => {
  res.send('WORKING!')
})

export {
  expressApp
}