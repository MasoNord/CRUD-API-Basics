import { StatusCodes } from './interface/http.status.codes';
import { AppController } from '../src/app/app.controller';
import { UserController } from '../src/app/user/user.controller';
import { UserService } from '../src/app/user/users.service';
const request = require("supertest");
const server = new AppController(new UserController(new UserService())).getSever();


describe('USERS', () => {
    const commonHeaders = { Accept: 'application/json' };
     
    describe("GET ", () => {
        it('should correctly get all users', async () => {
            const response = await request(server)
            .get('/api/users')
            .set(commonHeaders)

            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
})