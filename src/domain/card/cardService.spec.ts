import { isValidCardName, isValidCardNumber, isValidDate, isValidCvc, addSpaceEveryFourChars, addSlashEveryTwoChars } from './cardService'

describe('Card Service', () => {
  describe('isValidCardName', () => {
    it('Should NOT valid if name is not followed by las name', () => {
      
      expect(isValidCardName('jhon')).toBeFalsy();
   });
   it('Should NOT valid if name is less than two characters and is not followed by las name', () => {
      
    expect(isValidCardName('jh')).toBeFalsy();
    expect(isValidCardName('jh ')).toBeFalsy();
   });
   it('Should NOT valid if name length > 2 and follwed by space and last name length < 2', () => {
      
    expect(isValidCardName('jhon do')).toBeFalsy();
   });
   it('Should is valid if name length > 2 and follwed by space and last name length > 2', () => {
      
    expect(isValidCardName('jhon doe')).toBeTruthy();
   });
  })
  describe('cardNumber', () => {
    it('Should NOT valid if no value is provided', () => {
      
      expect(isValidCardNumber()).toBeFalsy();
   });
   it('Should Not valid if value is valid card number', () => {
      
      expect(isValidCardNumber(null)).toBeFalsy();
      expect(isValidCardNumber('dfsdf')).toBeFalsy();
      expect(isValidCardNumber('23898765sdf4')).toBeFalsy();
      expect(isValidCardNumber({})).toBeFalsy();
      expect(isValidCardNumber(()=>{})).toBeFalsy();
   });
  })
  describe('isValidDate', () => {
    it('Should Not valid if value is not a valid date', () => {
      
      expect(isValidDate(null)).toBeFalsy();
      expect(isValidDate('dfsdf')).toBeFalsy();
      expect(isValidDate({})).toBeFalsy();
      expect(isValidDate(()=>{})).toBeFalsy();
   });
   it('Should be valid if value is a valid date', () => {
      
    expect(isValidDate("08/21")).toBeTruthy();
   });
  });
  describe('isValidCvc', () => {
    it('Should is Not valid if value has more/less than three digits', () => {
      expect(isValidCvc(22)).toBeFalsy();
      expect(isValidCvc(2255)).toBeFalsy();
    })
    it('Should Not valid if value has three digits', () => {
      expect(isValidCvc(22)).toBeFalsy();
      expect(isValidCvc(2255)).toBeFalsy();
    })
  })

  describe('addSpaceEveryFourChars',() => {
    it('should add space in every four chars', () =>{
      expect(addSpaceEveryFourChars('33')).toEqual('33')
      expect(addSpaceEveryFourChars('3333')).toEqual('3333')
      expect(addSpaceEveryFourChars('333 3333')).toEqual('3333 333')
      expect(addSpaceEveryFourChars('3333333')).toEqual('3333 333')
      expect(addSpaceEveryFourChars('5500000000000004')).toEqual('5500 0000 0000 0004')
    })
    describe('addSlashEveryTwoChars',() => {

      it('should add slash every two charachters', () =>{
        expect(addSlashEveryTwoChars('10')).toEqual('10/')
        expect(addSlashEveryTwoChars('1')).toEqual('1')
        expect(addSlashEveryTwoChars('101')).toEqual('10/1')
        expect(addSlashEveryTwoChars('1012')).toEqual('10/12')
        expect(addSlashEveryTwoChars('10/12')).toEqual('10/12')
      });
    })
  })
})