
const valUnitReg= /gal|l|lb|kg|mi|km/i;
const valNumReg= /^\d*\.{0,1}\d*$|^\d*\/\d*$/;



function ConvertHandler() {
  
  this.getNum = function(input) {
  let num;
   if (input.search(valUnitReg)!==-1) {
         num =input.slice(0,input.search(valUnitReg));
         if(!num.match(valNumReg)) num='invalid num';
         } else{
           num = input.slice(0,input.indexOf(/[a-zA-z]/));
         } 
  return num;
  };
  
  this.getUnit = function(input) {
    if (input.search(valUnitReg)===-1) return 'invalid unit';
    let result=input.slice(input.search(valUnitReg),);
    result=result.toLowerCase();
    if((result==='gal') || (result==='l') || (result==='lb') || (result==='kg') || (result==='mi') || (result==='km')){
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
        result = 'litres';
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
        result = 'kilometres';
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
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    
    return initNum+' '+this.spellOutUnit(initUnit)+' converts to '+returnNum+' '+this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
