// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;
// ============================
//  entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//vencimiento del token
// 30 DIAS

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/// seed de autenticacion
process.env.SEED = process.env.SEED || "este-es-el-seed-de-desarrollo";
// base de datos

let urlDB;
if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    urlDB = "mongodb+srv://ufps:123456a@cluster0.3mprl.mongodb.net/cafe";
}
process.env.URLDB = urlDB;

//
//google client ID

process.env.CLIENT_ID =
    process.env.CLIENT_ID ||
    "390814015918-aq7r50bihtc9jjujpk98kbe6u88lrrpo.apps.googleusercontent.com";