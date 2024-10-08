using CrudWithMongoDB.DataAccess;
using CrudWithMongoDB.Models;
using CrudWithMongoDB.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace CrudWithMongoDB.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Customer>> GetAll()
        {
            return await _customerService.GetAllCustomersAsync();
        }

        [HttpGet]
        public async Task<ActionResult<Customer?>> GetById(string id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);
            return customer == null ? NotFound() : Ok(customer);
        }
        [HttpPost]
        public async Task<ActionResult> CreateCustomer(Customer customer)
        {
            try
            {
                await _customerService.CreateCustomerAsync(customer);
                return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCustomer(Customer customer)
        {
            await _customerService.UpdateCustomerAsync(customer);
            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(string id)
        {
            await _customerService.DeleteCustomerAsync(id);
            return Ok();
        }
    }
}
