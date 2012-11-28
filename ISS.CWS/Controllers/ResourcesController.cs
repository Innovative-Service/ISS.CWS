using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ISS.CWS.Controllers
{
    public class ResourcesController : Controller
    {
        //
        // GET: /Services/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CaseStudies()
        {
            return View();
        }
    }
}
