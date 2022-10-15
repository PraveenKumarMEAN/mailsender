require('dotenv').config()
const app = require('./app')

app.listen(4000, ()=>{
    console.log(`Server Running on PORT ${4000}`);
})