import cluster from 'node:cluster';
import process from 'node:process';
import os from 'os'
import { AppController } from './app/app.controller';
import { UserController } from './app/user/user.controller';
import { UserService } from './app/user/users.service';

const numCPUs = os.availableParallelism() - 1;
const PORT: number = parseInt(process.env.PORT!) || 5000;
const appController = new AppController(new UserController(new UserService));

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });

  process.on('SIGTERM', () => {
    appController.getSever().close(() => {
      console.log(`Worker ${process.pid} terminated`);
      process.exit(0);
    });
  });
} else {
  appController.getSever().listen(PORT, () => {
    console.log(`Worker ${process.pid} http://localhost:${PORT}/`);
  });
}
