/**
 * Script para crear índice de búsqueda de texto en MongoDB
 *
 * Este script crea un índice de texto en el campo 'text' de la colección 'glits'
 * para permitir búsquedas de texto completo.
 *
 * Ejecutar: node create-search-index.js
 */

const mongoose = require("mongoose");

// Conectar a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/glitter", {
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Error al conectar a MongoDB:", err);
  process.exit(1);
});

mongoose.connection.once("open", async () => {
  console.log("✅ Conectado a MongoDB");

  try {
    const db = mongoose.connection.db;
    const collection = db.collection("glits");

    // Verificar índices existentes
    console.log("\n📋 Índices actuales:");
    const existingIndexes = await collection.indexes();
    existingIndexes.forEach((index) => {
      console.log("  -", index.name, ":", JSON.stringify(index.key));
    });

    // Verificar si ya existe el índice de texto
    const hasTextIndex = existingIndexes.some(
      (index) => index.key && index.key._fts === "text"
    );

    if (hasTextIndex) {
      console.log(
        "\n✅ El índice de texto ya existe. No es necesario crearlo."
      );
    } else {
      console.log('\n🔨 Creando índice de texto en el campo "text"...');

      // Crear índice de texto
      await collection.createIndex({ text: "text" });

      console.log("✅ Índice de texto creado exitosamente");
    }

    // Mostrar índices finales
    console.log("\n📋 Índices finales:");
    const finalIndexes = await collection.indexes();
    finalIndexes.forEach((index) => {
      console.log("  -", index.name, ":", JSON.stringify(index.key));
    });

    console.log(
      "\n✨ Proceso completado. Ahora puedes usar la búsqueda de texto."
    );
    console.log("\n💡 Ejemplo de búsqueda:");
    console.log("   GET /glits?search=coding");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error al crear índice:", error);
    process.exit(1);
  }
});
