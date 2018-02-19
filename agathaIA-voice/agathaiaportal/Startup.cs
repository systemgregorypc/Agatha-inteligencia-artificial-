using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RinnaiPortal.Startup))]
namespace agathaiaPortal
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
