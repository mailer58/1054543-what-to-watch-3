/* const test = (a) => (b) => (c) => {
  return a;
}; */


/* const test = (a) => {
  return (
    () => {
      return (
        () => {
          return a;
        }
      );
    }

  );
}; */
/* const test2 = test(5);
const test3 = test2();
console.log(test2()()); */

/* const store = 1000;
const dispath = 3;
const testFunc = (a) => (b) => {
  return a + b;
};

const test = testFunc(store);
console.log(testFunc(store)(dispath)); */

const makeCounter = () => {
  let count = 0;
  return () => {
    count++;
    return count;
  };
};

const counter = makeCounter();
console.log(counter());
console.log(counter());


