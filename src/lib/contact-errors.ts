export function getDatabaseErrorMessage(error: unknown): string {
  if (!process.env.MONGODB_URI) {
    return "La base de datos no está configurada (falta MONGODB_URI).";
  }

  const message =
    error instanceof Error ? error.message : String(error);

  if (
    message.includes("ECONNREFUSED") ||
    message.includes("ENOTFOUND") ||
    message.includes("Server selection timed out") ||
    message.includes("MongoServerSelectionError")
  ) {
    return "No se pudo conectar a MongoDB. Verificá MONGODB_URI y que el cluster esté activo (Atlas: Network Access → 0.0.0.0/0).";
  }

  if (message.includes("Authentication failed") || message.includes("bad auth")) {
    return "Error de autenticación en MongoDB. Verificá usuario y contraseña en MONGODB_URI.";
  }

  return "No se pudo enviar el mensaje. Intentá nuevamente.";
}
