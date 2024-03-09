import express from "express";
import { router as ex5 } from "./api/ex5";
import cors from "cors";
export const app = express();
import bodyParser from "body-parser";
// app.use("/", (req, res) => {
//   res.send("Hello World!!!");
// });

//*ใครก็สามารถเรียกได้
app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ex5", ex5);