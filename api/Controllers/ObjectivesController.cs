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
public class ObjectivesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ObjectivesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async<ActionResult<IEnumerable<ObjectiveDto>>> GetAll(
        [FromQuery] Guid? condominiumId = null,
        [FromQuery] string? status = null,
        [FromQuery] string? search = null)
    {
        var query = _context.OperationalObjectives
            .Include(o => o.Condominium)
            .Include(o => o.Owner)
            .AsQueryable();

        if (condominiumId.HasValue)
        {
            query = query.Where(o => o.CondominiumId == condominiumId.Value);
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            if (Enum.TryParse<ObjectiveStatus>(status, true, out var statusEnum))
            {
                query = query.Where(o => o.Status == statusEnum);
            }
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();
            query = query.Where(o => 
                o.Title.ToLower().Contains(search) ||
                (o.Description != null && o.Description.ToLower().Contains(search)));
        }

        var objectives = await query
            .OrderByDescending(o => o.Priority)
            .ThenBy(o => o.TargetDate)
            .Select(o => new ObjectiveDto(
                o.Id,
                o.Title,
                o.Description,
                o.Status.ToString(),
                o.Priority.ToString(),
                o.Owner != null ? o.Owner.Name : null,
                o.TargetDate,
                o.Progress,
                o.NextAction,
                o.IsPublic,
                o.Condominium.Name,
                o.CreatedAt,
                o.UpdatedAt
            ))
            .ToListAsync();

        return Ok(objectives);
    }

    [HttpGet("{id:guid}")]
    public async<ActionResult<ObjectiveDto>> GetById(Guid id)
    {
        var objective = await _context.OperationalObjectives
            .Include(o => o.Condominium)
            .Include(o => o.Owner)
            .Include(o => o.Updates.OrderByDescending(u => u.CreatedAt))
            .Include(o => o.Tasks)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (objective == null)
        {
            return NotFound();
        }

        var dto = new ObjectiveDto(
            objective.Id,
            objective.Title,
            objective.Description,
            objective.Status.ToString(),
            objective.Priority.ToString(),
            objective.Owner?.Name,
            objective.TargetDate,
            objective.Progress,
            objective.NextAction,
            objective.IsPublic,
            objective.Condominium.Name,
            objective.CreatedAt,
            objective.UpdatedAt
        );

        return Ok(dto);
    }

    [HttpPost]
    public async<ActionResult<ObjectiveDto>> Create([FromBody] CreateObjectiveRequest request)
    {
        var objective = new OperationalObjective
        {
            Id = Guid.NewGuid(),
            CondominiumId = request.CondominiumId,
            AssemblyId = request.AssemblyId,
            Title = request.Title,
            Description = request.Description,
            Priority = Enum.Parse<ObjectivePriority>(request.Priority, true),
            OwnerId = request.OwnerId,
            TargetDate = request.TargetDate,
            Status = ObjectiveStatus.Draft,
            Progress = 0,
            CreatedAt = DateTime.UtcNow
        };

        _context.OperationalObjectives.Add(objective);
        await _context.SaveChangesAsync();

        var condominium = await _context.Condominiums.FindAsync(objective.CondominiumId);
        var owner = request.OwnerId.HasValue 
            ? await _context.Users.FindAsync(request.OwnerId.Value) 
            : null;

        var dto = new ObjectiveDto(
            objective.Id,
            objective.Title,
            objective.Description,
            objective.Status.ToString(),
            objective.Priority.ToString(),
            owner?.Name,
            objective.TargetDate,
            objective.Progress,
            objective.NextAction,
            objective.IsPublic,
            condominium?.Name ?? "",
            objective.CreatedAt,
            objective.UpdatedAt
        );

        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPut("{id:guid}")]
    public async<ActionResult<ObjectiveDto>> Update(Guid id, [FromBody] UpdateObjectiveRequest request)
    {
        var objective = await _context.OperationalObjectives
            .Include(o => o.Condominium)
            .Include(o => o.Owner)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (objective == null)
        {
            return NotFound();
        }

        if (request.Title != null)
            objective.Title = request.Title;
        if (request.Description != null)
            objective.Description = request.Description;
        if (request.Status != null && Enum.TryParse<ObjectiveStatus>(request.Status, true, out var status))
            objective.Status = status;
        if (request.Priority != null && Enum.TryParse<ObjectivePriority>(request.Priority, true, out var priority))
            objective.Priority = priority;
        if (request.OwnerId.HasValue)
            objective.OwnerId = request.OwnerId;
        if (request.TargetDate.HasValue)
            objective.TargetDate = request.TargetDate;
        if (request.Progress.HasValue)
            objective.Progress = request.Progress.Value;
        if (request.NextAction != null)
            objective.NextAction = request.NextAction;
        if (request.IsPublic.HasValue)
            objective.IsPublic = request.IsPublic.Value;

        if (objective.Status == ObjectiveStatus.Completed && objective.CompletedAt == null)
        {
            objective.CompletedAt = DateTime.UtcNow;
        }

        objective.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        var dto = new ObjectiveDto(
            objective.Id,
            objective.Title,
            objective.Description,
            objective.Status.ToString(),
            objective.Priority.ToString(),
            objective.Owner?.Name,
            objective.TargetDate,
            objective.Progress,
            objective.NextAction,
            objective.IsPublic,
            objective.Condominium.Name,
            objective.CreatedAt,
            objective.UpdatedAt
        );

        return Ok(dto);
    }

    [HttpPost("{id:guid}/updates")]
    public async<ActionResult<ObjectiveUpdateDto>> AddUpdate(Guid id, [FromBody] CreateObjectiveUpdateRequest request)
    {
        var objective = await _context.OperationalObjectives
            .Include(o => o.Owner)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (objective == null)
        {
            return NotFound();
        }

        var update = new ObjectiveUpdate
        {
            Id = Guid.NewGuid(),
            ObjectiveId = id,
            Content = request.Content,
            PreviousProgress = objective.Progress,
            PreviousStatus = objective.Status,
            CreatedAt = DateTime.UtcNow
        };

        if (request.NewProgress.HasValue)
        {
            update.NewProgress = request.NewProgress.Value;
            objective.Progress = request.NewProgress.Value;
        }

        if (request.NewStatus != null && Enum.TryParse<ObjectiveStatus>(request.NewStatus, true, out var newStatus))
        {
            update.NewStatus = newStatus;
            objective.Status = newStatus;
        }

        _context.ObjectiveUpdates.Add(update);
        await _context.SaveChangesAsync();

        var dto = new ObjectiveUpdateDto(
            update.Id,
            update.Content,
            update.PreviousProgress,
            update.NewProgress,
            update.PreviousStatus?.ToString(),
            update.NewStatus?.ToString(),
            "Sistema",
            update.CreatedAt
        );

        return CreatedAtAction(nameof(GetById), new { id }, dto);
    }

    [HttpDelete("{id:guid}")]
    public async<ActionResult> Delete(Guid id)
    {
        var objective = await _context.OperationalObjectives.FindAsync(id);
        if (objective == null)
        {
            return NotFound();
        }

        _context.OperationalObjectives.Remove(objective);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
