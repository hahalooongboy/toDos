using System;

namespace api.Models
{
  public class ToDo
  {
    public Guid Id { get; set; }
    public string Name { get; set; }

    public string Description { get; set; }

    public DateTime DueDate { get; set; }

    public bool IsComplete { get; set; }
  }
}
