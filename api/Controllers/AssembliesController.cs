using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Odara.Api.Data;
using Odara.Api.DTOs;
using Odara.Api.Entities;

namespace Odara.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssembliesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AssembliesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async<ActionResult<IEnumerable<AssemblyDto>>> GetAll([FromQuery] Guid? condominiumId = null)
    {
        var query = _context.Assemblies
            .Include(a => a.Condominium)
            .Include(a => a.Decisions)
            .Include(a => a.Objectives)
            .AsQueryable();

        if (condominiumId.HasValue)
        {
            query = query.Where(a => a.CondominiumId == condominiumId.Value);
        }

        var assemblies = await query
            .OrderByDescending(a => a.AssemblyDate)
            .Select(a => new AssemblyDto(
                a.Id,
                a.Title,
                a.AssemblyDate,
                a.Type.ToString(),
                a.Status.ToString(),
                a.Condominium.Name,
                a.Decisions.Count(),
                a.Objectives.Count(),
                a.CreatedAt
            ))
            .ToListAsync();

        return Ok(assemblies);
    }

    [HttpGet("{id:guid}")]
    public async<ActionResult<AssemblyDto>> GetById(Guid id)
    {
        var assembly = await _context.Assemblies
            .Include(a => a.Condominium)
            .Include(a => a.Decisions)
            .Include(a => a.Objectives)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (assembly == null)
        {
            return NotFound();
        }

        var dto = new AssemblyDto(
            assembly.Id,
            assembly.Title,
            assembly.AssemblyDate,
            assembly.Type.ToString(),
            assembly.Status.ToString(),
            assembly.Condominium.Name,
            assembly.Decisions.Count,
            assembly.Objectives.Count,
            assembly.CreatedAt
        );

        return Ok(dto);
    }

    [HttpPost]
    public async<ActionResult<AssemblyDto>> Create([FromBody] CreateAssemblyRequest request)
    {
        var assembly = new Assembly
        {
            Id = Guid.NewGuid(),
            CondominiumId = request.CondominiumId,
            Title = request.Title,
            AssemblyDate = request.AssemblyDate,
            Type = Enum.Parse<AssemblyType>(request.Type, true),
            Status = AssemblyStatus.Draft,
            CreatedAt = DateTime.UtcNow
        };

        _context.Assemblies.Add(assembly);
        await _context.SaveChangesAsync();

        var condominium = await _context.Condominiums.FindAsync(assembly.CondominiumId);

        var dto = new AssemblyDto(
            assembly.Id,
            assembly.Title,
            assembly.AssemblyDate,
            assembly.Type.ToString(),
            assembly.Status.ToString(),
            condominium?.Name ?? "",
            0,
            0,
            assembly.CreatedAt
        );

        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpGet("{id:guid}/decisions")]
    public async<ActionResult<IEnumerable<DecisionDto>>> GetDecisions(Guid id)
    {
        var decisions = await _context.AssemblyDecisions
            .Where(d => d.AssemblyId == id)
            .OrderBy(d => d.CreatedAt)
            .Select(d => new DecisionDto(
                d.Id,
                d.Description,
                d.Approved,
                d.VotesFor,
                d.VotesAgainst,
                d.Abstentions,
                d.CreatedAt
            ))
            .ToListAsync();

        return Ok(decisions);
    }
}
