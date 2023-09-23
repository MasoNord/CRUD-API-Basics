import http from 'http';
import dotenv from 'dotenv';
import { AppController } from './app/app.controller';
import { UserController } from './app/user/user.controller';
import { UserService } from './app/user/users.service';

dotenv.config();

class MainApp {
  constructor(private readonly appController: AppController) {}

  private PORT: number = parseInt(process.env.PORT!) || 5000;

  public startServer() {
    this.appController.getSever().listen(this.PORT, () => {
      console.log(`Worker ${process.pid} http://localhost:${this.PORT}/`);
    });
  }
}

new MainApp(new AppController(new UserController(new UserService()))).startServer();
