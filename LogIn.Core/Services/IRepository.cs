using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace LogIn.Core.Services
{
    public interface IRepository : IDisposable
    {
        IEnumerable<T> All<T>() where T : class;
    }
}
