import "dotenv/config";
import { app, server } from "./socket/socket.js";

// server.listen(process.env.PORT, () => {
//   ConnectDB()
//     .then(() => {
//       console.log("SERVER STARTED AT PORT " + process.env.PORT);
//     })
//     .catch((err) => {
//       console.log("FAILED TO CONNECT DATABASE AT INDEX PAGE");
//     });

//   console.log(`Server Running on port ${process.env.PORT}`);
// });

server.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
