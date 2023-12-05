export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      if (!word[0]) return;
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};
