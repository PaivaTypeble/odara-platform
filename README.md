# ODARA - Gestão Operacional de Condomínios

Plataforma de comando operacional para administração de condomínios.

## Visão Geral

A ODARA é uma plataforma que permite:
- Gestão operacional transparente para condomínios
- Acompanhamento de objetivos resultantes de assembleias
- Comparação estruturada de propostas de fornecedores
- Portal do condómino para visibilidade operacional
- Gestão de manutenção e ativos

## Stack Tecnológico

### Frontend
- **Next.js 16** - Framework React
- **React 19** - UI
- **TypeScript** - Linguagem
- **TanStack Query** - Estado remoto
- **shadcn/ui** - Componentes UI
- **Tailwind CSS** - Estilização

### Backend
- **.NET 8** - API
- **PostgreSQL 17** - Base de dados
- **Entity Framework Core** - ORM
- **Redis 7** - Cache
- **RabbitMQ** - Filas de mensagens
- **MinIO** - Armazenamento de ficheiros
- **Keycloak** - Autenticação

## Quick Start

### Pré-requisitos
- Docker e Docker Compose
- .NET 8 SDK
- Node.js 20+

### 1. Iniciar Infraestrutura

```bash
cd infrastructure
docker-compose up -d
```

### 2. Configurar Base de Dados

```bash
cd api
dotnet ef database update
```

### 3. Iniciar Backend

```bash
cd api
dotnet run
```

### 4. Iniciar Frontend

```bash
cd web
npm install
npm run dev
```

## Acesso

- **Web App**: http://localhost:3000
- **API**: http://localhost:5000
- **Swagger**: http://localhost:5000/swagger
- **Keycloak**: http://localhost:8080
- **MinIO Console**: http://localhost:9001
- **RabbitMQ**: http://localhost:15672
- **Seq Logs**: http://localhost:5341

### Credenciais Dev
- Keycloak Admin: admin / admin
- PostgreSQL: odara / odara_dev_password
- RabbitMQ: odara / odara_dev_password

## Estrutura do Projeto

```
odara-platform/
├── web/                 # Frontend Next.js
│   ├── src/
│   │   ├── app/        # Páginas
│   │   ├── components/  # Componentes UI
│   │   └── lib/        # Utilitários
├── api/                 # Backend .NET
│   ├── Controllers/     # API Controllers
│   ├── Data/           # DbContext
│   ├── DTOs/           # Data Transfer Objects
│   ├── Entities/       # Entidades de domínio
│   └── Services/       # Lógica de negócio
└── infrastructure/     # Docker Compose
```

## Módulos

1. **Foundation e Acesso** - Organizações, utilizadores, roles
2. **Carteira de Condomínios** - Condomínios, frações, contactos
3. **Assembleias e Decisões** - Atas, decisões, objetivos
4. **Execução Operacional** - Objetivos, tarefas, prazos
5. **Propostas e Fornecedores** - Categorias, pedidos, comparação
6. **Portal do Condómino** - Transparência operacional
7. **Manutenção e Ativos** - Ativos, planos, alertas
8. **Reporting e Auditoria** - Relatórios, logs

## Fluxos Principais

### Workflow 1 - Onboarding de Condomínio
1. Criar condomínio
2. Configurar dados base, frações e administradores
3. Definir equipa interna responsável
4. Ativar portal do condomínio

### Workflow 2 - Assembleia para Plano Operacional
1. Registar assembleia
2. Anexar ata e documentos
3. Criar decisões aprovadas
4. Converter decisões em objetivos operacionais
5. Atribuir owner, prazo e prioridade

### Workflow 3 - Acompanhamento Operacional
1. Abrir objetivo
2. Registar passos tomados
3. Anexar evidências, emails, propostas
4. Atualizar estado e próxima ação
5. Publicar informação relevante no portal

## Desenvolvimento

### Comandos Úteis

```bash
# Backend
cd api
dotnet build
dotnet run
dotnet ef migrations add <name>
dotnet ef database update

# Frontend
cd web
npm install
npm run dev
npm run build
```

### Testes

```bash
# Backend
dotnet test

# Frontend
npm test
npm run test:e2e
```

## Segurança

- Autenticação via Keycloak/JWT
- Roles e permissões granulares
- Auditoria completa de alterações
- Anexos protegidos com URLs assinadas
- Segregação de dados por organização

## Observabilidade

- Logs estruturados via Serilog + Seq
- Métricas de negócio e técnicas
- Tracing distribuído
- Dashboards operacionais

## Licença

Proprietário - ODARA © 2024
