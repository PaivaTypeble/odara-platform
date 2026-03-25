using System.ComponentModel.DataAnnotations;

namespace Odara.Api.DTOs;

// Condominium DTOs
public record CondominiumDto(
    Guid Id,
    string Name,
    int FractionCount,
    int ElevatorCount,
    bool IsActive,
    string? Address,
    string? City,
    DateTime CreatedAt
);

public record CreateCondominiumRequest(
    [Required] string Name,
    int FractionCount,
    int ElevatorCount,
    AddressDto? Address
);

public record UpdateCondominiumRequest(
    string? Name,
    int? FractionCount,
    int? ElevatorCount,
    bool? IsActive,
    AddressDto? Address
);

public record AddressDto(
    string Street,
    string? Number,
    string? PostalCode,
    string City,
    string? District,
    string? Country
);

// User DTOs
public record UserDto(
    Guid Id,
    string Email,
    string Name,
    bool IsActive,
    string? Role,
    DateTime CreatedAt
);

public record CreateUserRequest(
    [Required][EmailAddress] string Email,
    [Required] string Name,
    string? Password
);

public record LoginRequest(
    [Required][EmailAddress] string Email,
    [Required] string Password
);

public record LoginResponse(
    string Token,
    UserDto User,
    DateTime ExpiresAt
);

// Objective DTOs
public record ObjectiveDto(
    Guid Id,
    string Title,
    string? Description,
    string Status,
    string Priority,
    string? OwnerName,
    DateTime? TargetDate,
    int Progress,
    string? NextAction,
    bool IsPublic,
    string? CondominiumName,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);

public record CreateObjectiveRequest(
    [Required] Guid CondominiumId,
    Guid? AssemblyId,
    [Required] string Title,
    string? Description,
    string Priority,
    Guid? OwnerId,
    DateTime? TargetDate
);

public record UpdateObjectiveRequest(
    string? Title,
    string? Description,
    string? Status,
    string? Priority,
    Guid? OwnerId,
    DateTime? TargetDate,
    int? Progress,
    string? NextAction,
    bool? IsPublic
);

public record ObjectiveUpdateDto(
    Guid Id,
    string Content,
    int? PreviousProgress,
    int? NewProgress,
    string? PreviousStatus,
    string? NewStatus,
    string CreatedByName,
    DateTime CreatedAt
);

public record CreateObjectiveUpdateRequest(
    [Required] string Content,
    int? NewProgress,
    string? NewStatus
);

// Assembly DTOs
public record AssemblyDto(
    Guid Id,
    string Title,
    DateTime AssemblyDate,
    string Type,
    string Status,
    string? CondominiumName,
    int DecisionCount,
    int ObjectiveCount,
    DateTime CreatedAt
);

public record CreateAssemblyRequest(
    [Required] Guid CondominiumId,
    [Required] string Title,
    DateTime AssemblyDate,
    string Type
);

public record DecisionDto(
    Guid Id,
    string Description,
    bool Approved,
    int VotesFor,
    int VotesAgainst,
    int Abstentions,
    DateTime CreatedAt
);

// Supplier DTOs
public record SupplierDto(
    Guid Id,
    string Name,
    string? CategoryName,
    string Status,
    decimal? Rating,
    string? PrimaryContact,
    int ProposalCount,
    DateTime CreatedAt
);

public record CreateSupplierRequest(
    [Required] string Name,
    Guid? ServiceCategoryId,
    string? TaxId,
    string? Address,
    string? Website
);

public record RfpRequestDto(
    Guid Id,
    string Title,
    string? Description,
    string Status,
    string? CondominiumName,
    DateTime? Deadline,
    int SuppliersInvited,
    int ProposalsReceived,
    DateTime CreatedAt
);

public record CreateRfpRequest(
    [Required] Guid CondominiumId,
    Guid? ObjectiveId,
    [Required] string Title,
    string? Description,
    DateTime? Deadline,
    List<string>? ScopeItems
);

// Asset DTOs
public record AssetDto(
    Guid Id,
    string Name,
    string? CategoryName,
    string Status,
    string Condition,
    string? CondominiumName,
    DateTime? LastMaintenance,
    DateTime? NextMaintenance,
    DateTime CreatedAt
);

public record CreateAssetRequest(
    [Required] Guid CondominiumId,
    Guid? CategoryId,
    [Required] string Name,
    string? Description,
    string? SerialNumber,
    string? Location
);

public record MaintenanceEventDto(
    Guid Id,
    string Title,
    string Type,
    string Status,
    string? AssetName,
    string? CondominiumName,
    DateTime? ScheduledDate,
    DateTime? CompletedDate,
    decimal? Cost,
    DateTime CreatedAt
);

// Dashboard DTOs
public record DashboardStats(
    int TotalCondominiums,
    int ActiveObjectives,
    int OverdueObjectives,
    int BlockedObjectives,
    int OpenRFPs,
    int PendingProposals,
    int MaintenanceDue,
    int MaintenanceOverdue
);
