const app = require('./api/server');

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`=== Express app is live on port:${PORT} ===`);
});
