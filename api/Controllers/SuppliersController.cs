using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Odara.Api.Data;
using Odara.Api.DTOs;
using Odara.Api.Entities;

namespace Odara.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SuppliersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SuppliersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async<ActionResult<IEnumerable<SupplierDto>>> GetAll([FromQuery] string? search = null)
    {
        var query = _context.Suppliers
            .Include(s => s.Contacts)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();
            query = query.Where(s => s.Name.ToLower().Contains(search));
        }

        var suppliers = await query
            .OrderBy(s => s.Name)
            .Select(s => new SupplierDto(
                s.Id,
                s.Name,
                s.Category,
                s.Status.ToString(),
                s.Rating,
                s.Contacts.FirstOrDefault(c => c.IsPrimary).Email,
                s.Contacts.Count(),
                s.CreatedAt
            ))
            .ToListAsync();

        return Ok(suppliers);
    }

    [HttpGet("{id:guid}")]
    public async<ActionResult<SupplierDto>> GetById(Guid id)
    {
        var supplier = await _context.Suppliers
            .Include(s => s.Contacts)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (supplier == null)
        {
            return NotFound();
        }

        var dto = new SupplierDto(
            supplier.Id,
            supplier.Name,
            supplier.Category,
            supplier.Status.ToString(),
            supplier.Rating,
            supplier.Contacts.FirstOrDefault(c => c.IsPrimary)?.Email,
            supplier.Contacts.Count(),
            supplier.CreatedAt
        );

        return Ok(dto);
    }

    [HttpGet("rfp")]
    public async<ActionResult<IEnumerable<RfpRequestDto>>> GetRFPs([FromQuery] Guid? condominiumId = null)
    {
        // For now, return empty list - RFP system is more complex
        return Ok(new List<RfpRequestDto>());
    }
}
