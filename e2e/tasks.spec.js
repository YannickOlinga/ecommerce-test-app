const { test, expect } = require('@playwright/test');

test('un utilisateur crée une tâche, la voit dans la liste puis la termine', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('task-title-input').fill('Envoyer le TP');
  await page.getByTestId('task-priority-select').selectOption('haute');
  await page.getByTestId('task-submit').click();

  const item = page.getByTestId('task-item').filter({ hasText: 'Envoyer le TP' });
  await expect(item).toBeVisible();
  await expect(item).toContainText('haute');

  await item.getByTestId('task-done-button').click();

  const doneItem = page.getByTestId('task-item').filter({ hasText: 'Envoyer le TP' });
  await expect(doneItem).toHaveClass(/done/);
  await expect(doneItem.getByTestId('task-done-button')).toHaveCount(0);
});

test('soumettre sans titre affiche une erreur', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('task-submit').click();
  await expect(page.getByTestId('error-message')).toHaveText('Le titre est obligatoire');
});

