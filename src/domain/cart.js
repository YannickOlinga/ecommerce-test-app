function calculateCartTotal(items) {
  if (!Array.isArray(items)) {
    throw new Error('Items invalides');
  }

  return items.reduce((total, item) => {
    if (!item || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
      throw new Error('Article invalide');
    }
    if (item.price < 0 || item.quantity < 0) {
      throw new Error('Article invalide');
    }
    if (item.quantity === 0) {
      return total;
    }
    return total + item.price * item.quantity;
  }, 0);
}

module.exports = { calculateCartTotal };
