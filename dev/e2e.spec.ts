import { expect, test } from '@playwright/test'

test('should render admin panel logo', async ({ page }) => {
  await page.goto('/admin/login')

  await page.waitForTimeout(1000)
  // login
  await page.fill('#field-email', 'dev@payloadcms.com')
  await page.fill('#field-password', 'test')
  await page.click('.form-submit button')

  await page.waitForURL('/admin')
  // should show dashboard
  await expect(page).toHaveTitle(/Dashboard/)
  await expect(page.locator('.graphic-icon')).toBeVisible()
})
