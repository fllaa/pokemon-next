export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      if (!word[0]) return;
      if (word.length <= 2) return word.toUpperCase();
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};

export const pad = (num: number, size: number) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

export const parseHeightFromMillimeters = (height: number) => {
  const feet = Math.floor(height * 0.328084);
  const inches = Math.round((height * 0.328084 - feet) * 12);
  return `${feet}'${inches}" (${height / 10}cm)`;
};

export const parseWeightFromHectograms = (weight: number) => {
  const lbs = Math.round(weight * 0.220462);
  return `${lbs}lbs (${weight / 10}kg)`;
};
