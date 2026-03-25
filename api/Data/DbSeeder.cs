using Odara.Api.Entities;

namespace Odara.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Check if data already exists
        if (context.Condominiums.Any())
        {
            return; // DB has been seeded
        }

        var now = DateTime.UtcNow;

        // ============================================
        // Organizations
        // ============================================
        var orgId = Guid.Parse("00000000-0000-0000-0000-000000000001");
        var organization = new Organization
        {
            Id = orgId,
            Name = "ODARA Gestão de Condomínios",
            TaxId = "PT123456789",
            IsActive = true,
            CreatedAt = now
        };
        context.Organizations.Add(organization);

        // ============================================
        // Roles
        // ============================================
        var adminRoleId = Guid.Parse("00000000-0000-0000-0000-000000000010");
        var managerRoleId = Guid.Parse("00000000-0000-0000-0000-000000000011");
        var residentRoleId = Guid.Parse("00000000-0000-0000-0000-000000000012");

        context.Roles.AddRange(
            new Role { Id = adminRoleId, Name = "Administrator", Description = "Full system access", IsActive = true, CreatedAt = now },
            new Role { Id = managerRoleId, Name = "Manager", Description = "Condominium management access", IsActive = true, CreatedAt = now },
            new Role { Id = residentRoleId, Name = "Resident", Description = "Basic resident access", IsActive = true, CreatedAt = now }
        );

        // ============================================
        // Users
        // ============================================
        var adminUserId = Guid.Parse("00000000-0000-0000-0000-000000000020");
        var managerUserId = Guid.Parse("00000000-0000-0000-0000-000000000021");

        var adminUser = new User
        {
            Id = adminUserId,
            OrganizationId = orgId,
            Email = "admin@odara.pt",
            Name = "Administrador Sistema",
            PasswordHash = BCryptHash("admin123"), // Demo password
            IsActive = true,
            CreatedAt = now
        };
        context.Users.Add(adminUser);

        var managerUser = new User
        {
            Id = managerUserId,
            OrganizationId = orgId,
            Email = "gestor@odara.pt",
            Name = "Pedro Mendes",
            PasswordHash = BCryptHash("gestor123"),
            IsActive = true,
            CreatedAt = now
        };
        context.Users.Add(managerUser);

        // User Roles
        context.UserRoleAssignments.AddRange(
            new UserRoleAssignment { Id = Guid.NewGuid(), UserId = adminUserId, RoleId = adminRoleId, AssignedAt = now },
            new UserRoleAssignment { Id = Guid.NewGuid(), UserId = managerUserId, RoleId = managerRoleId, AssignedAt = now }
        );

        // ============================================
        // Condominiums
        // ============================================
        var condominiums = new List<Condominium>
        {
            new Condominium
            {
                Id = Guid.Parse("00000000-0000-0000-0001-000000000001"),
                OrganizationId = orgId,
                Name = "Condomínio Parque das Flores",
                FractionCount = 24,
                ElevatorCount = 1,
                IsActive = true,
                CreatedAt = now.AddDays(-365)
            },
            new Condominium
            {
                Id = Guid.Parse("00000000-0000-0000-0001-000000000002"),
                OrganizationId = orgId,
                Name = "Condomínio Vista Mar",
                FractionCount = 32,
                ElevatorCount = 2,
                IsActive = true,
                CreatedAt = now.AddDays(-300)
            },
            new Condominium
            {
                Id = Guid.Parse("00000000-0000-0000-0001-000000000003"),
                OrganizationId = orgId,
                Name = "Prédio Central",
                FractionCount = 16,
                ElevatorCount = 0,
                IsActive = true,
                CreatedAt = now.AddDays(-200)
            },
            new Condominium
            {
                Id = Guid.Parse("00000000-0000-0000-0001-000000000004"),
                OrganizationId = orgId,
                Name = "Residencial Soleil",
                FractionCount = 48,
                ElevatorCount = 3,
                IsActive = true,
                CreatedAt = now.AddDays(-150)
            },
            new Condominium
            {
                Id = Guid.Parse("00000000-0000-0000-0001-000000000005"),
                OrganizationId = orgId,
                Name = "Solar Dourado",
                FractionCount = 28,
                ElevatorCount = 2,
                IsActive = true,
                CreatedAt = now.AddDays(-100)
            }
        };
        context.Condominiums.AddRange(condominiums);

        // Condominium Addresses
        context.CondominiumAddresses.AddRange(
            new CondominiumAddress { Id = Guid.NewGuid(), CondominiumId = condominiums[0].Id, Street = "Rua das Flores", Number = "123", PostalCode = "1000-100", City = "Lisboa", Country = "Portugal" },
            new CondominiumAddress { Id = Guid.NewGuid(), CondominiumId = condominiums[1].Id, Street = "Av. Marginal", Number = "456", PostalCode = "2750-000", City = "Cascais", Country = "Portugal" },
            new CondominiumAddress { Id = Guid.NewGuid(), CondominiumId = condominiums[2].Id, Street = "Rua Principal", Number = "78", PostalCode = "4000-000", City = "Porto", Country = "Portugal" },
            new CondominiumAddress { Id = Guid.NewGuid(), CondominiumId = condominiums[3].Id, Street = "Rua do Sol", Number = "200", PostalCode = "8000-000", City = "Faro", Country = "Portugal" },
            new CondominiumAddress { Id = Guid.NewGuid(), CondominiumId = condominiums[4].Id, Street = "Av. dos Oceanos", Number = "50", PostalCode = "1400-000", City = "Lisboa", Country = "Portugal" }
        );

        // ============================================
        // Assemblies
        // ============================================
        var assemblies = new List<Assembly>
        {
            new Assembly
            {
                Id = Guid.Parse("00000000-0000-0000-0002-000000000001"),
                CondominiumId = condominiums[0].Id,
                Title = "Assembleia Ordinária 2024",
                AssemblyDate = now.AddDays(-30),
                Type = AssemblyType.Ordinary,
                Status = AssemblyStatus.Completed,
                Minutes = "Ata aprovada por unanimidade. Deliberações tomadas conforme described...",
                CreatedAt = now.AddDays(-60)
            },
            new Assembly
            {
                Id = Guid.Parse("00000000-0000-0000-0002-000000000002"),
                CondominiumId = condominiums[1].Id,
                Title = "Assembleia Extraordinária - Elevadores",
                AssemblyDate = now.AddDays(-20),
                Type = AssemblyType.Extraordinary,
                Status = AssemblyStatus.Completed,
                CreatedAt = now.AddDays(-40)
            },
            new Assembly
            {
                Id = Guid.Parse("00000000-0000-0000-0002-000000000003"),
                CondominiumId = condominiums[3].Id,
                Title = "Assembleia Ordinária 1º Trimestre",
                AssemblyDate = now.AddDays(7),
                Type = AssemblyType.Ordinary,
                Status = AssemblyStatus.Scheduled,
                CreatedAt = now.AddDays(-10)
            },
            new Assembly
            {
                Id = Guid.Parse("00000000-0000-0000-0002-000000000004"),
                CondominiumId = condominiums[0].Id,
                Title = "Assembleia Ordinária 2025",
                AssemblyDate = now.AddDays(-5),
                Type = AssemblyType.Ordinary,
                Status = AssemblyStatus.Completed,
                CreatedAt = now.AddDays(-30)
            }
        };
        context.Assemblies.AddRange(assemblies);

        // Assembly Decisions
        context.AssemblyDecisions.AddRange(
            new AssemblyDecision { Id = Guid.NewGuid(), AssemblyId = assemblies[0].Id, Description = "Aprovação de substituição das portas de entrada", Approved = true, VotesFor = 22, VotesAgainst = 2, Abstentions = 0, CreatedAt = assemblies[0].CreatedAt },
            new AssemblyDecision { Id = Guid.NewGuid(), AssemblyId = assemblies[0].Id, Description = "Contratação de novo serviço de limpeza", Approved = true, VotesFor = 24, VotesAgainst = 0, Abstentions = 0, CreatedAt = assemblies[0].CreatedAt },
            new AssemblyDecision { Id = Guid.NewGuid(), AssemblyId = assemblies[1].Id, Description = "Reparação do elevador do bloco B", Approved = true, VotesFor = 30, VotesAgainst = 2, Abstentions = 0, CreatedAt = assemblies[1].CreatedAt }
        );

        // ============================================
        // Operational Objectives
        // ============================================
        var objectives = new List<OperationalObjective>
        {
            new OperationalObjective
            {
                Id = Guid.Parse("00000000-0000-0000-0003-000000000001"),
                CondominiumId = condominiums[0].Id,
                AssemblyId = assemblies[0].Id,
                Title = "Substituição portas de entrada",
                Description = "Substituir 24 portas de entrada do prédio por novas portas de segurança",
                Priority = ObjectivePriority.High,
                Status = ObjectiveStatus.InProgress,
                Progress = 60,
                IsPublic = true,
                OwnerId = managerUserId,
                TargetDate = now.AddDays(30),
                CreatedAt = now.AddDays(-30),
                UpdatedAt = now.AddDays(-2)
            },
            new OperationalObjective
            {
                Id = Guid.Parse("00000000-0000-0000-0003-000000000002"),
                CondominiumId = condominiums[1].Id,
                AssemblyId = assemblies[1].Id,
                Title = "Reparação elevador bloco B",
                Description = "Reparação urgente do elevador do bloco B",
                Priority = ObjectivePriority.Critical,
                Status = ObjectiveStatus.Blocked,
                Progress = 20,
                IsPublic = true,
                OwnerId = managerUserId,
                TargetDate = now.AddDays(-5),
                CreatedAt = now.AddDays(-20),
                UpdatedAt = now.AddDays(-10)
            },
            new OperationalObjective
            {
                Id = Guid.Parse("00000000-0000-0000-0003-000000000003"),
                CondominiumId = condominiums[2].Id,
                Title = "Pintura hall de entrada",
                Description = "Renovar pintura do hall de entrada e corredores",
                Priority = ObjectivePriority.Medium,
                Status = ObjectiveStatus.Completed,
                Progress = 100,
                IsPublic = true,
                OwnerId = managerUserId,
                TargetDate = now.AddDays(-10),
                CompletedAt = now.AddDays(-8),
                CreatedAt = now.AddDays(-60),
                UpdatedAt = now.AddDays(-8)
            },
            new OperationalObjective
            {
                Id = Guid.Parse("00000000-0000-0000-0003-000000000004"),
                CondominiumId = condominiums[3].Id,
                Title = "Instalação câmaras segurança",
                Description = "Instalar sistema de CCTV no rés-do-chão e garagem",
                Priority = ObjectivePriority.Medium,
                Status = ObjectiveStatus.Planned,
                Progress = 0,
                IsPublic = true,
                OwnerId = managerUserId,
                TargetDate = now.AddDays(60),
                CreatedAt = now.AddDays(-5)
            },
            new OperationalObjective
            {
                Id = Guid.Parse("00000000-0000-0000-0003-000000000005"),
                CondominiumId = condominiums[0].Id,
                Title = "Limpeza fachadas",
                Description = "Contratar serviço profissional de limpeza de fachadas",
                Priority = ObjectivePriority.Low,
                Status = ObjectiveStatus.Draft,
                Progress = 0,
                IsPublic = true,
                CreatedAt = now.AddDays(-1)
            },
            new OperationalObjective
            {
                Id = Guid.Parse("00000000-0000-0000-0003-000000000006"),
                CondominiumId = condominiums[4].Id,
                Title = "Manutenção piscina",
                Description = "Contratar serviço de manutenção da piscina",
                Priority = ObjectivePriority.High,
                Status = ObjectiveStatus.WaitingExternal,
                Progress = 30,
                IsPublic = true,
                TargetDate = now.AddDays(45),
                CreatedAt = now.AddDays(-15)
            }
        };
        context.OperationalObjectives.AddRange(objectives);

        // Objective Updates
        context.ObjectiveUpdates.AddRange(
            new ObjectiveUpdate { Id = Guid.NewGuid(), ObjectiveId = objectives[0].Id, Content = "Iniciadas medições para encomenda de portas", PreviousProgress = 0, NewProgress = 10, CreatedAt = now.AddDays(-25) },
            new ObjectiveUpdate { Id = Guid.NewGuid(), ObjectiveId = objectives[0].Id, Content = "Encomenda realizada - prazo 3 semanas", PreviousProgress = 10, NewProgress = 30, CreatedAt = now.AddDays(-15) },
            new ObjectiveUpdate { Id = Guid.NewGuid(), ObjectiveId = objectives[0].Id, Content = "Pintores iniciaram trabalhos de preparação", PreviousProgress = 30, NewProgress = 50, CreatedAt = now.AddDays(-5) },
            new ObjectiveUpdate { Id = Guid.NewGuid(), ObjectiveId = objectives[0].Id, Content = "Portas instaladas no rés-do-chão", PreviousProgress = 50, NewProgress = 60, CreatedAt = now.AddDays(-2) }
        );

        // ============================================
        // Suppliers
        // ============================================
        var suppliers = new List<Supplier>
        {
            new Supplier { Id = Guid.Parse("00000000-0000-0000-0004-000000000001"), OrganizationId = orgId, Name = "Limpezas Total, Lda", TaxId = "PT987654321", Status = SupplierStatus.Active, CreatedAt = now.AddDays(-200) },
            new Supplier { Id = Guid.Parse("00000000-0000-0000-0004-000000000002"), OrganizationId = orgId, Name = "Elevadores Portugal", TaxId = "PT111222333", Status = SupplierStatus.Active, CreatedAt = now.AddDays(-180) },
            new Supplier { Id = Guid.Parse("00000000-0000-0000-0004-000000000003"), OrganizationId = orgId, Name = "Pinturas Silva & Filhos", TaxId = "PT444555666", Status = SupplierStatus.Active, CreatedAt = now.AddDays(-150) },
            new Supplier { Id = Guid.Parse("00000000-0000-0000-0004-000000000004"), OrganizationId = orgId, Name = "Segurança 24h", TaxId = "PT777888999", Status = SupplierStatus.Active, CreatedAt = now.AddDays(-120) },
            new Supplier { Id = Guid.Parse("00000000-0000-0000-0004-000000000005"), OrganizationId = orgId, Name = "Climatização Norte", TaxId = "PT123123123", Status = SupplierStatus.Active, CreatedAt = now.AddDays(-100) }
        };
        context.Suppliers.AddRange(suppliers);

        // Supplier Contacts
        context.SupplierContacts.AddRange(
            new SupplierContact { Id = Guid.NewGuid(), SupplierId = suppliers[0].Id, Name = "João Santos", Email = "joao@limpezastotal.pt", Phone = "+351 912 345 678", IsPrimary = true },
            new SupplierContact { Id = Guid.NewGuid(), SupplierId = suppliers[1].Id, Name = "Maria Costa", Email = "contacto@elevadores.pt", Phone = "+351 933 456 789", IsPrimary = true },
            new SupplierContact { Id = Guid.NewGuid(), SupplierId = suppliers[2].Id, Name = "António Silva", Email = "silva.pinturas@mail.pt", Phone = "+351 926 789 012", IsPrimary = true }
        );

        // ============================================
        // Assets
        // ============================================
        var assets = new List<Asset>
        {
            new Asset { Id = Guid.Parse("00000000-0000-0000-0005-000000000001"), CondominiumId = condominiums[0].Id, Name = "Elevador Principal", Category = "Elevadores", Status = AssetStatus.Operational, Condition = AssetCondition.Good, SerialNumber = "EL-2020-001", Location = "Corpo central", CreatedAt = now.AddDays(-365) },
            new Asset { Id = Guid.Parse("00000000-0000-0000-0005-000000000002"), CondominiumId = condominiums[1].Id, Name = "Elevador Bloco A", Category = "Elevadores", Status = AssetStatus.Operational, Condition = AssetCondition.Good, SerialNumber = "EL-2019-005", Location = "Bloco A", CreatedAt = now.AddDays(-300) },
            new Asset { Id = Guid.Parse("00000000-0000-0000-0005-000000000003"), CondominiumId = condominiums[1].Id, Name = "Elevador Bloco B", Category = "Elevadores", Status = AssetStatus.UnderMaintenance, Condition = AssetCondition.NeedsAttention, SerialNumber = "EL-2019-006", Location = "Bloco B", CreatedAt = now.AddDays(-300) },
            new Asset { Id = Guid.Parse("00000000-0000-0000-0005-000000000004"), CondominiumId = condominiums[3].Id, Name = "Piscina", Category = "Áreas Comuns", Status = AssetStatus.Operational, Condition = AssetCondition.Good, SerialNumber = "PISC-2021-001", Location = "Jardim", CreatedAt = now.AddDays(-150) },
            new Asset { Id = Guid.Parse("00000000-0000-0000-0005-000000000005"), CondominiumId = condominiums[4].Id, Name = "Portão Garagem", Category = "Segurança", Status = AssetStatus.NeedsRepair, Condition = AssetCondition.NeedsAttention, SerialNumber = "PORT-2018-003", Location = "Garagem", CreatedAt = now.AddDays(-100) }
        };
        context.Assets.AddRange(assets);

        // Maintenance Events
        context.MaintenanceEvents.AddRange(
            new MaintenanceEvent { Id = Guid.NewGuid(), AssetId = assets[0].Id, Title = "Revisão anual elevador", Type = MaintenanceEventType.Preventive, Status = MaintenanceEventStatus.Scheduled, ScheduledDate = now.AddDays(15), Cost = 500m, CreatedAt = now.AddDays(-5) },
            new MaintenanceEvent { Id = Guid.NewGuid(), AssetId = assets[2].Id, Title = "Reparação elevador bloco B", Type = MaintenanceEventType.Corrective, Status = MaintenanceEventStatus.Overdue, ScheduledDate = now.AddDays(-10), CreatedAt = now.AddDays(-15) },
            new MaintenanceEvent { Id = Guid.NewGuid(), AssetId = assets[3].Id, Title = "Limpeza trimestral piscina", Type = MaintenanceEventType.Preventive, Status = MaintenanceEventStatus.Due, ScheduledDate = now.AddDays(-3), CreatedAt = now.AddDays(-30) },
            new MaintenanceEvent { Id = Guid.NewGuid(), AssetId = assets[4].Id, Title = "Substituição motor portão", Type = MaintenanceEventType.Corrective, Status = MaintenanceEventStatus.Scheduled, ScheduledDate = now.AddDays(7), Cost = 350m, CreatedAt = now.AddDays(-2) }
        );

        // ============================================
        // Portals
        // ============================================
        context.Portals.AddRange(
            new Portal { Id = Guid.NewGuid(), CondominiumId = condominiums[0].Id, Title = "Portal Parque das Flores", IsPublished = true, CreatedAt = now.AddDays(-100) },
            new Portal { Id = Guid.NewGuid(), CondominiumId = condominiums[1].Id, Title = "Portal Vista Mar", IsPublished = true, CreatedAt = now.AddDays(-90) }
        );

        // ============================================
        // Audit Logs
        // ============================================
        context.AuditLogs.AddRange(
            new AuditLog { Id = Guid.NewGuid(), EntityType = "Condominium", EntityId = condominiums[0].Id, Action = "Create", PerformedBy = adminUserId, PerformedAt = condominiums[0].CreatedAt, Details = "Condomínio criado no sistema" },
            new AuditLog { Id = Guid.NewGuid(), EntityType = "Objective", EntityId = objectives[0].Id, Action = "Update", PerformedBy = managerUserId, PerformedAt = now.AddDays(-2), Details = "Progresso atualizado para 60%" }
        );

        await context.SaveChangesAsync();
    }

    // Simple BCrypt-like hash (for demo purposes)
    private static string BCryptHash(string password)
    {
        // In production, use proper BCrypt
        return $"HASH_{password.ToUpperInvariant()}";
    }
}
