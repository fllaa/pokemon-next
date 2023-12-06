// gender ratio pokemon
export const parseGenderRatioToPercentage = (genderRatio: number) => {
  // genderRatio is a number between -1 and 8
  // closer to 0 means more female
  // -1 means genderless
  // return as object male and female with percentage value
  const female = genderRatio * 12.5;
  const male = 100 - female;

  return { male, female };
};
