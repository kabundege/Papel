import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import user from './routes/user';
import staff from './routes/staff';
import trans from './routes/transactions';

const app = express();


app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [process.env.cookieKey]
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(cors())
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use('/', user);
app.use('/', staff);
app.use('/', trans);


export default app;
