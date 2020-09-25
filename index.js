require("dotenv").config();
const server = require("./src/app");

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`\n=== Server listening on  http://localhost:${PORT} ===\n`);
});
