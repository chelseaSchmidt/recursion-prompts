/* jshint esversion: 6 */

// Solve the following prompts using recursion.

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
var factorial = function(n) {
  //data validation: do not accept negative integers
  if (n < 0) {
    return null;
  }
  //base case: if n has been reduced to 1, return 1 to product
  if (n <= 1) {
    return 1;
  }
  //recursive case: if n is greater than 1,
  if (n > 1) {
    //set product equal to n * the next call of factorial() on n - 1
    let product = factorial(n - 1) * n;
    //After the recursive case has finished evaluating, return finished product
    return product;
  }
};

// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21
var sum = function(array) {
  //data validation: return 0 if array is empty
  if (array.length === 0) {
    return 0;
  }
  //base case: return the current element if reached first position of array (counting backwards)
  if (array.length === 1) {
    return array[0];
  }
  //recursive case: if not at last position of array,
  if (array.length !== 0) {
    //store last element from the array
    let element = array[array.length - 1];
    //truncate array by 1
    array = array.slice(0, -1);
    //set sum equal to the current element + sum() called on the ever-shrinking array
    let total = element + sum(array);
    //return finished sum
    return total;
  }
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
var arraySum = function(array) {
  //outer base case: if the array is reduced to empty,
  if (array.length === 0) {
    //return 0
    return 0;
  } else {
  //outer recursive case: else,
    //store the last element
    let element = array[array.length - 1];
    //truncate the array by 1 (sub-array)
    array = array.slice(0, -1);
    //inner base case: if the last element of the array is a number,
    if (typeof element === 'number') {
      //return the current element plus arraySum() called on sub-array
      return element + arraySum(array);
    } else {
    //inner recursive case: else (i.e. it's a nested array),
      //return arraySum() called on current element plus arraySum() called on sub-array
      return arraySum(element) + arraySum(array);
    }
  }
};

// 4. Check if a number is even.
var isEven = function(n) {
  //subtract 2 from the number until it's reduced to either 1 or 0, and if the result is zero, return true

  //base case: if n has been reduced to < 2,
  if (Math.abs(n) < 2) {
    //return n === 1
    return n === 0;
  } else {
  //recursive case: if is greater than or equal to 2,
    //call isEven() on n - 2
    return isEven(Math.abs(n) - 2);
  }
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45
// sumBelow(7); // 21
var sumBelow = function(n) {
  //negative numbers - treat as trending toward zero
  //base case: if absolute value of n is less than or equal to 1,
  if (Math.abs(n) <= 1) {
    //return 0
    return 0;
  } else {
  //recursive case: else,
    //define decrementor as -1 if n > 0, +1 if n < 0
    let decrementor;
    if (n > 0) {
      decrementor = -1;
    } else {
      decrementor = 1;
    }
    //return n - 1 plus sumBelow() called on n decremented
    return n + decrementor + sumBelow(n + decrementor);
  }
};

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
var range = function(x, y) {
  //assume x can be greater than y, y can be greater than x, or x can equal y
  //base case: when x reaches one before y, y reaches one before x, or if x starts out equal to y:
  if (x === y || Math.abs(x - y) < 2) {
    //return empty array
    return [];
  } else if (x < y - 1) {
  //recursive case 1: else if x < y,
    //set rangeArray to range() called on x + 1 and original y
    let rangeArray = range(x + 1, y);
    //insert x + 1 into beginning of rangeArray
    rangeArray.unshift(x + 1);
    //return rangeArray
    return rangeArray;
  } else {
  //recursive case 2: else (i.e. y < x),
    //set rangeArray to range() called on y + 1 and original x
    let rangeArray = range(x, y + 1);
    //insert y + 1 into beginning of rangeArray
    rangeArray.push(y + 1);
    //return rangeArray
    return rangeArray;
  }
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
var exponent = function(base, exp) {
  //base case: if exp has been reduced to zero or starts at zero (any number raised to 0 is 1),
  if (exp === 0) {
    //return 1
    return 1;
  } else if (exp > 0) {
  //recursive case 1: else if exponent is positive,
    //if exponent is even,
    if (isEven(exp)) {
      //optimized path:
      return exponent(base * base, exp / 2);
    } else {
    //else, return base * exponent() called on exp minus 1
      return base * exponent(base, exp - 1);
    }
  } else {
  //recursive case 2: else (i.e. exponent is negative),
    //store flipped base * exponent() called on exp + 1
    let result = (1 / base) * exponent(base, exp + 1);
    //account for rounding weirdness
    return Number(result.toFixed(10));
  }
};

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
var powerOfTwo = function(n) {
  //n is a power of two if 2^x equals it
  //if n is 1
  if (n === 1) {
    //return true
    return true;
  }
  if (n === 0) {
    return false;
  }
  //base case: if n is between 1 and 2
  if (n > 1 && n <= 2) {
    //return n === 2
    return n === 2;
  }
  //recursive case: if n greater than 2
  if (n > 2) {
    //return function called on n / 2
    return powerOfTwo(n / 2);
  }
};

// 9. Write a function that reverses a string.
var reverse = function(string) {
  //base case: if original string length is 0
  if (string.length === 0) {
    //return empty string
    return '';
  } else {
  //recursive case: if original string length is greater than zero,
    //assign new string to itself + current index
    let reversedString = string.slice(-1) + reverse(string.slice(0, -1));
    //return new string
    return reversedString;
  }
};

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function(string) {
  //convert all char to lowercase
  string = string.toLowerCase();
  //if string is 2 char
  if (string.length === 2) {
    //return false
    return false;
  }
  //base case: if string is empty or 1
  if (string.length <= 1) {
    //return true
    return true;
  } else {
  //recursive case: if string > 1 char, compare outer chars if equal, rerun on inner string; else return false
    if (string.slice(0,1) === string.slice(-1)) {
      return palindrome(string.slice(1, -1));
    } else {
      return false;
    }
  }
};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
var modulo = function(x, y) {
  if (y === 0) {
    return NaN;
  }
  if (x === 0) {
    return 0;
  }
  if (x === y) {
    return 0;
  }
  if (x > 0 && y > 0) {
    if (x < y) {
      return x;
    } else {
      return modulo(x - y, y);
    }
  }
  if (x > 0 && y < 0) {
    if (x < -y) {
      return -x;
    } else {
      return modulo(x + y, y);
    }
  }
  if (x < 0 && y > 0) {
    if (-x < y) {
      return x;
    } else {
      return modulo(x + y, y);
    }
  }
  if (x < 0 && y < 0) {
    if (-x < -y) {
      return x;
    } else {
      return modulo(x - y, y);
    }
  }
};

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
var multiply = function(x, y) {
  if (y === 0) {
    return 0;
  }
  if (y === 1) {
    return x;
  }
  if (y > 1) {
    return x + multiply(x, y - 1);
  }
  if (y === -1) {
    return -x;
  }
  if (y < -1) {
    return -x + multiply(x, y + 1);
  }
};

// 13. Write a function that divides two numbers without using the / operator or
// Math methods to arrive at an approximate quotient (ignore decimal endings).
var divide = function(x, y) {
};

// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
var gcd = function(x, y) {
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str) {
};

// 17. Reverse the order of an array
var reverseArr = function(array) {
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
};

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']
var fizzBuzz = function(n) {
};

// 20. Count the occurence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function(array, value) {
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
};

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
var countKeysInObj = function(obj, key) {
};

// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1
var countValuesInObj = function(obj, value) {
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
var replaceKeysInObj = function(obj, oldKey, newKey) {
};

// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.
var fibonacci = function(n) {
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
var nthFibo = function(n) {
};

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
var capitalizeFirst = function(array) {
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
var nestedEvenSum = function(obj) {
};

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function(array) {
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
var letterTally = function(str, obj) {
};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
var compress = function(list) {
};

// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug) {
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function(str) {
};


// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
var tagCount = function(tag, node) {
};

// 38. Write a function for binary search.
// var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// binarySearch(array, 5) // 5
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
var binarySearch = function(array, target, min, max) {
};

// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
var mergeSort = function(array) {
};

// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
var clone = function(input) {
};
