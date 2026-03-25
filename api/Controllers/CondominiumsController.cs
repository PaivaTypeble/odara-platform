using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Odara.Api.Data;
using Odara.Api.DTOs;
using Odara.Api.Entities;

namespace Odara.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CondominiumsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CondominiumsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async<ActionResult<IEnumerable<CondominiumDto>>> GetAll(
        [FromQuery] string? search = null,
        [FromQuery] bool includeInactive = false)
    {
        var query = _context.Condominiums
            .Include(c => c.Address)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();
            query = query.Where(c => 
                c.Name.ToLower().Contains(search) ||
                (c.Address != null && c.Address.City.ToLower().Contains(search)));
        }

        if (!includeInactive)
        {
            query = query.Where(c => c.IsActive);
        }

        var condominiums = await query
            .OrderBy(c => c.Name)
            .Select(c => new CondominiumDto(
                c.Id,
                c.Name,
                c.FractionCount,
                c.ElevatorCount,
                c.IsActive,
                c.Address != null ? $"{c.Address.Street}, {c.Address.Number}" : null,
                c.Address != null ? c.Address.City : null,
                c.CreatedAt
            ))
            .ToListAsync();

        return Ok(condominiums);
    }

    [HttpGet("{id:guid}")]
    public async<ActionResult<CondominiumDto>> GetById(Guid id)
    {
        var condominium = await _context.Condominiums
            .Include(c => c.Address)
            .Include(c => c.AdminContacts)
            .Include(c => c.Objectives)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (condominium == null)
        {
            return NotFound();
        }

        var dto = new CondominiumDto(
            condominium.Id,
            condominium.Name,
            condominium.FractionCount,
            condominium.ElevatorCount,
            condominium.IsActive,
            condominium.Address != null ? $"{condominium.Address.Street}, {condominium.Address.Number}" : null,
            condominium.Address != null ? condominium.Address.City : null,
            condominium.CreatedAt
        );

        return Ok(dto);
    }

    [HttpPost]
    public async<ActionResult<CondominiumDto>> Create([FromBody] CreateCondominiumRequest request)
    {
        var condominium = new Condominium
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            FractionCount = request.FractionCount,
            ElevatorCount = request.ElevatorCount,
            CreatedAt = DateTime.UtcNow
        };

        if (request.Address != null)
        {
            condominium.Address = new CondominiumAddress
            {
                Id = Guid.NewGuid(),
                CondominiumId = condominium.Id,
                Street = request.Address.Street,
                Number = request.Address.Number,
                PostalCode = request.Address.PostalCode,
                City = request.Address.City,
                District = request.Address.District,
                Country = request.Address.Country ?? "Portugal"
            };
        }

        _context.Condominiums.Add(condominium);
        await _context.SaveChangesAsync();

        var dto = new CondominiumDto(
            condominium.Id,
            condominium.Name,
            condominium.FractionCount,
            condominium.ElevatorCount,
            condominium.IsActive,
            request.Address != null ? $"{request.Address.Street}, {request.Address.Number}" : null,
            request.Address?.City,
            condominium.CreatedAt
        );

        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPut("{id:guid}")]
    public async<ActionResult<CondominiumDto>> Update(Guid id, [FromBody] UpdateCondominiumRequest request)
    {
        var condominium = await _context.Condominiums
            .Include(c => c.Address)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (condominium == null)
        {
            return NotFound();
        }

        if (request.Name != null)
            condominium.Name = request.Name;
        if (request.FractionCount.HasValue)
            condominium.FractionCount = request.FractionCount.Value;
        if (request.ElevatorCount.HasValue)
            condominium.ElevatorCount = request.ElevatorCount.Value;
        if (request.IsActive.HasValue)
            condominium.IsActive = request.IsActive.Value;

        if (request.Address != null)
        {
            if (condominium.Address == null)
            {
                condominium.Address = new CondominiumAddress
                {
                    Id = Guid.NewGuid(),
                    CondominiumId = condominium.Id
                };
                _context.CondominiumAddresses.Add(condominium.Address);
            }

            condominium.Address.Street = request.Address.Street;
            condominium.Address.Number = request.Address.Number;
            condominium.Address.PostalCode = request.Address.PostalCode;
            condominium.Address.City = request.Address.City;
            condominium.Address.District = request.Address.District;
            if (request.Address.Country != null)
                condominium.Address.Country = request.Address.Country;
        }

        condominium.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        var dto = new CondominiumDto(
            condominium.Id,
            condominium.Name,
            condominium.FractionCount,
            condominium.ElevatorCount,
            condominium.IsActive,
            condominium.Address != null ? $"{condominium.Address.Street}, {condominium.Address.Number}" : null,
            condominium.Address?.City,
            condominium.CreatedAt
        );

        return Ok(dto);
    }

    [HttpDelete("{id:guid}")]
    public async<ActionResult> Delete(Guid id)
    {
        var condominium = await _context.Condominiums.FindAsync(id);
        if (condominium == null)
        {
            return NotFound();
        }

        _context.Condominiums.Remove(condominium);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
