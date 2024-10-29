import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbConnect from './db_connect';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB

dbConnect();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
})