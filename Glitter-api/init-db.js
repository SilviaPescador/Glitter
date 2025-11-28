// Initialize the database with the minimum data required to function

const readline = require("readline");

// Loading models

const Glit = require("./models/glit");
const User = require("./models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ObjectId = mongoose.Types.ObjectId;

async function main() {
  // Ask the user to confirm if they are sure
  const nextStep = await question("Do you want to delete the database? [y/n]");
  if (!nextStep) {
    process.exit();
  }

  // connect to the DB

  const connection = require("./lib/connectMongoose");

  // Initialize the user collection, then the glit collection
  await initUsers();
  await initGlits();

  // Crear índice de búsqueda de texto
  await createSearchIndex();

  // Desconnect the DB

  connection.close();
}

main().catch((err) => console.log("Error", err));

let users = [];

async function initUsers() {
  // delete all users in database
  const resultUsers = await User.deleteMany({});
  console.log(`Deleted ${resultUsers.deletedCount} users.`);

  // create 5 new users
  const user1 = new User({
    _id: new ObjectId(),
    username: "sil",
    email: "hello_sil@gmail.com",
    password: "123456",
    following: [],
  });
  await user1.save();

  const user2 = new User({
    _id: new ObjectId(),
    username: "mari",
    email: "hello_mari@gmail.com",
    password: "123456",
    following: [user1._id],
  });
  await user2.save();

  const user3 = new User({
    _id: new ObjectId(),
    username: "mollete",
    email: "hello_mollete@gmail.com",
    password: "123456",
    following: [user2._id, user1._id],
  });
  await user3.save();

  const user4 = new User({
    _id: new ObjectId(),
    username: "muki",
    email: "hello_muki@hotmail.com",
    password: "123456",
    following: [user2._id, user1._id, user3._id],
  });
  await user4.save();

  const user5 = new User({
    _id: new ObjectId(),
    username: "neli",
    email: "hello_neli@gmail.com",
    password: "123456",
    following: [user2._id, user1._id, user3._id],
  });
  await user5.save();

  users = [user1, user2, user3, user4, user5];

  console.log(`Created ${users.length} users.`);
}

async function initGlits() {
  // delete all documents from the Glit collection
  const resultGlits = await Glit.deleteMany();
  console.log(`Deleted ${resultGlits.deletedCount} glits.`);

  // initial glits
  const inserted = await Glit.insertMany([
    {
      text: "❤I love coding!",
      imagePath: "/uploads/ilovecoding.jpg",
      publishDate: Date.now(),
      author: users[0]._id,
      kudos: [users[2]._id, users[3]._id, users[4]._id],
    },
    {
      text: "When MongoDb doesn't feed you:",
      imagePath: "/uploads/please-sir.jpg",
      publishDate: Date.now(),
      author: users[1]._id,
      kudos: [users[1]._id, users[3]._id],
    },
    {
      text: "I'm on a seafood diet. I see food and i eat it.🤣",
      imagePath: "",
      publishDate: Date.now(),
      author: users[2]._id,
      kudos: [users[1]._id, users[2]._id],
    },
    {
      text: "New working day here!",
      imagePath: "/uploads/working.webp",
      publishDate: Date.now(),
      author: users[3]._id,
      kudos: [users[2]._id],
    },
    {
      text: "Be proud of who you are 💕",
      imagePath: "/uploads/orgullo.webp",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [users[1]._id, users[3]._id],
    },
    {
      text: "Look mum I uploaded an image",
      imagePath: "/uploads/zebra.webp",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [users[1]._id, users[3]._id],
    },
    {
      text: "Ola ke ase",
      imagePath: "/uploads/olakease.jpg",
      publishDate: Date.now(),
      author: users[0]._id,
      kudos: [users[2]._id, users[3]._id, users[4]._id],
    },
    {
      text: "Love yourself first, because that's who you'll be spending the rest of your life with.",
      imagePath: "/uploads/loveurself.jpeg",
      publishDate: Date.now(),
      author: users[1]._id,
      kudos: [users[1]._id, users[3]._id],
    },
    {
      text: "💻 Codes all day long in javascript... Code doesn't run:",
      imagePath: "/uploads/foreveralone.jpg",
      publishDate: Date.now(),
      author: users[2]._id,
      kudos: [users[1]._id, users[2]._id],
    },
    {
      text: "Whoooops... Sorry! I forgot doing git pull 🧨",
      imagePath: "/uploads/firegirl.jpg",
      publishDate: Date.now(),
      author: users[3]._id,
      kudos: [users[2]._id],
    },
    {
      text: "I'm so happy to being working with my friends!",
      imagePath: "/uploads/codingGirls.jfif",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [users[1]._id, users[3]._id],
    },
    {
      text: "i'm not just 'special', i'm LIMITED EDITION.",
      imagePath: "/uploads/bravekid.jpg",
      publishDate: Date.now(),
      author: users[4]._id,
      kudos: [users[1]._id, users[3]._id],
    },
  ]);
  console.log(`Created ${inserted.length} glits.`);
}

// Función para crear índice de búsqueda de texto
async function createSearchIndex() {
  try {
    console.log("\n🔍 Creando índice de búsqueda de texto...");

    const db = mongoose.connection.db;
    const collection = db.collection("glits");

    // Verificar si ya existe el índice
    const indexes = await collection.indexes();
    const hasTextIndex = indexes.some(
      (index) => index.key && index.key._fts === "text"
    );

    if (hasTextIndex) {
      console.log("✅ El índice de texto ya existe.");
    } else {
      // Crear índice de texto en el campo 'text'
      await collection.createIndex({ text: "text" });
      console.log("✅ Índice de búsqueda de texto creado exitosamente.");
    }

    console.log("💡 Ahora puedes buscar glits con: GET /glits?search=término");
  } catch (error) {
    console.error("❌ Error al crear índice de búsqueda:", error);
    // No lanzar error para no interrumpir la inicialización
  }
}

// function for the y/n question
function question(text) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    interface.question(text, (answer) => {
      interface.close();
      if (answer.toLowerCase() === "y") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
