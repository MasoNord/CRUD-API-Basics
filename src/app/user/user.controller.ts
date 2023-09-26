import { UserService } from '../user/users.service';
import { checkID } from '../util/checkID';
import { parseData } from '../util/parseData';
import { validateInfo } from '../util/validateUserData';
import { User } from './entities/user.entity';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async getUsers(request: any, response: any) {
    try {
      const users = await this.userService.findAll();
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(users));
    } catch (err) {
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }

  public async getUser(request: any, response: any, id: string) {
    try {
      if (!checkID(id)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'not an uuid format' }));
      } else {
        const user = await this.userService.findById(id);

        if (Object.keys(user).length === 0) {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: 'User Not Found' }));
        } else {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(user));
        }
      }
    } catch (err) {
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }

  public async createUser(request: any, response: any) {
    try {
      const body: string = await parseData(request);
      const { username, age, hobbies } = JSON.parse(body);

      const user = {
        username,
        age,
        hobbies,
      };

      if (!validateInfo(user.username, user.age, user.hobbies)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Body does not contain required fields' }));
      } else {
        const newUser = await this.userService.create(user);

        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ newUser }));
      }
    } catch (err) {
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }

  public async updateUser(request: any, response: any, id: string) {
    try {
      if (!checkID(id)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ mesage: 'not an uuid format' }));
      } else {
        const getUser = await this.userService.findById(id);
        if (Object.keys(getUser).length === 0) {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: 'User not found' }));
        } else {
          const body: string = await parseData(request);
          const { username, age, hobbies } = JSON.parse(body);

          const user: User = {
            id: getUser[0].id,
            username: username || getUser[0].username,
            age: age || getUser[0].age,
            hobbies: hobbies || getUser[0].hobbies,
          };

          if (!validateInfo(user.username, user.age, user.hobbies)) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'Inccorect data types entered' }));
          } else {
            await this.userService.update(id, user);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end();
          }
        }
      }
    } catch (err) {
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }

  public async deleteUser(request: any, response: any, id: string) {
    try {
      if (!checkID(id)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ mesage: 'not an uuid format' }));
      }

      const getUser = await this.userService.findById(id);

      if (Object.keys(getUser).length === 0) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'User Not Found' }));
      } else {
        await this.userService.delete(id);
        response.writeHead(204, { 'Content-Type': 'application/json' });
        response.end();
      }
    } catch (err) {
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }
}
