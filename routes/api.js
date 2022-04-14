'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
      .get((req,res)=>{
        res.json({input:convertHandler.getNum(req.query.input)});
        console.log(req.query);
      });

};
