const { createTable, dropTable } = require("./user_table");

// Migrationni bajarish funksiyasi
const runMigration = async () => {
  console.log("Running migrations...");
  await createTable(); // `create_users_table.js` faylidagi funksiyani ishga tushiramiz
  console.log("Migrations completed.");
};

// Migrationni bekor qilish funksiyasi
const rollbackMigration = async () => {
  console.log("Rolling back migrations...");
  await dropTable(); // `drop_users_table` funksiyasini ishga tushiramiz
  console.log("Rollback completed.");
};

// Jarayonni boshqarish
const action = process.argv[2]; // CLI-dan "up" yoki "down" parametrini qabul qilamiz

if (action === "up") {
  runMigration();
} else if (action === "down") {
  rollbackMigration();
} else {
  console.log('Please specify "up" to migrate or "down" to rollback.');
}
