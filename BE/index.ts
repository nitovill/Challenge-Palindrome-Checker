import app from "./src/app";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log("app listen on http://localhost:" + port);
});
