using Microsoft.EntityFrameworkCore;
using WebStrike.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("defaultConnection")
    ));
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
app.UseStaticFiles();

app.UseRouting();
//app.UseAuthentication();
//app.UseAuthorization();

app.UseEndpoints(endpoints => {
    app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});
//Seed database
AppDbInitializer.Seed(app);
//AppDbInitializer.SeedUsersAndRolesAsync(app).Wait();

app.Run();
