import { AppController } from './app/app.controller';
import { UserController } from './app/user/user.controller';
import { UserService } from './app/user/users.service';
import { port } from './config';
import { pool } from './database';

class MainApp {
  constructor(private readonly appController: AppController) {}

  public startServer() {
    this.appController.getSever().listen(port, () => {
      console.log(`Worker ${process.pid} listening on http://localhost:${port}/`);
    });
  }
}

new MainApp(new AppController(new UserController(new UserService()))).startServer();
