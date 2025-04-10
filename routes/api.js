'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get(function(req, res) {
    let input = req.query.input;
    let inputIndex = input.search(/[a-z]/i);
    let cleanNum, cleanUnit;
    //slice values into two for unit and number
    cleanUnit = input.slice(inputIndex, input.length);
    cleanNum = input.slice(0, inputIndex);
      
    

      //running convertHandler functions to get base values
      const initNum = convertHandler.getNum(cleanNum);
      const initUnit = convertHandler.getUnit(cleanUnit);

      if (initNum !== null && initUnit !== null) {
        
        const returnNum = convertHandler.convert(initNum, initUnit);
        
        const returnUnit = convertHandler.getReturnUnit(initUnit);
        //factoring remaining variables and declaring them
        const fullInitUnit = convertHandler.spellOutUnit(initUnit);
        const fullReturnUnit = convertHandler.spellOutUnit(returnUnit);
        const toString = convertHandler.getString(initNum, fullInitUnit, returnNum, fullReturnUnit);
  
        res.json({initNum, initUnit, returnNum, returnUnit, string: toString});
      } else  if (initNum !== null || initUnit !== null) {
          res.json({ error: `invalid ${initNum !== null ? 'unit' : 'number'}` });
      } else {
          res.json({ error: 'invalid number and unit' });
      }
  });
};
