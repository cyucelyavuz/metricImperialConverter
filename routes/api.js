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
        console.log('input= '+req.query.input+'\n'+'output= ');
        const initNum=convertHandler.getNum(req.query.input);
        const initUnit=convertHandler.getUnit(req.query.input);
        const returnNum=convertHandler.convert(initNum,initUnit);
        const returnUnit=convertHandler.getReturnUnit(initUnit);
        if ((initNum==='invalid number') && (initUnit==='invalid unit')) res.json('invalid number and unit');
         else if (initNum==='invalid number') res.json('invalid number');
          else if (initUnit==='invalid unit') res.json('invalid unit');
            
            else {
              let responseObj={
                initNum:initNum,
                initUnit:initUnit,
                returnNum:returnNum,
                returnUnit:returnUnit,
                string:convertHandler.getString(initNum,initUnit,returnNum,returnUnit)
              };
              
              console.log(responseObj);
              res.json(responseObj);
            }   
          });

};
