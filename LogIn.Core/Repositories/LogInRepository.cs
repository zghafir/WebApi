using LogIn.Core.Data;
using LogIn.Core.Services;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace LogIn.Core.Repositories
{
    public class LogInRepository : IRepository
    {
        private readonly LogInDBContext _context;

        public LogInRepository()
        {
            _context = new LogInDBContext();
        }

        public IEnumerable<T> All<T>() where T : class
        {
            return _context.Set<T>();
        }

        public void Dispose()
        {
            if (_context != null) _context.Dispose();
        }
    }
}