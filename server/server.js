const express = require('express');
const cors = require('cors') 
const cookieParser = require('cookie-parser');

require('dotenv').config();

// console.log(process.env.SECRET_KEY);

const app = express();

app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

require('./config/mongoose.config')

require('./routes/users.routes')(app)

require('./routes/product.routes')(app);

app.all('*', (_,res) => res.sendFile(__dirname + '/client/build/index.html'));
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
