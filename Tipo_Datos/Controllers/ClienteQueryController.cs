using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tipo_Datos.Controllers
{
    public class ClienteQueryController : Controller
    {
        // GET: ClienteQueryController
        public ActionResult Index()
        {
            return View();
        }

        // GET: ClienteQuery/Detail/5
        public ActionResult Detalle(int id)
        {
            return View();
        }

        // GET: ClienteQueryController/Create
        public ActionResult Nuevo()
        {
            return View();
        }
        
        // GET: ClienteQueryController/Edit/5
        public ActionResult Editar(int id)
        {
            return View();
        }

        
        // GET: ClienteQueryController/Delete/5
        public ActionResult Eliminar(int id)
        {
            return View();
        }
    }
}
