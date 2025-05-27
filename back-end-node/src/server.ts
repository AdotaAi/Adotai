import express from 'express';
import cors from 'cors';
import db from './config/db.ts';
import router from './routes/routes.ts';
import http from 'http'; 


const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use(router);

db();

app.listen(port, () => {
    console.log('Server is running in http://localhost:3000');
});