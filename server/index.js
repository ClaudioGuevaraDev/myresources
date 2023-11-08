import app from "./app.js";

function startServer() {
  try {
    app.listen(app.get("port"));
    console.log(`Servidor en el puerto ${app.get("port")}`);
  } catch (error) {
    console.error("Error al iniciar el servidor");
  }
}

startServer();
