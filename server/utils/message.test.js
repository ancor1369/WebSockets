var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', () =>
    {
        var from = 'Admin';
        var text = 'Text to review';
        var result = generateMessage(from, text);
        
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from,text});
    });
});

describe('generateLocationMessage',()=>
{
    it('Should generate correct location message',()=>
    {
        var from ='Admin';
        var latitude = 3;
        var longitude = 4;
        var urls = 'https://www.google.com/maps?q=3,4';

        var result = generateLocationMessage(from, latitude, longitude);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from,urls});
    });
});