export const numberToStringVersion = (number, dropDecimals = false) => {
  if (number === 0) return "0";

  const decimalPlaces = dropDecimals ? 0 : 2;

  if (Math.abs(number) < 1) {
    return number.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces });
  }

  const orderOfMagnitude = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffixes = ["", "K", "M", "B", "T", "q", "Q", "s", "S", "O", "N", "D", "U"];
  const suffix = suffixes[orderOfMagnitude];

  const divisor = Math.pow(10, orderOfMagnitude * 3);
  const scaledNumber = number / divisor;

  const formattedNumber = scaledNumber.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces });
  return formattedNumber.endsWith('.00') || dropDecimals ? formattedNumber.split('.')[0] + suffix : formattedNumber + suffix;
}
