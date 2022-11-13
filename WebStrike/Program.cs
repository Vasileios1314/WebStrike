using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using System.Data;
using System.Runtime.Serialization.Json;
using System.Security.Cryptography.Xml;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using WebStrike.Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("defaultConnection")
    ));
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); builder.Services.AddControllersWithViews();
//builder.Services.AddRazorPages();
var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    //app.MapGet("/", () => "Hello World!");
    app.UseDeveloperExceptionPage();
} else {
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}



app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
//node modules
app.UseStaticFiles(new StaticFileOptions {
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "node_modules")),
    RequestPath = new PathString("/node_modules")
});

app.UseRouting();
//app.UseAuthentication();
//app.UseAuthorization();

app.UseEndpoints(endpoints => {
    app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
    endpoints.MapControllers();

});

//Seed database
AppDbInitializer.Seed(app);
//AppDbInitializer.SeedUsersAndRolesAsync(app).Wait();

app.Run();


