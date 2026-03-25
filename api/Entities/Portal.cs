namespace Odara.Api.Entities;

public class ResidentUser
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public Guid? FractionId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? PasswordHash { get; set; }
    public ResidentAccessLevel AccessLevel { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
    public Fraction? Fraction { get; set; }
    public ICollection<ResidentAccessGrant> AccessGrants { get; set; } = new List<ResidentAccessGrant>();
    public ICollection<ResidentNotification> Notifications { get; set; } = new List<ResidentNotification>();
}

public class ResidentAccessGrant
{
    public Guid Id { get; set; }
    public Guid ResidentUserId { get; set; }
    public AccessGrantType Type { get; set; }
    public Guid? EntityId { get; set; } // ObjectiveId, DocumentId, etc.
    public bool CanView { get; set; } = true;
    public bool CanDownload { get; set; }
    public DateTime GrantedAt { get; set; }
    public Guid GrantedBy { get; set; }

    // Navigation
    public ResidentUser ResidentUser { get; set; } = null!;
}

public class PublishedUpdate
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public string EntityType { get; set; } = string.Empty; // "Objective", "Decision", etc.
    public Guid EntityId { get; set; }
    public string Summary { get; set; } = string.Empty;
    public string? Content { get; set; }
    public bool IsPublic { get; set; } = true;
    public DateTime PublishedAt { get; set; }
    public Guid PublishedBy { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
}

public class PublishedDocument
{
    public Guid Id { get; set; }
    public Guid PublishedUpdateId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string? ContentType { get; set; }
    public long FileSize { get; set; }
    public DateTime UploadedAt { get; set; }

    // Navigation
    public PublishedUpdate PublishedUpdate { get; set; } = null!;
}

public class ResidentNotification
{
    public Guid Id { get; set; }
    public Guid ResidentUserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Message { get; set; }
    public NotificationType Type { get; set; }
    public string? Link { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ReadAt { get; set; }

    // Navigation
    public ResidentUser ResidentUser { get; set; } = null!;
}

public enum ResidentAccessLevel
{
    Admin,      // Can see all
    Resident    // Can see public info
}

public enum AccessGrantType
{
    Objective,
    Document,
    Maintenance,
    Assembly,
    Proposal
}

public enum NotificationType
{
    Info,
    ObjectiveUpdate,
    DocumentAvailable,
    Meeting,
    Reminder,
    Alert
}
