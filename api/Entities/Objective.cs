namespace Odara.Api.Entities;

public class OperationalObjective
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public Guid? AssemblyId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ObjectiveStatus Status { get; set; }
    public ObjectivePriority Priority { get; set; }
    public Guid? OwnerId { get; set; }
    public DateTime? TargetDate { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int Progress { get; set; }
    public string? NextAction { get; set; }
    public bool IsPublic { get; set; } // Visible to condóminos
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
    public Assembly? Assembly { get; set; }
    public User? Owner { get; set; }
    public ICollection<ObjectiveUpdate> Updates { get; set; } = new List<ObjectiveUpdate>();
    public ICollection<ObjectiveTask> Tasks { get; set; } = new List<ObjectiveTask>();
    public ICollection<ObjectiveAttachment> Attachments { get; set; } = new List<ObjectiveAttachment>();
    public ICollection<ObjectiveComment> Comments { get; set; } = new List<ObjectiveComment>();
    public ICollection<RfpRequest> RfpRequests { get; set; } = new List<RfpRequest>();
}

public class ObjectiveUpdate
{
    public Guid Id { get; set; }
    public Guid ObjectiveId { get; set; }
    public string Content { get; set; } = string.Empty;
    public int? PreviousProgress { get; set; }
    public int? NewProgress { get; set; }
    public ObjectiveStatus? PreviousStatus { get; set; }
    public ObjectiveStatus? NewStatus { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public OperationalObjective Objective { get; set; } = null!;
}

public class ObjectiveTask
{
    public Guid Id { get; set; }
    public Guid ObjectiveId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TaskStatus Status { get; set; }
    public Guid? AssignedToId { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public OperationalObjective Objective { get; set; } = null!;
    public User? AssignedTo { get; set; }
}

public class ObjectiveAttachment
{
    public Guid Id { get; set; }
    public Guid ObjectiveId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string? ContentType { get; set; }
    public long FileSize { get; set; }
    public string? Description { get; set; }
    public DateTime UploadedAt { get; set; }
    public Guid UploadedBy { get; set; }

    // Navigation
    public OperationalObjective Objective { get; set; } = null!;
}

public class ObjectiveComment
{
    public Guid Id { get; set; }
    public Guid ObjectiveId { get; set; }
    public Guid? UserId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public OperationalObjective Objective { get; set; } = null!;
    public User? User { get; set; }
}

public enum ObjectiveStatus
{
    Draft,
    Planned,
    InProgress,
    WaitingExternal,
    Blocked,
    Completed,
    Cancelled
}

public enum ObjectivePriority
{
    Low,
    Medium,
    High,
    Critical
}

public enum TaskStatus
{
    Todo,
    Doing,
    Done,
    Cancelled
}
