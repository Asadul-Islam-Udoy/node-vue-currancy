import cors from 'cors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import currencyRouter from './routers/routers';
const app = express();
dotenv.config({path:'.env'})


// Middleware to parse JSON
app.use(express.json());

app.use(cors());

//Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript API!');
});

//router middleware
app.use('/api',currencyRouter);


const port = process.env.PORT || 5000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// export default app; ///if you will do the jest testing