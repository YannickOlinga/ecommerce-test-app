const { test, expect } = require('@playwright/test');

test('un utilisateur se connecte et voit la liste des produits', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('login-email').fill('yannick@example.com');
  await page.getByTestId('login-password').fill('Motdepasse1!');
  await page.getByTestId('login-submit').click();

  await expect(page.getByTestId('user-info')).toContainText('yannick@example.com');
  await expect(page.getByTestId('product-list')).toBeVisible();

  const items = page.getByTestId('product-item');
  await expect(items).toHaveCount(4);

  const first = items.first();
  await expect(first.getByTestId('product-name')).not.toBeEmpty();
  await expect(first.getByTestId('product-price')).toContainText('€');
  await expect(first.getByTestId('product-stock')).not.toBeEmpty();
});

test('un utilisateur calcule un aperçu de commande et voit le total', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('login-email').fill('yannick@example.com');
  await page.getByTestId('login-password').fill('Motdepasse1!');
  await page.getByTestId('login-submit').click();

  await page.getByTestId('nav-order').click();
  await page.getByTestId('order-quantity').fill('2');
  await page.getByTestId('order-discount').fill('10');
  await page.getByTestId('order-weight').fill('1');
  await page.getByTestId('order-submit').click();

  const result = page.getByTestId('preview-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Total');
});
