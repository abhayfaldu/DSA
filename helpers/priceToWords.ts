function price_in_words(price: number): string {
  // Arrays to hold the words representing digits
  const singleDigit: string[] = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const doubleDigit: string[] = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tensPlace: string[] = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  // Function to handle tens place
  const handle_tens = function(digit: number, prevDigit: number): string {
      return digit === 0 ? "" : " " + (digit === 1 ? doubleDigit[prevDigit] : tensPlace[digit]);
  };

  // Function to handle units, tens, and hundreds places
  const handle_utlc = function(digit: number, nextDigit: number, denom: string): string {
      return (digit !== 0 && nextDigit !== 1 ? " " + singleDigit[digit] : "") + (digit !== 0 || nextDigit !== 0 ? " " + denom : "");
  };

  // Function to handle the decimal part
  const handle_decimal = function(decimalPart: number): string {
      if (decimalPart === 0) return "";
      if (decimalPart < 10) return singleDigit[decimalPart] + " paise";
      if (decimalPart < 20) return doubleDigit[decimalPart - 10] + " paise";
      const tens = Math.floor(decimalPart / 10);
      const units = decimalPart % 10;
      return tensPlace[tens] + (units !== 0 ? " " + singleDigit[units] : "") + " paise";
  };

  // Initialization
  let str = "";
  let digitIndex = 0;
  let digit = 0;
  let nextDigit = 0;
  const words: string[] = []; // Array to hold the words

  // Check if the input price is a valid number
  if (isNaN(price)) {
      str = ""; // If not a number, return an empty string
  } else {
      const nonDecimal = Math.floor(price); // Get the non-decimal part
      const decimal = Math.floor((price - nonDecimal) * 100); // Get the decimal part and convert it to an integer

      // Process non-decimal part if it's greater than zero and has at most 10 digits
      if (nonDecimal > 0 && nonDecimal.toString().length <= 10) {
          for (digitIndex = nonDecimal.toString().length - 1; digitIndex >= 0; digitIndex--) {
              digit = parseInt(nonDecimal.toString()[digitIndex]); // Get the digit at the current index
              nextDigit = digitIndex > 0 ? parseInt(nonDecimal.toString()[digitIndex - 1]) : 0; // Get the next digit
              switch (nonDecimal.toString().length - digitIndex - 1) { // Determine the position of the digit
                  case 0: // Units place
                      words.push(handle_utlc(digit, nextDigit, ""));
                      break;
                  case 1: // Tens place
                      words.push(handle_tens(digit, parseInt(nonDecimal.toString()[digitIndex + 1])));
                      break;
                  case 2: // Hundreds place
                      words.push(digit !== 0 ? " " + singleDigit[digit] + " Hundred" + (parseInt(nonDecimal.toString()[digitIndex + 1]) !== 0 && parseInt(nonDecimal.toString()[digitIndex + 2]) !== 0 ? " and" : "") : "");
                      break;
                  case 3: // Thousands place
                      words.push(handle_utlc(digit, nextDigit, "Thousand"));
                      break;
                  case 4: // Ten thousands place
                      words.push(handle_tens(digit, parseInt(nonDecimal.toString()[digitIndex + 1])));
                      break;
                  case 5: // Lakhs place
                      words.push(handle_utlc(digit, nextDigit, "Lakh"));
                      break;
                  case 6: // Ten lakhs place
                      words.push(handle_tens(digit, parseInt(nonDecimal.toString()[digitIndex + 1])));
                      break;
                  case 7: // Crores place
                      words.push(handle_utlc(digit, nextDigit, "Crore"));
                      break;
                  case 8: // Ten crores place
                      words.push(handle_tens(digit, parseInt(nonDecimal.toString()[digitIndex + 1])));
                      break;
                  case 9: // Hundreds of crores place
                      words.push(digit !== 0 ? " " + singleDigit[digit] + " Hundred" + (parseInt(nonDecimal.toString()[digitIndex + 1]) !== 0 || parseInt(nonDecimal.toString()[digitIndex + 2]) !== 0 ? " and" : " Crore") : "");
                      break;
              }
          }
          // Reverse the words array and join them to form the string
          const lastWord = words[words.length - 1];
          const lastWordIsNumber = lastWord && /^\d+$/.test(lastWord.trim());

          // Add space before "Rupees" if the last word is a number without a denomination
          str = words.reverse().join("").trim() + (lastWordIsNumber ? " " : " ") + "Rupees ";
      }

      // Process decimal part if it's greater than zero
      if (decimal > 0) {
          str += (str.trim() === "" ? "" : "and ") + handle_decimal(decimal);
      }
  }
  // Add "Only" at the end and trim any leading or trailing spaces
  return str.trim() + " Only";
}
