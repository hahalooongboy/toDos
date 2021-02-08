using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TodoItemsController : ControllerBase
  {
    private readonly ToDoContext _context;

    public TodoItemsController(ToDoContext context)
    {
      _context = context;
    }

    // GET: api/TodoItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ToDo>>> GetToDos()
    {
      return await _context.ToDos.ToListAsync();
    }

    // GET: api/TodoItems/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ToDo>> GetToDo(Guid id)
    {
      var toDo = await _context.ToDos.FindAsync(id);

      if (toDo == null)
      {
        return NotFound();
      }

      return toDo;
    }

    // PUT: api/TodoItems/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutToDo(Guid id, ToDo toDo)
    {
      if (id != toDo.Id)
      {
        return BadRequest();
      }

      _context.Entry(toDo).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ToDoExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/TodoItems
    [HttpPost]
    public async Task<ActionResult<ToDo>> PostToDo(ToDo toDo)
    {
      _context.ToDos.Add(toDo);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetToDo), new { id = toDo.Id }, toDo);
    }

    // DELETE: api/TodoItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteToDo(Guid id)
    {
      var toDo = await _context.ToDos.FindAsync(id);
      if (toDo == null)
      {
        return NotFound();
      }

      _context.ToDos.Remove(toDo);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ToDoExists(Guid id)
    {
      return _context.ToDos.Any(e => e.Id == id);
    }
  }
}
