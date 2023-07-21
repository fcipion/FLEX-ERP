export function capitalizeString(string) {
  const [firstLetter, ...restOfString] = string;
  const capitalizedString = `${firstLetter.toUpperCase()}${restOfString.join(
    ""
  )}`;

  return capitalizedString;
}

export function uppercaseFirstLetter(string) {
  // Split the input string by underscores
  var words = string.split("_");

  // Capitalize the first letter of each word and join them with a space
  var formattedString = words
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return formattedString;
}
