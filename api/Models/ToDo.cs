using System;

namespace api.Models
{
  public class ToDo
  {
    public Guid Id { get; set; }
    public string Name { get; set; }

    public string Description { get; set; }

    public string DueDate { get; set; }

    public bool IsComplete { get; set; }
  }
}
