import express from "express";
import { setupApp } from "./setup-app";
import "dotenv/config";
import { SETTINGS } from "./core/settings/settings";
import { runDB } from "./db/mongo.db";

const startApp = async () => {
  const app = express();

  const PORT = SETTINGS.PORT;

  setupApp(app);
  await runDB(SETTINGS.MONGO_URL);

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startApp();
