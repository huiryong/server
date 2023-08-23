import express from "express";
import { AppDataSource } from "./data-sources";
import cors from "cors";
import memberRoutes from "./routes/member";

const app = express();
// const origin = "http://localhost:3000";

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

let port = 4000;

app.use("/api/member", memberRoutes);

app.listen(port, async () => {
  console.log(`サーバ起動してます。。http://localhost:${port}`);
  AppDataSource.initialize()
    .then(async () => {
      console.log("データベース準備ができました.....");
    })
    .catch((error) => {
      console.log(error);
    });
});
