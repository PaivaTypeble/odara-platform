using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Odara.Api.Data;
using Odara.Api.DTOs;
using Odara.Api.Entities;

namespace Odara.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DashboardController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async<ActionResult<DashboardStats>> GetStats()
    {
        var now = DateTime.UtcNow;

        var totalCondominiums = await _context.Condominiums.CountAsync(c => c.IsActive);
        var activeObjectives = await _context.OperationalObjectives
            .CountAsync(o => o.Status != ObjectiveStatus.Completed && o.Status != ObjectiveStatus.Cancelled);
        var overdueObjectives = await _context.OperationalObjectives
            .CountAsync(o => o.Status != ObjectiveStatus.Completed && 
                             o.Status != ObjectiveStatus.Cancelled &&
                             o.TargetDate.HasValue && 
                             o.TargetDate.Value < now);
        var blockedObjectives = await _context.OperationalObjectives
            .CountAsync(o => o.Status == ObjectiveStatus.Blocked);
        var openRFPs = await _context.RfpRequests
            .CountAsync(r => r.Status != RfpStatus.Decided && r.Status != RfpStatus.Cancelled);
        var pendingProposals = await _context.RfpRecipients
            .CountAsync(r => r.Status == RfpRecipientStatus.Invited || r.Status == RfpRecipientStatus.Opened);
        var maintenanceDue = await _context.MaintenanceEvents
            .CountAsync(e => e.Status == MaintenanceEventStatus.Scheduled || e.Status == MaintenanceEventStatus.Due);
        var maintenanceOverdue = await _context.MaintenanceEvents
            .CountAsync(e => e.Status == MaintenanceEventStatus.Overdue);

        var stats = new DashboardStats(
            totalCondominiums,
            activeObjectives,
            overdueObjectives,
            blockedObjectives,
            openRFPs,
            pendingProposals,
            maintenanceDue,
            maintenanceOverdue
        );

        return Ok(stats);
    }

    [HttpGet("recent-activity")]
    public async<ActionResult> GetRecentActivity([FromQuery] int limit = 10)
    {
        var activities = new List<object>();

        // Recent objectives
        var recentObjectives = await _context.OperationalObjectives
            .Include(o => o.Condominium)
            .Include(o => o.Updates.OrderByDescending(u => u.CreatedAt))
            .OrderByDescending(o => o.UpdatedAt ?? o.CreatedAt)
            .Take(limit)
            .ToListAsync();

        foreach (var obj in recentObjectives)
        {
            activities.Add(new
            {
                Type = "objective",
                Id = obj.Id,
                Title = obj.Title,
                Status = obj.Status.ToString(),
                Condominium = obj.Condominium.Name,
                UpdatedAt = obj.UpdatedAt ?? obj.CreatedAt
            });
        }

        // Recent assemblies
        var recentAssemblies = await _context.Assemblies
            .Include(a => a.Condominium)
            .OrderByDescending(a => a.CreatedAt)
            .Take(5)
            .ToListAsync();

        foreach (var assembly in recentAssemblies)
        {
            activities.Add(new
            {
                Type = "assembly",
                Id = assembly.Id,
                Title = assembly.Title,
                Status = assembly.Status.ToString(),
                Condominium = assembly.Condominium.Name,
                UpdatedAt = assembly.CreatedAt
            });
        }

        // Recent maintenance events
        var recentMaintenance = await _context.MaintenanceEvents
            .Include(e => e.Asset)
                .ThenInclude(a => a!.Condominium)
            .OrderByDescending(e => e.CreatedAt)
            .Take(5)
            .ToListAsync();

        foreach (var evt in recentMaintenance)
        {
            activities.Add(new
            {
                Type = "maintenance",
                Id = evt.Id,
                Title = evt.Title,
                Status = evt.Status.ToString(),
                Condominium = evt.Asset?.Condominium?.Name ?? "N/A",
                UpdatedAt = evt.CreatedAt
            });
        }

        return Ok(activities.OrderByDescending(a => ((dynamic)a).UpdatedAt).Take(limit));
    }

    [HttpGet("objectives-by-status")]
    public async<ActionResult> GetObjectivesByStatus()
    {
        var stats = await _context.OperationalObjectives
            .GroupBy(o => o.Status)
            .Select(g => new { Status = g.Key.ToString(), Count = g.Count() })
            .ToListAsync();

        return Ok(stats);
    }

    [HttpGet("objectives-by-condominium")]
    public async<ActionResult> GetObjectivesByCondominium()
    {
        var stats = await _context.OperationalObjectives
            .Include(o => o.Condominium)
            .Where(o => o.Status != ObjectiveStatus.Completed && o.Status != ObjectiveStatus.Cancelled)
            .GroupBy(o => o.Condominium.Name)
            .Select(g => new { Condominium = g.Key, Count = g.Count() })
            .ToListAsync();

        return Ok(stats);
    }
}
