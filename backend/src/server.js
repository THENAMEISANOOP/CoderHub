import express from 'express';
const app = express();
import  path from 'path';
import {ENV} from './lib/env.js';


const __dirname = path.resolve();

app.get('/health', (req, res) => { 
    res.status(200).send('Server is healthy');
});
app.get('/book', (req, res) => { 
    res.status(200).send('Server is booking');
});


// make our app ready for deployment
 if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('/{*any}', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend","dist","index.html"));
    });
 }

app.listen( ENV.PORT, () => {
    console.log(`Server is running on  port ${ENV.PORT}`);
});