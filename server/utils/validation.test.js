const expect = require('expect');

const {isRealStrig} = require('./validation');

describe('isRealString',()=>
{
    it('Should generate Error on string given. Spaces between string',()=>
    {
        var testString1 = 'String Plus more text';       

        var result1 = isRealStrig(testString1);       

        expect(result1).toBe(true);
        
    });

    it('Should generate false on data given, A non-string data',()=>
    {        
        var testData = 75;       
        var result2 = isRealStrig(testData);
        expect(result2).toBe(false);
    });

    it('Should generate a correct test on the data provided, only text without spaces',()=>
    {
        var testString3 = 'thisisapassingstring';
        var result3 = isRealStrig(testString3);
        expect(result3).toBe(true);
    });
});

// const expect = require('expect');

// const {isRealString} = require('./validation');

// describe('isRealString', () => {
//   it('should reject non-string values', () => {
//     var res = isRealString(98);
//     expect(res).toBe(false);
//   });

//   it('should reject string with only spaces', () => {
//     var res = isRealString('    ');
//     expect(res).toBe(false);
//   });

//   it('should allow string with non-space characters', () => {
//     var res = isRealString('D');
//     expect(res).toBe(true);
//   });
// });