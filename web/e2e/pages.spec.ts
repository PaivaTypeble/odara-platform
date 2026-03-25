import { test, expect } from '@playwright/test';

test.describe('ODARA Platform - Page Navigation Tests', () => {
  
  test('Dashboard loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check page loads
    await expect(page.getByText('Bem-vindo à ODARA')).toBeVisible();
    
    // Check main navigation cards exist
    await expect(page.getByRole('link', { name: /Condomínios Gestão da/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Assembleias Atas/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Objetivos Acompanhamento/ })).toBeVisible();
  });

  test('Condomínios page loads and displays table', async ({ page }) => {
    await page.goto('/condominios');
    
    await expect(page.getByText('Condomínios').first()).toBeVisible();
    
    // Check table headers
    await expect(page.getByRole('columnheader', { name: 'Condomínio' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Frações' })).toBeVisible();
    
    // Check Novo Condomínio button
    await expect(page.getByRole('button', { name: /Novo Condomínio/i })).toBeVisible();
  });

  test('Objetivos page loads with tabs', async ({ page }) => {
    await page.goto('/objetivos');
    
    await expect(page.getByRole('heading', { name: 'Objetivos Operacionais' })).toBeVisible();
    
    // Check tabs
    await expect(page.getByRole('tab', { name: /Todos/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Em Progresso/i })).toBeVisible();
  });

  test('Assembleias page loads', async ({ page }) => {
    await page.goto('/assembleias');
    
    await expect(page.getByRole('heading', { name: 'Assembleias' })).toBeVisible();
    await expect(page.getByText('Gestão de assembleias e decisões')).toBeVisible();
  });

  test('Fornecedores page loads', async ({ page }) => {
    await page.goto('/fornecedores');
    
    await expect(page.getByRole('heading', { name: 'Fornecedores' })).toBeVisible();
  });

  test('Manutenção page loads with tabs', async ({ page }) => {
    await page.goto('/manutencao');
    
    await expect(page.getByRole('heading', { name: 'Manutenção' })).toBeVisible();
    
    // Check tabs
    await expect(page.getByRole('tab', { name: /Ativos/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Intervenções/i })).toBeVisible();
  });

  test('Relatórios page loads', async ({ page }) => {
    await page.goto('/relatorios');
    
    // Use exact match for heading
    await expect(page.getByRole('heading', { name: 'Relatórios', exact: true })).toBeVisible();
    await expect(page.getByText('Reporting e auditoria operacional')).toBeVisible();
  });

  test('Navigation between pages works', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Condomínios via link
    await page.getByRole('link', { name: /Condomínios Gestão da/ }).click();
    await page.waitForURL('**/condominios');
    await expect(page).toHaveURL(/\/condominios/);
    
    // Navigate back
    await page.goto('/');
    
    // Navigate to Objetivos
    await page.getByRole('link', { name: /Objetivos Acompanhamento/ }).click();
    await page.waitForURL('**/objetivos');
    await expect(page).toHaveURL(/\/objetivos/);
  });

  test('Tabs switch correctly on Objetivos page', async ({ page }) => {
    await page.goto('/objetivos');
    
    // Click on Em Progresso tab
    await page.getByRole('tab', { name: /Em Progresso/i }).click();
    
    // Click on Bloqueados tab  
    await page.getByRole('tab', { name: /Bloqueados/i }).click();
    
    // Click on Concluídos tab
    await page.getByRole('tab', { name: /Concluídos/i }).click();
  });

});
