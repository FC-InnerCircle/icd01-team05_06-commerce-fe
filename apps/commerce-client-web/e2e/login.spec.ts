import { expect, test } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: '로그인' }).click();

  await page.getByPlaceholder('아이디를 입력해 주세요.').fill('test@example.com');
  await page.getByPlaceholder('비밀번호를 입력해 주세요.').fill('1111');
  await page.getByRole('button', { name: '로그인' }).click();

  await page.waitForURL('http://localhost:3000/');

  await expect(page.getByText('로그아웃')).toBeVisible();
});
