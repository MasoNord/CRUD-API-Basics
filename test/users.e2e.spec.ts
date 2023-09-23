import { StatusCodes } from './interface/http.status.codes';
import { AppController } from '../src/app/app.controller';
import { UserController } from '../src/app/user/user.controller';
import { UserService } from '../src/app/user/users.service';
import { User } from '../src/app/user/entities/user.entity';
import request from 'supertest';

const server = new AppController(new UserController(new UserService())).getSever();

const testId = 'a94fd38c-d30d-40a3-9b52-af324e5ffa7f';
const dummyId = '8a28c588-466a-4a2d-ad7c-41e0385a35e2';
const wrongId = '466a-4a2d';

const createUser = {
  id: testId,
  username: 'Molly',
  age: 19,
  hobbies: ['Reading', 'Swimming', 'Listening music', 'Walking on fresh air'],
};

const createDummyUser = {
  id: testId,
  username: 138420432,
  age: 19,
  hobbies: [],
};

const createLiteUser = {
  id: testId,
  username: 'Donny',
};

const updateUserData = {
  age: 32,
};

const incorrectUpdateUserData = {
  age: '32',
};

describe('USERS', () => {
  const commonHeaders = { Accept: 'application/json' };

  describe('GET ', () => {
    it('should correctly get all users', async () => {
      const response = await request(server).get('/api/users').set(commonHeaders);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
    it('should correctly get user by id', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      const { id } = creationResponse.body;
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const response = await request(server).get(`/api/users/${id}`).set(commonHeaders);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Object);
    });
    it("should perform bad request in case if was recived wrong id's format", async () => {
      const response = await request(server).get(`/api/users/${wrongId}`).set(commonHeaders);
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it('should perform not found request in case if record does not exist', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const response = await request(server).get(`/api/users/${dummyId}`).set(commonHeaders);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('POST', () => {
    it("should correctly create new user's record", async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);
      expect(creationResponse.body).toBeInstanceOf(Object);
    });
    it('should perform bad request in case if was recived invalid data types', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createDummyUser);
      expect(creationResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it('should perform bad request in case if was re not all fields', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createLiteUser);
      expect(creationResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('PUT', () => {
    it("should correctly change user's data", async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);

      const { id } = creationResponse.body;

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const updateResponse = await request(server).put(`/api/users/${id}`).set(commonHeaders).send(updateUserData);
      expect(updateResponse.status).toBe(StatusCodes.OK);
      expect(updateResponse.body).toBeInstanceOf(Object);
    });
    it('should perform not found request in case if was recived non existing id', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const updateResponse = await request(server).put(`/api/users/${dummyId}`).set(commonHeaders).send(updateUserData);
      expect(updateResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
    it('should perform bad request in case if was recived ivalid data types', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const { id } = creationResponse.body;

      const updateResponse = await request(server)
        .put(`/api/users/${id}`)
        .set(commonHeaders)
        .send(incorrectUpdateUserData);
      expect(updateResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it("should perform bad request in case if was recived wrong id's format", async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const updateResponse = await request(server)
        .put(`/api/users/${wrongId}`)
        .set(commonHeaders)
        .send(incorrectUpdateUserData);
      expect(updateResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('DELETE', () => {
    it("should correclty delete user's record", async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const { id } = creationResponse.body;

      const deleteResponse = await request(server)
        .delete(`/api/users/${id}`)
        .set(commonHeaders)
        .send(incorrectUpdateUserData);
      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });
    it('should perform bad request in case if was recived wrong id format', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const deleteResponse = await request(server)
        .delete(`/api/users/${wrongId}`)
        .set(commonHeaders)
        .send(incorrectUpdateUserData);
      expect(deleteResponse.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it('should perform not found request in case if was recived non existing id', async () => {
      const creationResponse = await request(server).post('/api/users').set(commonHeaders).send(createUser);
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const deleteResponse = await request(server)
        .delete(`/api/users/${dummyId}`)
        .set(commonHeaders)
        .send(incorrectUpdateUserData);
      expect(deleteResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
