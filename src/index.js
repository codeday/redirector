const app = require("express")();
const envAllMatching = require("./env-all-matching");

const redirectDomains = envAllMatching("REDIRECT_")
  .map(env => env.split(":"))
  .reduce((a, b) => {
    a[b[0]] = b[1];
    return a;
  }, {});

app.use((req, res) => {
  let redirectDomain = null;
  if (req.get("host") in redirectDomains)
    redirectDomain = redirectDomains[req.get("host")];
  else if (req.get("host").split(".").length === 2)
    redirectDomain = `www.${req.get("host")}`;

  const proto = req.get("x-forwarded-proto") || req.protocol;

  if (redirectDomain)
    return res.redirect(`${proto}://${redirectDomain}${req.originalUrl}`);
  else if (req.path === "/status") return res.send("ok");
  else
    return res
      .status(404)
      .contentType("text")
      .send("404 page not found");
});

const port = parseInt(process.env.PORT) || 80;
app.listen(port, () =>
  console.log(
    `Listening on port ${port}, redirections:\n\n${JSON.stringify(
      redirectDomains,
      null,
      2
    )}`
  )
);
