const start = 171309;
const end = 643603;

// console.log(111111, passwordMeetsExtendedCriteria("111111"));
// console.log(223450, passwordMeetsExtendedCriteria("223450"));
// console.log(123789, passwordMeetsExtendedCriteria("123789"));
// console.log(123444, passwordMeetsExtendedCriteria("123444"));
// console.log(111122, passwordMeetsExtendedCriteria("111122"));
// console.log(123556, passwordMeetsExtendedCriteria("123556"));
// console.log(567888, passwordMeetsExtendedCriteria("567888"));
console.log("Valid passwords", countValidPasswords(start, end));

function countValidPasswords(start, end) {
  let count = 0;

  for (let i = start; i <= end; i++) {
    if (passwordMeetsExtendedCriteria(i.toString())) {
      count++;
    }
  }

  return count;
}

function passwordMeetsCriteria(password: string) {
  return (
    password.length === 6 &&
    hasTwoOrMoreAdjacentDigits(password) &&
    digitsDoNotDecrease(password)
  );
}

function passwordMeetsExtendedCriteria(password: string) {
  return (
    password.length === 6 &&
    hasExactlyTwoAdjacentDigits(password) &&
    digitsDoNotDecrease(password)
  );
}

function hasTwoOrMoreAdjacentDigits(password: string) {
  for (var i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      return true;
    }
  }
  return false;
}

function hasExactlyTwoAdjacentDigits(password: string) {
  let count = 1;

  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      count++;
      continue;
    } else if (count === 2) {
      break;
    }

    count = 1;
  }

  return count === 2;
}

function digitsDoNotDecrease(password: string) {
  for (var i = 1; i < password.length; i++) {
    if (password[i] < password[i - 1]) {
      return false;
    }
  }
  return true;
}
