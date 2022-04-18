const { init } = require("express/lib/application");

const valUnitReg= /gal|l|lbs|kg|mi|km/i;
const valNumReg= /^\d*\.{0,1}\d*$|^\d*\.{0,1}\d*\/\d*\.{0,1}\d*$/;



function ConvertHandler() {
  

  this.getNum = function(input) {
  
  let num = input.split(/[a-zA-z]|\s/)[0];
  
  function fractionToDecimal(f) {
    return Number(f.split('/').reduce((n, d, i) => n / (i ? d : 1)));
  }
  
  if (num) {
    if(!valNumReg.test(num)) num='invalid number';
    else {
      if(num.indexOf('/')>=0) num=fractionToDecimal(num);
      else num=Number(num);
    }
  } else num=1;
  return num;
};
  
  this.getUnit = function(input) {
    if (input.search(valUnitReg)===-1) return 'invalid unit';
    let result=input.slice(input.search(valUnitReg),);
    result=result.toLowerCase();
    if((result==='gal') || (result==='l') || (result==='lbs') || (result==='kg') || (result==='mi') || (result==='km')){
      if(result==='l') result='L';
      return result;
    } else return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit){
      case 'gal':
        result= 'L'
        break;
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result='unknown unit';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case 'gal':
        result= 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result='unkown unit';
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit){
      case 'gal':
        result= initNum*galToL;
        break;
      case 'L':
        result = initNum/galToL;
        break;
      case 'lbs':
        result = initNum*lbsToKg;
        break;
      case 'kg':
        result = initNum/lbsToKg;
        break;
      case 'mi':
        result = initNum*miToKm;
        break;
      case 'km':
        result = initNum/miToKm;
        break;
      default:
        result='error';
    }
    if (result==='error') return result;
    else return Number(result.toFixed(5));
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    
    return initNum+' '+this.spellOutUnit(initUnit)+' converts to '+returnNum+' '+this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
