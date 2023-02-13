if (!Object.is) {
  Object.is = function ObjectIs(paramOne, paramTwo) {
    let paramOneNegZero = isItNegZero(paramOne);
    let paramTwoNegZero = isItNegZero(paramTwo);

    if (paramOneNegZero || paramTwoNegZero) {
      return paramOneNegZero && paramTwoNegZero;
    } else if (isItNaN(paramOne) && isItNaN(paramTwo)) {
      return true;
    } else if (paramOne === paramTwo) {
      return true;
    } else {
      return false;
    }

    function isItNegZero(param) {
      return param === 0 && 1 / param === -Infinity;
    }

    function isItNaN(param) {
      return param !== param;
    }
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
