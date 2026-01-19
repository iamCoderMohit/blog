import express from 'express';
import authRouter from './routes/auth.js';
import blogRouter from './routes/blog.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import tagRouter from './routes/tag.js';
import searchRouter from './routes/search.js';
const app = express();
app.use(cors({
    origin: ["https://blog-eosin-gamma.vercel.app", "http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/tag", tagRouter);
app.use("/api/v1/search", searchRouter);
export default app;
//# sourceMappingURL=index.js.map