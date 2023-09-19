import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUser } from './dto/create-user.dto';

export class UserService {
  private static users: User[] = [];

  public findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      resolve(UserService.users);
    });
  }
  public findById(id: string): Promise<User> | null {
    return new Promise((resolve, reject) => {
      const user: User = UserService.users.find((u) => u.id === id);

      if (user) resolve(user);

      resolve(null);
    });
  }
  public create(user: CreateUser): Promise<User> | null {
    return new Promise((resolve, reject) => {
      const newUser: User = { id: uuidv4(), ...user };
      UserService.users.push(newUser);
      resolve(newUser);
    });
  }

  public update(id: string, user: User): Promise<User> | null {
    return new Promise((resolve, reject) => {
      let userIndex = UserService.users.findIndex((u) => u.id === id);
      UserService.users[userIndex] = { id, ...user };
      resolve(UserService.users[userIndex]);
    });
  }

  public delete(userIndex: number): Promise<void> {
    return new Promise((resolve, reject) => {
      UserService.users.splice(userIndex, 1);
      resolve();
    });
  }
}
