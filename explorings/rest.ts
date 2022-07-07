//const pipeline = middleware ? [...middleware, handler] : handler;

const firstArray = ['a', 'b', 'c'];

const numb = [1, 2, 3];

const [letterA, ...pipeline] = [...firstArray, ...numb];

console.log(pipeline);
console.log(letterA);
