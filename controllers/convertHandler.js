function ConvertHandler() {
  //define mexp and add new mexp object
  const Mexp = require('math-expression-evaluator');
  const mexp = new Mexp();
  const numRegex = /(^\d+\.?\d*(\/\d+\.?\d*)?)$/i;
  const unitRegex = /^(gal|L|mi|km|lbs|kg)$/i;
  //theres only an imperial unit regex because invalid values should never get here.
  //that means that if the imperial unit test fails then its a metric unit.
  const imperialUnitRegex = /(gal|mi|lbs)/;
  const imperialUnitArray = ['gal', 'mi', 'lbs'];
  const metricUnitArray = ['L', 'km', 'kg'];
  this.getNum = function(input) {
    let result;
    // if there is no number
    if (input === '') {
      return result = 1;
    } else {
    if (!numRegex.test(input)) { 
      result = null;
    } else {
      result = mexp.eval(input.toString());
    };
    
    return result;
    }
  };
  
  this.getUnit = function(input) {
    let result;
    
    if (!unitRegex.test(input)) { return result = null };

    //If the unit isnt Litres. convert to lower case.
    if (input === 'l') {
      result = input.toUpperCase();
    } else if (input !== 'L') {
      result = input.toLowerCase();
    } else {
      result = input;
    };
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if (imperialUnitRegex.test(initUnit)) { 
      const findIndex = imperialUnitArray.findIndex(el => el === initUnit);
      result = metricUnitArray[findIndex];
    } else {
      const findIndex = metricUnitArray.findIndex(el => el === initUnit);
      result = imperialUnitArray[findIndex];
    };
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    //switch statement to spell out the word for the string
    switch (unit) {
      case 'gal':
        result = 'gallons'
        break;

      case 'L':
        result = 'Litres';
        break;

      case 'mi':
        result = 'miles';
        break;
  
      case 'km':
        result = 'kilometers';
        break;
    
      case 'lbs':
        result = 'pounds';
        break;
      
      case 'kg':
        result = 'kilograms';
        break;
    };
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
  
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result, value;
    //turn initNum into a number and parse math
    
    value = initNum;

    switch (initUnit) {
      case 'gal':
        result = (value * galToL);
        break;

      case 'L':
        result = (value / galToL);
        break;

      case 'mi':
        result = (value * miToKm);
        break;
  
      case 'km':
        result = (value / miToKm);
        break;
    
      case 'lbs':
        result = (value * lbsToKg);
        break;
      
      case 'kg':
        result = (value / lbsToKg);
        break;
      
      default:
        break;
    };

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    
    return result;
  };
  
}

module.exports = ConvertHandler;
