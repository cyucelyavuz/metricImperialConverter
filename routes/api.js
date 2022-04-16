'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  //let initNum;
  //let initUnit;
  //let returnNum;
  app.route('/api/convert')
      .get((req,res)=>{
        const initNum=convertHandler.getNum(req.query.input);
        const initUnit=convertHandler.getUnit(req.query.input);
        const returnNum=convertHandler.convert(initNum,initUnit);
        const returnUnit=convertHandler.getReturnUnit(initUnit);

        res.json({initNum:initNum,initUnit:initUnit,returnNum:returnNum,returnUnit:returnUnit,string:convertHandler.getString(initNum,initUnit,returnNum,returnUnit)});
      });

};
