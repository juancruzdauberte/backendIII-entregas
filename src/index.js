import { app } from "./config/app.js";
import { envConfig } from "./config/env.config.js";

app.listen(envConfig.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${envConfig.PORT}`);
});
