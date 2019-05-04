const app = require('./app');
require('./services/passport');
require('./routes/authRoutes');

app.listen(process.env.PORT || 5000, () => {
    console.log('Running on port 5000');
});
