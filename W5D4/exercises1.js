function madLib(verb, adj, noun) {
  return 'we shall ' +
  verb.toUpperCase() +
  ' the ' + adj.toUpperCase() +
  ' ' + noun.toUpperCase()
}

console.log(madLib('make', 'best', 'guac'));

function isSubstring(searchString, subString) {
  return searchString.includes(subString);
}

console.log(isSubstring("time to program", "time"));

console.log(isSubstring("Jump for joy", "joys"));

function fizzBuzz(array) {
  divisible = []
  for (var i = 0; i < array.length; i++) {
    if (array[i] % 3 === 0 && array[i] % 5 === 0) {
      continue
    } else if (array[i] % 3 === 0 || array[i] % 5 === 0) {
      divisible.push(array[i])
    }
  }
  return divisible
}

console.log(fizzBuzz([2,4,5,6,15,90,35]));


function isPrime(number) {
  for (var i = 2; i < number; i++) {
    if (number % i === 0) {
      return false
    }
  }
  return true
}

console.log(isPrime(2));
console.log(isPrime(10));
console.log(isPrime(15485863));
console.log(isPrime(3548563));

function add(a, b) {
  return a + b;
}

function sumOfNPrimes(n) {
  if (n === 0) {
    return 0
  }
  primes = [];
  i = 2;
  while (primes.length < n) {
    if (isPrime(i)) {
      primes.push(i)
    }
    i+=1;
  }
  return primes.reduce(add, 0)
}

console.log(sumOfNPrimes(0))
console.log(sumOfNPrimes(1))
console.log(sumOfNPrimes(4))
