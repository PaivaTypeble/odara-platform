namespace Odara.Api.Entities;

public class Assembly
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime AssemblyDate { get; set; }
    public AssemblyType Type { get; set; }
    public AssemblyStatus Status { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
    public ICollection<AssemblyDocument> Documents { get; set; } = new List<AssemblyDocument>();
    public ICollection<AssemblyAgendaItem> AgendaItems { get; set; } = new List<AssemblyAgendaItem>();
    public ICollection<AssemblyDecision> Decisions { get; set; } = new List<AssemblyDecision>();
    public ICollection<OperationalObjective> Objectives { get; set; } = new List<OperationalObjective>();
}

public class AssemblyDocument
{
    public Guid Id { get; set; }
    public Guid AssemblyId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string? ContentType { get; set; }
    public long FileSize { get; set; }
    public DateTime UploadedAt { get; set; }
    public Guid UploadedBy { get; set; }

    // Navigation
    public Assembly Assembly { get; set; } = null!;
}

public class AssemblyAgendaItem
{
    public Guid Id { get; set; }
    public Guid AssemblyId { get; set; }
    public int Order { get; set; }
    public string Topic { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool RequiresDecision { get; set; }

    // Navigation
    public Assembly Assembly { get; set; } = null!;
}

public class AssemblyDecision
{
    public Guid Id { get; set; }
    public Guid AssemblyId { get; set; }
    public Guid? AgendaItemId { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool Approved { get; set; }
    public int VotesFor { get; set; }
    public int VotesAgainst { get; set; }
    public int Abstentions { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Assembly Assembly { get; set; } = null!;
    public AssemblyAgendaItem? AgendaItem { get; set; }
}

public enum AssemblyType
{
    Ordinary,
    Extraordinary,
    Constitutive
}

public enum AssemblyStatus
{
    Draft,
    Scheduled,
    InProgress,
    Completed,
    Cancelled
}
