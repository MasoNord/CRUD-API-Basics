import { StatusCodes } from './interface/http.status.codes';
import { AppController } from '../src/app/app.controller';
import { UserController } from '../src/app/user/user.controller';
import { UserService } from '../src/app/user/users.service';
import { pool } from '../src/database';
import request, { agent } from 'supertest';
import { port } from '../src/config';

const server = new AppController(new UserController(new UserService())).getSever();

const dummyId = '8a28c588-466a-4a2d-ad7c-41e0385a35e2';
const wrongId = '466a-4a2d';

const createUser = {
  username: 'Molly',
  age: 19,
  hobbies: ['Reading', 'Swimming', 'Listening music', 'Walking on fresh air'],
};

const createDummyUser = {
  username: 138420432,
  age: 19,
  hobbies: [],
};

const createLiteUser = {
  username: 'Donny',
};

const updateUserData = {
  age: 32,
};

const incorrectUpdateUserData = {
  age: '32',
  username: 'Karl',
  hobbies: [],
};

describe('USERS', () => {
  const commonHeaders = { Accept: 'application/json' };
  let app;
  beforeEach(() => {
    app = server.listen(port, () => {
      global.agent = request.agent(server);
    });
  });

  afterEach(() => {
    app.close();
  });

  describe('GET ', () => {
    it('should correctly get all users', async () => {
      const response = await request(server).get('/api/users').set(commonHeaders);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
    it('should correctly get user by id', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      const id: string = creationResponse.body.newUser.id;
      const response = await request(server).get(`/api/users/${id}`).set(commonHeaders);

      const deleteResponse = await request(server).delete(`/api/users/${id}`).set(commonHeaders);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Object);

      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });
    it("should perform bad request in case if was recived wrong id's format", async () => {
      const response = await request(server).get(`/api/users/${wrongId}`).set(commonHeaders);
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it('should perform not found request in case if record does not exist', async () => {
      const response = await request(server).get(`/api/users/${dummyId}`).set(commonHeaders);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('POST', () => {
    it("should correctly create new user's record", async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      const id: string = creationResponse.body.newUser.id;
      const deleteResponse = await request(server).delete(`/api/users/${id}`).set(commonHeaders);

      expect(creationResponse.status).toBe(StatusCodes.CREATED);
      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });
    it('should perform bad request in case if was recived invalid data types', async () => {
      const creationResponse = await request(server)
        .post('/api/users')
        .set(commonHeaders)
        .send(incorrectUpdateUserData);
      expect(creationResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it('should perform bad request in case if was filled not all fields', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createLiteUser);
      expect(creationResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('PUT', () => {
    it("should correctly change user's data", async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      const id: string = creationResponse.body.newUser.id;

      const updateResponse = await request(server).put(`/api/users/${id}`).set(commonHeaders).send(updateUserData);
      const deleteResponse = await request(server).delete(`/api/users/${id}`).set(commonHeaders);

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      expect(updateResponse.status).toBe(StatusCodes.OK);

      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });
    it('should perform not found request in case if was recived non existing id', async () => {
      const updateResponse = await request(server).put(`/api/users/${dummyId}`).set(commonHeaders);
      expect(updateResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
    it('should perform bad request in case if was recived ivalid data types', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      const id: string = creationResponse.body.newUser.id;
      const updateResponse = await request(server)
        .put(`/api/users/${id}`)
        .set(commonHeaders)
        .send(incorrectUpdateUserData);

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      expect(updateResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it("should perform bad request in case if was recived wrong id's format", async () => {
      const updateResponse = await request(server).put(`/api/users/${wrongId}`).set(commonHeaders);
      expect(updateResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('DELETE', () => {
    it("should correclty delete user's record", async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      const id: string = creationResponse.body.newUser.id;
      const deleteResponse = await request(server).delete(`/api/users/${id}`).set(commonHeaders);

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });
    it('should perform bad request in case if was recived wrong id format', async () => {
      const deleteResponse = await request(server).delete(`/api/users/${wrongId}`).set(commonHeaders);
      expect(deleteResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it('should perform not found request in case if was recived non existing id', async () => {
      const deleteResponse = await request(server).delete(`/api/users/${dummyId}`).set(commonHeaders);
      expect(deleteResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
