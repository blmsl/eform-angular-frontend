﻿using System;
using eFormAPI.Web.Infrastructure.Database;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microting.eFormApi.BasePn.Infrastructure.Helpers.WritableOptions;
using Microting.eFormApi.BasePn.Infrastructure.Models.Application;

namespace eFormAPI.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHost host = BuildWebHost(args);
            using (IServiceScope scope = host.Services.GetService<IServiceScopeFactory>().CreateScope())
            using (BaseDbContext dbContext = scope.ServiceProvider.GetRequiredService<BaseDbContext>())
            {
                try
                {
                    IWritableOptions<ConnectionStrings> connectionStrings =
                        scope.ServiceProvider.GetRequiredService<IWritableOptions<ConnectionStrings>>();
                    if (connectionStrings.Value.DefaultConnection != "...")
                    {
                        dbContext.Database.Migrate();
                    }
                }
                catch (Exception e)
                {
                    ILogger<Program> logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(e, "Error while migrating db");
                }
            }
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            IConfigurationRoot defaultConfig = new ConfigurationBuilder()
                .AddCommandLine(args)
                .AddEnvironmentVariables(prefix: "ASPNETCORE_")
                .Build();
            int port = defaultConfig.GetValue("port", 5000);
            return WebHost.CreateDefaultBuilder(args)
                .UseUrls($"http://localhost:{port}")
                .ConfigureAppConfiguration((hostContext, config) =>
                {
                    // delete all default configuration providers
                    config.Sources.Clear();
                    config.SetBasePath(hostContext.HostingEnvironment.ContentRootPath);
                    config.AddJsonFile("appsettings.json",
                        optional: true,
                        reloadOnChange: true);
                    config.AddEnvironmentVariables();
                })
                .UseStartup<Startup>()
                .Build();
        }
    }
}