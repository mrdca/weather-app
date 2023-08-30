export const isValidZipCode = (zipCode: string): boolean => {
  const zipCodePattern = /^\d{5}$/; // Valid pattern: 5 digits
  return zipCodePattern.test(zipCode);
};
