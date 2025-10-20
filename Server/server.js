import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './Routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';
// import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

app.use(cookieParser())
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

app.use(express.static(path.join(__dirname, 'FrontEnd', 'dist')));

app.use((_, res) => {
  res.sendFile(path.resolve(__dirname, 'FrontEnd', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}...`);
});