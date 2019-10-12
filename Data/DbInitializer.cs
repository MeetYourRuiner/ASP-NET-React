using WebApplication2;
using System;
using System.Linq;

namespace WebApplication2.Data
{
    public class DbInitializer
    {
        public static void Initialize(EmployeeContext context)
        {
            context.Database.EnsureCreated();
            if (context.Employees.Any())
                return;
            var employees = new Employee[]
            {
                new Employee{Name = "John", Position = "Worker"},
                new Employee{Name = "Boris", Position = "Worker"},
                new Employee{Name = "Andrew", Position = "Worker"},
                new Employee{Name = "Roman", Position = "Security"},
            };
            foreach(Employee e in employees)
            {
                context.Employees.Add(e);
            }
            context.SaveChanges();
        }
    }
}
