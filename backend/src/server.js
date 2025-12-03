import express from 'express';
const app = express();
import {ENV} from './lib/env.js';



app.get('/', (req, res) => { 
    res.send('Hello World!ss');
});
app.listen( ENV.PORT, () => {
    console.log(`Server is running on  port ${ENV.PORT}`);
});