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
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }

  public async getUser(request: any, response: any, id: string) {    
    try {
      if (!checkID(id)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ mesage: 'Wrong format of id' }));
      }
      const user = await this.userService.findById(id);
      if (user === null) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'User Not Found' }));
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(user));
      }
    } catch (err) {
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
      }else {
        const newUser = await this.userService.create(user);

        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(newUser));
      }
    } catch (err) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
      console.log(err);
    }
  }

  public async updateUser(request: any, response: any, id: string) {
    try {
      if (!checkID(id)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ mesage: 'Wrong format of id' }));
      }
      const getUser = await this.userService.findById(id);
      
      if (getUser === null) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'User not found' }));
      }else {
        const body: string = await parseData(request);
        const { username, age, hobbies } = JSON.parse(body);
        
        const user: User = {
          id: getUser.id,
          username: username || getUser.username,
          age: age || getUser.age,
          hobbies: hobbies || getUser.hobbies,
        };

        if (!validateInfo(user.username, user.age, user.hobbies)) {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: 'Inccorect data types entered' }));
        }else {
          const updatedUser: User | null = await this.userService.update(id, user);

          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({updatedUser}));
        }
      }
    } catch (err) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }

  public async deleteUser(request: any, response: any, id: string) {
    try {
      if (!checkID(id)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ mesage: 'Wrong format of id' }));
      }
      
      const userIndex = await (await this.userService.findAll()).findIndex((u) => u.id === id);

      if (userIndex === -1) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'User Not Found' }));
      } else {
        await this.userService.delete(userIndex);
        response.writeHead(204, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: `User ${id} was removed` }));
      }
    } catch(err) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }
}
