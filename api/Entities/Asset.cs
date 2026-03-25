namespace Odara.Api.Entities;

public class Asset
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public Guid? CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? SerialNumber { get; set; }
    public string? Location { get; set; }
    public DateTime? InstallationDate { get; set; }
    public decimal? Value { get; set; }
    public AssetStatus Status { get; set; }
    public AssetCondition Condition { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
    public AssetCategory? Category { get; set; }
    public ICollection<MaintenancePlan> MaintenancePlans { get; set; } = new List<MaintenancePlan>();
    public ICollection<MaintenanceEvent> MaintenanceEvents { get; set; } = new List<MaintenanceEvent>();
}

public class AssetCategory
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Icon { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
}

public class MaintenancePlan
{
    public Guid Id { get; set; }
    public Guid AssetId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public MaintenanceFrequency Frequency { get; set; }
    public int IntervalDays { get; set; }
    public DateTime? LastPerformed { get; set; }
    public DateTime? NextDue { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Asset Asset { get; set; } = null!;
    public ICollection<MaintenanceEvent> Events { get; set; } = new List<MaintenanceEvent>();
}

public class MaintenanceEvent
{
    public Guid Id { get; set; }
    public Guid AssetId { get; set; }
    public Guid? MaintenancePlanId { get; set; }
    public MaintenanceEventType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public MaintenanceEventStatus Status { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public decimal? Cost { get; set; }
    public Guid? SupplierId { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public Asset Asset { get; set; } = null!;
    public MaintenancePlan? MaintenancePlan { get; set; }
    public Supplier? Supplier { get; set; }
    public ICollection<MaintenanceDocument> Documents { get; set; } = new List<MaintenanceDocument>();
}

public class MaintenanceDocument
{
    public Guid Id { get; set; }
    public Guid MaintenanceEventId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string? ContentType { get; set; }
    public long FileSize { get; set; }
    public DateTime UploadedAt { get; set; }
    public Guid UploadedBy { get; set; }

    // Navigation
    public MaintenanceEvent MaintenanceEvent { get; set; } = null!;
}

public class ComplianceAlert
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ComplianceAlertType Type { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
}

public enum AssetStatus
{
    Active,
    Inactive,
    Removed
}

public enum AssetCondition
{
    Good,
    Fair,
    Poor,
    Critical
}

public enum MaintenanceFrequency
{
    Weekly,
    Monthly,
    Quarterly,
    SemiAnnually,
    Annually,
    Biennially,
    Custom
}

public enum MaintenanceEventType
{
    Preventive,
    Corrective,
    Inspection,
    Certification,
    Emergency
}

public enum MaintenanceEventStatus
{
    Scheduled,
    Due,
    InProgress,
    Completed,
    Overdue,
    Cancelled
}

public enum ComplianceAlertType
{
    Inspection,
    Certification,
    Insurance,
    License,
    Other
}
