import express from 'express';
import bodyParser from 'body-parser';
import user from './routes/user';
import staff from './routes/staff'
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', user);
app.use('/', staff);

export default app;
