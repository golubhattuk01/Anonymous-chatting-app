import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { app } from "./socket/socket.js";

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "16mb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
