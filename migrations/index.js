const { createTable, dropTable } = require("./user_table");

// Migrationni bajarish funksiyasi
const runMigration = async () => {
  console.log("Running migrations...");
  await createTable();
  console.log("Migrations completed.");
};

// Migrationni bekor qilish funksiyasi
const rollbackMigration = async () => {
  console.log("Rolling back migrations...");
  await dropTable();
  console.log("Rollback completed.");
};

const action = process.argv[2];

if (action === "up") {
  runMigration();
} else if (action === "down") {
  rollbackMigration();
} else {
  console.log('Please specify "up" to migrate or "down" to rollback.');
}
