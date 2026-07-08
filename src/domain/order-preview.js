const { calculateCartTotal } = require('./cart');
const { applyDiscount } = require('./discount');
const { calculateShipping } = require('./shipping');

function buildOrderPreview({ items, discountPercent = 0, shipping }) {
  if (!shipping || shipping.weightKg === undefined) {
    throw new Error('Informations de livraison manquantes');
  }

  const subtotal = calculateCartTotal(items);
  const discountedTotal = applyDiscount(subtotal, discountPercent);
  const shippingFee = calculateShipping(shipping.weightKg);
  const total = Number((discountedTotal + shippingFee).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discountPercent,
    discountedTotal: Number(discountedTotal.toFixed(2)),
    shippingFee,
    total,
  };
}

module.exports = { buildOrderPreview };
