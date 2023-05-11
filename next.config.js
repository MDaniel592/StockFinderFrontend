const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER } = require("next/constants");
module.exports = (phase) => {
  let isDev = phase == PHASE_DEVELOPMENT_SERVER;
  let domainName = process.env.DOMAIN_NAME;
  let backAPI = process.env.BACKEND_API_URL;
  let PORT = process.env.PORT;

  const env = {
    NEXT_API: (() => {
      if (isDev) return "http://localhost:3000/api";
      return "https://" + domainName + "/api";
    })(),
    BACK_API: (() => {
      if (isDev) return "http://127.0.0.1:5000/api";
      return backAPI;
    })(),
    IS_PRODUCTION: (() => {
      if (isDev) return false;
      return true;
    })(),
    DOMAIN_NAME: domainName,
    PORT: PORT,
  };

  return { env };
};
