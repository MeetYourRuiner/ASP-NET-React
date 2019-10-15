using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly EmployeeContext _db;

        public EmployeeController(EmployeeContext employeeContext)
        {
            _db = employeeContext;
        }

        [HttpPost("create")]
        public int Create(Employee employee)
        {
            try
            {
                _db.Add(employee);
                _db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("delete/{id}")]
        //[Route("/Employee/Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var employee = _db.Employees.Find(id);
            if (employee == null)
            {
                return BadRequest();
            }
            try
            {
                _db.Employees.Remove(employee);
                _db.SaveChanges();
                return Ok();
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("test")]
        public string Test()
        {
            return "Ok";
        }

        [HttpGet("get/{id}")]
        public Employee GetEmployee(int id)
        {
            var employee = _db.Employees.Find(id);
            try
            {
                if (employee == null)
                    throw new NullReferenceException();
                return employee;
            }
            catch
            {
                 throw;
            }
        }

        [HttpPost("update/{id}")]
        public IActionResult UpdateEmployee(int id, Employee employee)
        {
            try
            {
                var objToUpdate = _db.Employees.SingleOrDefault(e => e.Id == id);
                objToUpdate.Name = employee.Name;
                _db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("get")]
        public IEnumerable<Employee> Get()
        {
            IEnumerable<Employee> Employees = _db.Employees;
            return Employees;
        }
    }
}