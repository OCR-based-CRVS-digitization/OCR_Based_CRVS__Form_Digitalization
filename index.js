const { connectAndExecute } = require('./db');
const { PORT } = require('./config');
const app = require('./app');

(async () => {

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

})().catch((err) => console.log(err.stack));


