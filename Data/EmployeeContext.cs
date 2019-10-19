using Microsoft.EntityFrameworkCore;
using EmployeesSPA.Models;

namespace EmployeesSPA.Data
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
    }
}