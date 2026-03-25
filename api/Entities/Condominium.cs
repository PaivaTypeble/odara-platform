namespace Odara.Api.Entities;

public class Condominium
{
    public Guid Id { get; set; }
    public Guid OrganizationId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int FractionCount { get; set; }
    public int ElevatorCount { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public Organization Organization { get; set; } = null!;
    public CondominiumAddress? Address { get; set; }
    public ICollection<Fraction> Fractions { get; set; } = new List<Fraction>();
    public ICollection<CondominiumAdminContact> AdminContacts { get; set; } = new List<CondominiumAdminContact>();
    public ICollection<CondominiumAssignment> Assignments { get; set; } = new List<CondominiumAssignment>();
    public ICollection<Assembly> Assemblies { get; set; } = new List<Assembly>();
    public ICollection<OperationalObjective> Objectives { get; set; } = new List<OperationalObjective>();
    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
}

public class CondominiumAddress
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public string Street { get; set; } = string.Empty;
    public string? Number { get; set; }
    public string? PostalCode { get; set; }
    public string City { get; set; } = string.Empty;
    public string? District { get; set; }
    public string? Country { get; set; } = "Portugal";

    // Navigation
    public Condominium Condominium { get; set; } = null!;
}

public class Fraction
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public string FractionNumber { get; set; } = string.Empty;
    public string? Floor { get; set; }
    public decimal? SharePercentage { get; set; }
    public string? OwnerName { get; set; }
    public string? OwnerEmail { get; set; }
    public string? OwnerPhone { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
}

public class CondominiumAdminContact
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Role { get; set; }
    public bool IsPrimary { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
}

public class CondominiumAssignment
{
    public Guid Id { get; set; }
    public Guid CondominiumId { get; set; }
    public Guid UserId { get; set; }
    public string Role { get; set; } = string.Empty; // "manager", "agent", etc.
    public DateTime AssignedAt { get; set; }

    // Navigation
    public Condominium Condominium { get; set; } = null!;
    public User User { get; set; } = null!;
}
