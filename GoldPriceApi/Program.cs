using GoldPriceApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<GoldPriceService>();
builder.Services.AddCors(options => options.AddPolicy("AngularDevServer", policy =>
    policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AngularDevServer");
app.MapControllers();

app.Run();