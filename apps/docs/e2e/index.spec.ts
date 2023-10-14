import {test, expect} from '@playwright/test';

test('has "React Knob Headless" title', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('React Knob Headless');
});
