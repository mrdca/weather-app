import { isValidZipCode } from '../utils/ValidationUtils';

describe('isValidZipCode', () => {
  it('returns true for valid zip codes', () => {
    const validZipCodes = ['12345', '54321', '98765'];

    validZipCodes.forEach(zipCode => {
      expect(isValidZipCode(zipCode)).toBe(true);
    });
  });

  it('returns false for invalid zip codes', () => {
    const invalidZipCodes = ['1234', '543210', 'abcde', '123456'];

    invalidZipCodes.forEach(zipCode => {
      expect(isValidZipCode(zipCode)).toBe(false);
    });
  });
});
