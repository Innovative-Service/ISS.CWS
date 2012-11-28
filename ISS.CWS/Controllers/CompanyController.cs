using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ISS.CWS.Models;

namespace ISS.CWS.Controllers
{
    public class CompanyController : Controller
    {
        //
        // GET: /Services/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Overview()
        {
            return View();
        }

        public ActionResult Approach()
        {
            return View();
        }

        public ActionResult Contact()
        {
            var subjects = new List<object>();

            subjects.Add(new { Text = "Request a Quote", SubjectID = "Request a Quote" });
            subjects.Add(new { Text = "Career", SubjectID = "Career" });
            subjects.Add(new { Text = "Other", SubjectID = "Other" });

            ViewBag.Subjects = new SelectList(subjects, "SubjectID", "Text", "Request a Quote");

            var budgets = new List<object>();

            budgets.Add(new { Text = "Project Budget:", BudgetID = String.Empty });
            budgets.Add(new { Text = "< $5000", BudgetID = "< $5000" });
            budgets.Add(new { Text = "$5000 - $10 000", BudgetID = "$5000 - $10 000" });
            budgets.Add(new { Text = "$10 000 - $20 000", BudgetID = "$10 000 - $20 000" });
            budgets.Add(new { Text = "> $20 000", BudgetID = "> $20 000" });
            budgets.Add(new { Text = "Hourly Rate", BudgetID = "Hourly Rate" });
            budgets.Add(new { Text = "Dedicated Team", BudgetID = "Dedicated Team" });
            budgets.Add(new { Text = "Uncertain", BudgetID = "Uncertain" });

            ViewBag.Budgets = new SelectList(budgets, "BudgetID", "Text", String.Empty);

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Contact(ContactModel model)
        {
            if (ModelState.IsValid)
            {
                // Send email here...
            }

            // If we got this far, something failed, redisplay form
            return View("ThankYou");
        }
    }
}
