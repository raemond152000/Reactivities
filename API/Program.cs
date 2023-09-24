using API.Extensions;
using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

//creates database on start application instead of dependency injection from using services
using var scope = app.Services.CreateScope(); // when werefinish with this particular method with this scope it would be destroyed and cleaned up from memory as soon as we execute this following code
var services = scope.ServiceProvider;

try
{
   var context = services.GetRequiredService<DataContext>(); 
   await context.Database.MigrateAsync();
   await Seed.SeedData(context);
}
catch (Exception ex)
{
    
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}
app.Run();
