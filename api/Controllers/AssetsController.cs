using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Odara.Api.Data;
using Odara.Api.DTOs;
using Odara.Api.Entities;

namespace Odara.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssetsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AssetsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async<ActionResult<IEnumerable<AssetDto>>> GetAll([FromQuery] Guid? condominiumId = null)
    {
        var query = _context.Assets
            .Include(a => a.Condominium)
            .Include(a => a.MaintenanceEvents.OrderByDescending(m => m.ScheduledDate).Take(1))
            .AsQueryable();

        if (condominiumId.HasValue)
        {
            query = query.Where(a => a.CondominiumId == condominiumId.Value);
        }

        var assets = await query
            .OrderBy(a => a.Name)
            .Select(a => new AssetDto(
                a.Id,
                a.Name,
                a.Category,
                a.Status.ToString(),
                a.Condition.ToString(),
                a.Condominium.Name,
                a.LastMaintenanceDate,
                a.NextMaintenanceDate,
                a.CreatedAt
            ))
            .ToListAsync();

        return Ok(assets);
    }

    [HttpGet("{id:guid}")]
    public async<ActionResult<AssetDto>> GetById(Guid id)
    {
        var asset = await _context.Assets
            .Include(a => a.Condominium)
            .Include(a => a.MaintenanceEvents.OrderByDescending(m => m.ScheduledDate).Take(1))
            .FirstOrDefaultAsync(a => a.Id == id);

        if (asset == null)
        {
            return NotFound();
        }

        var dto = new AssetDto(
            asset.Id,
            asset.Name,
            asset.Category,
            asset.Status.ToString(),
            asset.Condition.ToString(),
            asset.Condominium.Name,
            asset.LastMaintenanceDate,
            asset.NextMaintenanceDate,
            asset.CreatedAt
        );

        return Ok(dto);
    }

    [HttpGet("{id:guid}/maintenance")]
    public async<ActionResult<IEnumerable<MaintenanceEventDto>>> GetMaintenanceEvents(Guid id)
    {
        var events = await _context.MaintenanceEvents
            .Include(e => e.Asset)
                .ThenInclude(a => a!.Condominium)
            .Where(e => e.AssetId == id)
            .OrderByDescending(e => e.ScheduledDate)
            .Select(e => new MaintenanceEventDto(
                e.Id,
                e.Title,
                e.Type.ToString(),
                e.Status.ToString(),
                e.Asset!.Name,
                e.Asset.Condominium.Name,
                e.ScheduledDate,
                e.CompletedDate,
                e.Cost,
                e.CreatedAt
            ))
            .ToListAsync();

        return Ok(events);
    }

    [HttpGet("maintenance")]
    public async<ActionResult<IEnumerable<MaintenanceEventDto>>> GetAllMaintenanceEvents()
    {
        var events = await _context.MaintenanceEvents
            .Include(e => e.Asset)
                .ThenInclude(a => a!.Condominium)
            .OrderByDescending(e => e.ScheduledDate)
            .Select(e => new MaintenanceEventDto(
                e.Id,
                e.Title,
                e.Type.ToString(),
                e.Status.ToString(),
                e.Asset!.Name,
                e.Asset.Condominium.Name,
                e.ScheduledDate,
                e.CompletedDate,
                e.Cost,
                e.CreatedAt
            ))
            .ToListAsync();

        return Ok(events);
    }
}
