function calculateShipping(weightKg) {
  if (weightKg === undefined || weightKg === null || typeof weightKg !== 'number' || weightKg < 0) {
    throw new Error('Poids invalide');
  }
  if (weightKg === 0) return 0;
  if (weightKg <= 2) return 4.99;
  if (weightKg <= 10) return 9.99;
  return 14.99;
}

module.exports = { calculateShipping };
