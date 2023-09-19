import http from 'http';
import { UserController } from './user/user.controller';
import { checkID } from '../app/util/checkID';

export class AppController {
  constructor(private readonly userController: UserController) {}

  private server = http.createServer((request, response) => {
    try {
      if (request.url === '/api/users' && request.method === 'GET') {
        this.userController.getUsers(request, response);
      } else if (request.url.match(/\/api\/users\/.+/) && request.method === 'GET') {
        const id = request.url.split('/')[3];

        if (!checkID(id)) throw new Error("Inccorect form of an user's id");

        this.userController.getUser(request, response, id);
      } else if (request.url === '/api/users' && request.method === 'POST') {
        this.userController.createUser(request, response);
      } else if (request.url.match(/\/api\/users\/.+/) && request.method === 'PUT') {
        const id = request.url.split('/')[3];

        if (!checkID(id)) throw new Error("Inccorect form of an user's id");

        this.userController.updateUser(request, response, id);
      } else if (request.url.match(/\/api\/users\/.+/) && request.method === 'DELETE') {
        const id = request.url.split('/')[3];

        if (!checkID(id)) throw new Error();

        this.userController.deleteUser(request, response, id);
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ mesage: 'Route Not Found' }));
      }
    } catch ({}) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ mesage: `${"Inccorect form of an user's id"}` }));
    }
  });

  public getSever() {
    return this.server;
  }
}
