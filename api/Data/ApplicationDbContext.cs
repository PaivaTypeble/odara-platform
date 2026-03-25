using Microsoft.EntityFrameworkCore;
using Odara.Api.Entities;

namespace Odara.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Organization> Organizations => Set<Organization>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRoleAssignment> UserRoleAssignments => Set<UserRoleAssignment>();
    public DbSet<Invitation> Invitations => Set<Invitation>();

    public DbSet<Condominium> Condominiums => Set<Condominium>();
    public DbSet<CondominiumAddress> CondominiumAddresses => Set<CondominiumAddress>();
    public DbSet<Fraction> Fractions => Set<Fraction>();
    public DbSet<CondominiumAdminContact> CondominiumAdminContacts => Set<CondominiumAdminContact>();
    public DbSet<CondominiumAssignment> CondominiumAssignments => Set<CondominiumAssignment>();

    public DbSet<Assembly> Assemblies => Set<Assembly>();
    public DbSet<AssemblyDocument> AssemblyDocuments => Set<AssemblyDocument>();
    public DbSet<AssemblyAgendaItem> AssemblyAgendaItems => Set<AssemblyAgendaItem>();
    public DbSet<AssemblyDecision> AssemblyDecisions => Set<AssemblyDecision>();

    public DbSet<OperationalObjective> OperationalObjectives => Set<OperationalObjective>();
    public DbSet<ObjectiveUpdate> ObjectiveUpdates => Set<ObjectiveUpdate>();
    public DbSet<ObjectiveTask> ObjectiveTasks => Set<ObjectiveTask>();
    public DbSet<ObjectiveAttachment> ObjectiveAttachments => Set<ObjectiveAttachment>();
    public DbSet<ObjectiveComment> ObjectiveComments => Set<ObjectiveComment>();

    public DbSet<ServiceCategory> ServiceCategories => Set<ServiceCategory>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<SupplierContact> SupplierContacts => Set<SupplierContact>();
    public DbSet<RfpRequest> RfpRequests => Set<RfpRequest>();
    public DbSet<RfpScope> RfpScopes => Set<RfpScope>();
    public DbSet<RfpRecipient> RfpRecipients => Set<RfpRecipient>();
    public DbSet<SupplierProposal> SupplierProposals => Set<SupplierProposal>();
    public DbSet<ProposalComparison> ProposalComparisons => Set<ProposalComparison>();
    public DbSet<ProposalDecision> ProposalDecisions => Set<ProposalDecision>();

    public DbSet<ResidentUser> ResidentUsers => Set<ResidentUser>();
    public DbSet<ResidentAccessGrant> ResidentAccessGrants => Set<ResidentAccessGrant>();
    public DbSet<PublishedUpdate> PublishedUpdates => Set<PublishedUpdate>();
    public DbSet<PublishedDocument> PublishedDocuments => Set<PublishedDocument>();
    public DbSet<ResidentNotification> ResidentNotifications => Set<ResidentNotification>();

    public DbSet<Asset> Assets => Set<Asset>();
    public DbSet<AssetCategory> AssetCategories => Set<AssetCategory>();
    public DbSet<MaintenancePlan> MaintenancePlans => Set<MaintenancePlan>();
    public DbSet<MaintenanceEvent> MaintenanceEvents => Set<MaintenanceEvent>();
    public DbSet<MaintenanceDocument> MaintenanceDocuments => Set<MaintenanceDocument>();
    public DbSet<ComplianceAlert> ComplianceAlerts => Set<ComplianceAlert>();

    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Organization
        modelBuilder.Entity<Organization>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasOne(e => e.Organization)
                  .WithMany(o => o.Users)
                  .HasForeignKey(e => e.OrganizationId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Role
        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => e.Name).IsUnique();
        });

        // Condominium
        modelBuilder.Entity<Condominium>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.HasOne(e => e.Organization)
                  .WithMany(o => o.Condominiums)
                  .HasForeignKey(e => e.OrganizationId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Assembly
        modelBuilder.Entity<Assembly>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.HasOne(e => e.Condominium)
                  .WithMany(c => c.Assemblies)
                  .HasForeignKey(e => e.CondominiumId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // OperationalObjective
        modelBuilder.Entity<OperationalObjective>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.HasOne(e => e.Condominium)
                  .WithMany(c => c.Objectives)
                  .HasForeignKey(e => e.CondominiumId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Assembly)
                  .WithMany(a => a.Objectives)
                  .HasForeignKey(e => e.AssemblyId)
                  .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(e => e.Owner)
                  .WithMany()
                  .HasForeignKey(e => e.OwnerId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Supplier
        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.HasOne(e => e.ServiceCategory)
                  .WithMany(sc => sc.Suppliers)
                  .HasForeignKey(e => e.ServiceCategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // RFP Request
        modelBuilder.Entity<RfpRequest>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.HasOne(e => e.Condominium)
                  .WithMany()
                  .HasForeignKey(e => e.CondominiumId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Objective)
                  .WithMany(o => o.RfpRequests)
                  .HasForeignKey(e => e.ObjectiveId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Asset
        modelBuilder.Entity<Asset>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.HasOne(e => e.Condominium)
                  .WithMany(c => c.Assets)
                  .HasForeignKey(e => e.CondominiumId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Category)
                  .WithMany(c => c.Assets)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // AuditLog
        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.EntityType).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Action).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => new { e.EntityType, e.EntityId });
            entity.HasIndex(e => e.CreatedAt);
        });
    }
}
