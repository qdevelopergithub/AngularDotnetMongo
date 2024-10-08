using CrudWithMongoDB.DataAccess;
using CrudWithMongoDB.Models;
using CrudWithMongoDB.Service.Interface;
using MongoDB.Driver;

namespace CrudWithMongoDB.Service
{
    public class CustomerService : ICustomerService
    {
        private readonly IMongoCollection<Customer> _customerCollection;

        public CustomerService(MongoDbServices mongoDbServices)
        {
            _customerCollection = mongoDbServices.Database?.GetCollection<Customer>("customer");
        }

        public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
        {
            return await _customerCollection.Find(FilterDefinition<Customer>.Empty).ToListAsync();
        }

        public async Task<Customer?> GetCustomerByIdAsync(string id)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, id);
            return await _customerCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task CreateCustomerAsync(Customer customer)
        {
            var filter = Builders<Customer>.Filter.Eq(c => c.Email, customer.Email);
            var existingCustomer = await _customerCollection.Find(filter).FirstOrDefaultAsync();

            if (existingCustomer != null)
            {
                throw new Exception("A customer with the same email already exists.");
            }

            await _customerCollection.InsertOneAsync(customer);
        }

        public async Task UpdateCustomerAsync(Customer customer)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, customer.Id);
            await _customerCollection.ReplaceOneAsync(filter, customer);
        }

        public async Task DeleteCustomerAsync(string id)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, id);
            await _customerCollection.DeleteOneAsync(filter);
        }
    }
}
