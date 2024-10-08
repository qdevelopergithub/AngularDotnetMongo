using CrudWithMongoDB.DataAccess;
using CrudWithMongoDB.EncryptionHelper;
using CrudWithMongoDB.Service.Interface;
using CrudWithMongoDB.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<MongoDbServices>();
builder.Services.AddTransient<EncryptionHelper>();
builder.Services.AddScoped<EncryptionHelper>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseMiddleware<EncryptionMiddleWare>();

app.UseHttpsRedirection();


app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
