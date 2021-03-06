﻿using LogIn.API.AppConfig;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LogIn.API.Config
{

    public class LogInDBContext : IdentityDbContext<ApplicationUser>
    {
        public LogInDBContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public static LogInDBContext Create()
        {
            return new LogInDBContext();
        }

    }
}
