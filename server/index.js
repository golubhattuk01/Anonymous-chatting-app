import "dotenv/config";
import { app, server } from "./src/socket/socket.js";

app.get("/", (req, res) => {
  console.log("server of socket is working properly");
  res.json("server of socket is working properly");
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
