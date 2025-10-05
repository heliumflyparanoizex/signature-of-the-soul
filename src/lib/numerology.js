/**
 * Reduce un número a un solo dígito (1-9) mediante la suma repetida de sus dígitos.
 * @param {number} number - El número a reducir
 * @returns {number} - El número reducido a un solo dígito
 */
export function reduceToSingleDigit(number) {
  if (typeof number !== 'number' || isNaN(number)) {
    throw new Error('Input must be a valid number.');
  }

  while (number > 9) {
    number = String(number)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return number;
}

/**
 * Calcula el número numerológico de un nombre o apellido.
 * @param {string} name - El nombre o apellido
 * @returns {number} - El número numerológico del nombre
 */
export function calculateNameNumber(name) {
  if (typeof name !== 'string') {
    throw new Error('Input must be a string.');
  }

  const normalizedName = name
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/Ñ/g, 'N'); // Tratar Ñ como N

  // Mapeo Pitagórico de letras a números
  const letterValues = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9
  };

  let totalSum = 0;
  for (const char of normalizedName) {
    if (letterValues[char]) {
      totalSum += letterValues[char];
    }
    // Ignorar caracteres no alfabéticos o no mapeados
  }

  return reduceToSingleDigit(totalSum);
}

/**
 * Calcula el número de ruta de vida a partir de la fecha de nacimiento.
 * @param {number} day - El día de nacimiento
 * @param {number} month - El mes de nacimiento
 * @param {number} year - El año de nacimiento
 * @returns {number} - El número de ruta de vida
 */
export function calculateLifePathNumber(day, month, year) {
  if (![day, month, year].every(arg => typeof arg === 'number' && !isNaN(arg))) {
    throw new Error('Day, month, and year must be valid numbers.');
  }

  // Reducir día, mes y año individualmente
  let reducedDay = day;
  while (reducedDay > 9 && ![11, 22].includes(reducedDay)) {
    reducedDay = reduceToSingleDigit(reducedDay);
  }

  let reducedMonth = month;
  while (reducedMonth > 9 && ![11, 22].includes(reducedMonth)) {
    reducedMonth = reduceToSingleDigit(reducedMonth);
  }

  let reducedYear = year;
  while (reducedYear > 9 && ![11, 22].includes(reducedYear)) {
    reducedYear = reduceToSingleDigit(reducedYear);
  }

  // Sumar los componentes reducidos
  let totalSum = reducedDay + reducedMonth + reducedYear;

  // Reducir la suma final, manteniendo números maestros si son el resultado final
  while (totalSum > 9 && ![11, 22, 33].includes(totalSum)) {
    totalSum = reduceToSingleDigit(totalSum);
  }

  return totalSum;
}

/**
 * Calcula la firma vibracional principal combinando el número del nombre, apellido y ruta de vida.
 * @param {string} firstName - El primer nombre
 * @param {string} lastName - El apellido
 * @param {number} day - El día de nacimiento
 * @param {number} month - El mes de nacimiento
 * @param {number} year - El año de nacimiento
 * @returns {object} - Un objeto con los números calculados y la firma vibracional final
 */
export function calculateVibrationalSignature(firstName, lastName, day, month, year) {
  const nameNumber = calculateNameNumber(firstName);
  const surnameNumber = calculateNameNumber(lastName);
  const lifePathNumber = calculateLifePathNumber(day, month, year);

  // Combinar los números para la firma vibracional principal
  const totalSignatureSum = nameNumber + surnameNumber + lifePathNumber;
  const finalSignature = reduceToSingleDigit(totalSignatureSum);

  return {
    nameNumber,
    surnameNumber,
    lifePathNumber,
    finalVibrationalSignature: finalSignature
  };
}
