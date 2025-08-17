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

        // GET: ClienteQueryController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ClienteQueryController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ClienteQueryController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ClienteQueryController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ClienteQueryController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ClienteQueryController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ClienteQueryController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
