export default function getSeparatedNumber(num: number) {
  // Convert the number to a string to make it easier to work with
  const numStr: string = num.toString();

  // Split the number into an array of digits
  const digits: string[] = numStr.split("");

  // Reverse the array of digits so we can add commas from right to left
  digits.reverse();

  // Create an empty array to hold the new digits with commas added
  const digitsWithCommas: string[] = [];

  // Loop through each digit and add a comma every three digits
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 3 === 0) {
      digitsWithCommas.push(",");
    }
    digitsWithCommas.push(digits[i]);
  }

  // Reverse the array again to get the digits in the correct order
  digitsWithCommas.reverse();

  // Join the array of digits with commas to create the final result
  const result: string = digitsWithCommas.join("");

  return result;
}
