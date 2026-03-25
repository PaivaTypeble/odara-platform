namespace Odara.Api.Entities;

public class ServiceCategory
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public ICollection<Supplier> Suppliers { get; set; } = new List<Supplier>();
}

public class Supplier
{
    public Guid Id { get; set; }
    public Guid? ServiceCategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? TaxId { get; set; }
    public string? Address { get; set; }
    public string? Website { get; set; }
    public string? Notes { get; set; }
    public SupplierStatus Status { get; set; }
    public decimal? Rating { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public ServiceCategory? ServiceCategory { get; set; }
    public ICollection<SupplierContact> Contacts { get; set; } = new List<SupplierContact>();
    public ICollection<RfpRecipient> RfpRecipients { get; set; } = new List<RfpRecipient>();
    public ICollection<SupplierProposal> Proposals { get; set; } = new List<SupplierProposal>();
}

public class SupplierContact
{
    public Guid Id { get; set; }
    public Guid SupplierId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Role { get; set; }
    public bool IsPrimary { get; set; }

    // Navigation
    public Supplier Supplier { get; set; } = null!;
}

public class RfpRequest
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public Guid? ObjectiveId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public RfpStatus Status { get; set; }
    public DateTime? Deadline { get; set; }
    public DateTime? SentAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
    public OperationalObjective? Objective { get; set; }
    public ICollection<RfpScope> Scopes { get; set; } = new List<RfpScope>();
    public ICollection<RfpRecipient> Recipients { get; set; } = new List<RfpRecipient>();
}

public class RfpScope
{
    public Guid Id { get; set; }
    public Guid RfpRequestId { get; set; }
    public string Item { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }

    // Navigation
    public RfpRequest RfpRequest { get; set; } = null!;
}

public class RfpRecipient
{
    public Guid Id { get; set; }
    public Guid RfpRequestId { get; set; }
    public Guid SupplierId { get; set; }
    public RfpRecipientStatus Status { get; set; }
    public DateTime? InvitedAt { get; set; }
    public DateTime? RespondedAt { get; set; }

    // Navigation
    public RfpRequest RfpRequest { get; set; } = null!;
    public Supplier Supplier { get; set; } = null!;
}

public class SupplierProposal
{
    public Guid Id { get; set; }
    public Guid RfpRequestId { get; set; }
    public Guid SupplierId { get; set; }
    public decimal? Price { get; set; }
    public string? Currency { get; set; } = "EUR";
    public int? ValidityDays { get; set; }
    public int? DeliveryDays { get; set; }
    public string? ScopeNotes { get; set; }
    public string? Exclusions { get; set; }
    public string? Terms { get; set; }
    public string? Recommendation { get; set; }
    public ProposalStatus Status { get; set; }
    public DateTime ReceivedAt { get; set; }
    public string? AttachmentPath { get; set; }

    // Navigation
    public RfpRequest RfpRequest { get; set; } = null!;
    public Supplier Supplier { get; set; } = null!;
}

public class ProposalComparison
{
    public Guid Id { get; set; }
    public Guid RfpRequestId { get; set; }
    public Guid? RecommendedProposalId { get; set; }
    public string? Summary { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid CreatedBy { get; set; }

    // Navigation
    public RfpRequest RfpRequest { get; set; } = null!;
}

public class ProposalDecision
{
    public Guid Id { get; set; }
    public Guid RfpRequestId { get; set; }
    public Guid? SelectedProposalId { get; set; }
    public string? Justification { get; set; }
    public DateTime DecidedAt { get; set; }
    public Guid DecidedBy { get; set; }

    // Navigation
    public RfpRequest RfpRequest { get; set; } = null!;
}

public enum RfpStatus
{
    Draft,
    Sent,
    PartiallyReceived,
    Received,
    Compared,
    Decided,
    Cancelled
}

public enum RfpRecipientStatus
{
    Invited,
    Opened,
    Responded,
    NotResponded,
    Declined
}

public enum ProposalStatus
{
    Received,
    UnderReview,
    Accepted,
    Rejected,
    Superseded
}

public enum SupplierStatus
{
    Active,
    Inactive,
    Blacklisted
}
