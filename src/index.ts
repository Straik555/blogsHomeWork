import express from "express";
import { setupApp } from "./setup-app";

const app = express();
const PORT = 3003;

setupApp(app);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
