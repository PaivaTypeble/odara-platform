namespace Odara.Api.Entities;

public class UserRoleAssignment
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }
    public Guid? CondominiumId { get; set; } // If null, applies to all condominiums
    public DateTime AssignedAt { get; set; }
    public Guid AssignedBy { get; set; }

    // Navigation
    public User User { get; set; } = null!;
    public Role Role { get; set; } = null!;
    public Condominium? Condominium { get; set; }
}
