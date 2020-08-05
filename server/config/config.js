// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;
// ============================
//  entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// base de datos

let urlDB;
if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    urlDB = "mongodb+srv://ufps:web123@cluster0.3mprl.mongodb.net/cafe";
}
process.env.URLDB = urlDB;