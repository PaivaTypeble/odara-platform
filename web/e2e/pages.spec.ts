import { test, expect } from '@playwright/test';

test.describe('ODARA Platform - Page Navigation Tests', () => {
  
  test('Dashboard loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Bem-vindo à ODARA')).toBeVisible();
    await expect(page.getByRole('link', { name: /Condomínios Gestão da/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Assembleias Atas/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Objetivos Acompanhamento/ })).toBeVisible();
  });

  test('Condomínios page loads', async ({ page }) => {
    await page.goto('/condominios');
    await expect(page.getByText('Condomínios').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Novo Condomínio/i })).toBeVisible();
  });

  test('Condomínio detail page loads', async ({ page }) => {
    await page.goto('/condominios/1');
    await expect(page.getByText('Visão Geral')).toBeVisible();
  });

  test('Novo condomínio form loads', async ({ page }) => {
    await page.goto('/condominios/novo');
    await expect(page.getByText('Novo Condomínio')).toBeVisible();
  });

  test('Objetivos page loads with tabs', async ({ page }) => {
    await page.goto('/objetivos');
    await expect(page.getByRole('heading', { name: 'Objetivos Operacionais' })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Todos/i })).toBeVisible();
  });

  test('Objetivo detail page loads', async ({ page }) => {
    await page.goto('/objetivos/1');
    await expect(page.getByText('Descrição')).toBeVisible();
    await expect(page.getByText('Histórico de Atualizações')).toBeVisible();
  });

  test('Novo objetivo form loads', async ({ page }) => {
    await page.goto('/objetivos/novo');
    await expect(page.getByText('Novo Objetivo')).toBeVisible();
  });

  test('Assembleias page loads', async ({ page }) => {
    await page.goto('/assembleias');
    await expect(page.getByRole('heading', { name: 'Assembleias' })).toBeVisible();
  });

  test('Assembleia detail page loads', async ({ page }) => {
    await page.goto('/assembleias/1');
    await expect(page.getByText('Decisões Tomadas')).toBeVisible();
  });

  test('Nova assembleia form loads', async ({ page }) => {
    await page.goto('/assembleias/novo');
    await expect(page.getByText('Nova Assembleia')).toBeVisible();
  });

  test('Fornecedores page loads', async ({ page }) => {
    await page.goto('/fornecedores');
    await expect(page.getByRole('heading', { name: 'Fornecedores' })).toBeVisible();
  });

  test('Fornecedor detail page loads', async ({ page }) => {
    await page.goto('/fornecedores/1');
    await expect(page.getByText('Propostas Enviadas')).toBeVisible();
  });

  test('Novo fornecedor form loads', async ({ page }) => {
    await page.goto('/fornecedores/novo');
    await expect(page.getByText('Novo Fornecedor')).toBeVisible();
  });

  test('Manutenção page loads with tabs', async ({ page }) => {
    await page.goto('/manutencao');
    await expect(page.getByRole('heading', { name: 'Manutenção' })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Ativos/i })).toBeVisible();
  });

  test('Asset detail page loads', async ({ page }) => {
    await page.goto('/manutencao/1');
    await expect(page.getByText('Histórico de Manutenções')).toBeVisible();
  });

  test('Novo ativo form loads', async ({ page }) => {
    await page.goto('/manutencao/ativos/novo');
    await expect(page.getByText('Novo Ativo')).toBeVisible();
  });

  test('Relatórios page loads', async ({ page }) => {
    await page.goto('/relatorios');
    await expect(page.getByRole('heading', { name: 'Relatórios', exact: true })).toBeVisible();
  });

  test('Portal Transparência loads', async ({ page }) => {
    await page.goto('/portal');
    await expect(page.getByRole('heading', { name: 'Portal da Transparência' })).toBeVisible();
    await expect(page.getByText('Próxima Assembleia')).toBeVisible();
  });

  test('Settings page loads', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Configurações' })).toBeVisible();
  });

  test('Utilizadores page loads', async ({ page }) => {
    await page.goto('/settings/utilizadores');
    await expect(page.getByRole('heading', { name: 'Utilizadores', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Todos os Utilizadores' })).toBeVisible();
  });

});
