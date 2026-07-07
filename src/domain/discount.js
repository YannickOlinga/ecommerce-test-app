function applyDiscount(total, discountPercent) {
  if (typeof total !== 'number' || typeof discountPercent !== 'number') {
    throw new Error('Remise invalide');
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Remise invalide');
  }
  return total * (1 - discountPercent / 100);
}

module.exports = { applyDiscount };
