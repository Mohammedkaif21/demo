import express from 'express';
import studentHandler from './routes/studentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/students', studentHandler);
app.listen(PORT, () => {
  console.log(`Server active at http://localhost:${PORT}`);
});


