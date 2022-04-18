const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
   //getNum 
    suite('Function converthandler.getNum(input)',()=>{
        test('whole number input',(done)=>{
            var input = '32L';
            assert.equal(convertHandler.getNum(input),32);
            done();
        })
        test('decimal number input',(done)=>{
            var input = '1.2gal';
            assert.equal(convertHandler.getNum(input),1.2);
            done();
        });
        test('fractional input',(done)=>{
            var input ='2/5lbs';
            assert.equal(convertHandler.getNum(input),0.4);
            done();
        });
        test('fractional input with decimal',(done)=>{
            var input='2.5/5km';
            assert.equal(convertHandler.getNum(input),0.5);
            done();
        });
        test('double fraction error',(done)=>{
            var input='2/3/4';
            assert.equal(convertHandler.getNum(input),'invalid number');
            done();
        });
        test('no decimal input default to 1',(done)=>{
            var input='km';
            assert.equal(convertHandler.getNum(input),1);
            done();
        })
    });
    //getUnit
    suite('Function convertandler.getUnit(input)',()=>{
        test('each valid unit input',(done)=>{
            var unitArr=['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
            unitArr.forEach((elem)=>{
                if(elem.toLowerCase()==='l') assert.equal(convertHandler.getUnit(elem),'L');
                else assert.equal(convertHandler.getUnit(elem),elem.toLowerCase());
            });
            done();
        });

        test('erron on invalid unit input',(done)=>{
            var unit='Kms';
            assert.equal(convertHandler.getUnit(unit),'invalid unit');
            done();
        });

        test('return unit for each valid input unit',(done)=>{
            var unitArr=['gal','L','mi','km','lbs','kg'];
            unitArr.forEach(elem=>{
                switch(elem){
                    case 'gal':
                    assert.equal(convertHandler.getReturnUnit(elem),'L');
                    break;
                    case 'L':
                    assert.equal(convertHandler.getReturnUnit(elem),'gal');
                    break;
                    case 'mi':
                    assert.equal(convertHandler.getReturnUnit(elem),'km');
                    break;
                    case 'km':
                    assert.equal(convertHandler.getReturnUnit(elem),'mi');
                    break;
                    case 'lbs':
                    assert.equal(convertHandler.getReturnUnit(elem),'kg');
                    break;
                    case 'kg':
                    assert.equal(convertHandler.getReturnUnit(elem),'lbs');
                    break;
                }
            })
        done();
        })

        test('spellout unit for each unit input',(done)=>{
            var unitArr=['gal','L','mi','km','lbs','kg'];
            unitArr.forEach(elem=>{
                switch(elem){
                    case 'gal':
                    assert.equal(convertHandler.spellOutUnit(elem),'gallons');
                    break;
                    case 'L':
                    assert.equal(convertHandler.spellOutUnit(elem),'litres');
                    break;
                    case 'mi':
                    assert.equal(convertHandler.spellOutUnit(elem),'miles');
                    break;
                    case 'km':
                    assert.equal(convertHandler.spellOutUnit(elem),'kilometers');
                    break;
                    case 'lbs':
                    assert.equal(convertHandler.spellOutUnit(elem),'pounds');
                    break;
                    case 'kg':
                    assert.equal(convertHandler.spellOutUnit(elem),'kilograms');
                    break;
                }
            })
            done();
        })
        
        test('should correctly convert gal to L',(done)=>{
            assert.equal(convertHandler.convert(2,'gal'),2*3.78541);
            done();
        });

        test('should correctly convert L to gal',(done)=>{
            assert.equal(convertHandler.convert(5,'L'),5/3.78541);
            done();
        });

        test('should correctly convert mi to km',(done)=>{
            assert.equal(convertHandler.convert(2,'mi'),2*1.60934);
            done();
        });

        test('should correctly convert km to mi',(done)=>{
            assert.equal(convertHandler.convert(5,'km'),5/1.60934);
            done();
        });

        test('should correctly convert lbs to kg',(done)=>{
            assert.equal(convertHandler.convert(5,'lbs'),5*0.453592);
            done();
        });

        test('should correctly convert kg to lbs',(done)=>{
            assert.equal(convertHandler.convert(5,'kg'),5/0.453592);
            done();
        });



    });

    

});