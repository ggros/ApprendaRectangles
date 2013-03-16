using System;
using System.Web.Optimization;

[assembly: WebActivator.PostApplicationStartMethod(
    typeof(ApprendaRectangles.App_Start.DurandalConfig), "PreStart")]

namespace ApprendaRectangles.App_Start
{
    public static class DurandalConfig
    {
        public static void PreStart()
        {
            // Add your start logic here
            DurandalBundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}