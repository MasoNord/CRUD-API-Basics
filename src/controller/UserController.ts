// Here we are going to implement controlling of status
// Iteracte with module and data 

import jsonUser from "../data/users.json";
import { UserModule } from "../module/UserModule";
import { getData } from "../util/getPostData";
import { checkPOST } from "../util/checkPOST";

export class UserController {
    
    public async getUsers(request, response) {
        try {
            const userModule = new UserModule();
            const users = await userModule.findAll();

            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify(users));
        }catch(err) {
            response.writeHead(500, {"Content-Type": "application/json"});
            response.end(JSON.stringify({message: "Internal Server Error"}));
        }
    }

    public async getUser(request, response, id) {
        try {
            const userModule = new UserModule();
            const user = await userModule.findById(id);
            if (user === undefined  ) {
                response.writeHead(400, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: "User Not Found"}));
            }else {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify(user));
            }     
        }catch(err) {
            response.writeHead(500, {"Content-Type": "application/json"});
            response.end(JSON.stringify({message: "Internal Server Error"}));
        }
    }

    public async createUser(request, response) {
        try {
            const userModule = new UserModule();
            const body: string = await getData(request);
            const {username, age, hobbies} = JSON.parse(body);

            const user = {
                username,
                age,
                hobbies
            }

            if (!checkPOST(user))
                throw new Error();
                
            const newUser = await userModule.create(user);
        
            response.writeHead(201, {"Content-Type": "application/json"});
            response.end(JSON.stringify(newUser));
        
        }catch({}) {
            response.writeHead(400, {"Content-Type": "application/json"});
            response.end(JSON.stringify({message: "Bode does not contain required fields"}));
        }
    }

    public async updateUser(request, response, id) {
        try {
            
            const userModule = new UserModule();

            const getUser = await userModule.findById(id);

            if (getUser === undefined) {
                request.writeHead(404, {"Content-Type": "application/json"});
                request.end(JSON.stringify({message: "User not found"}));
            }else {
                const body: string = await getData(request);

                const {username, age, hobbies} = JSON.parse(body);
                const userIndex = jsonUser.findIndex((p) => p.id === id);

                const user = {
                    username: username || jsonUser[userIndex].username, 
                    age: age || jsonUser[userIndex].age, 
                    hobbies: hobbies || jsonUser[userIndex].hobbies 
                }
                    
                const updatedUser = await userModule.update(id, user);
            
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify(updatedUser));    
            }
        }catch(err) {
            response.writeHead(500, {"Content-Type": "application/json"});
            response.end(JSON.stringify({message: "Internal Server Error"}));
        }
    }

    public async deleteUser(request, response, id) {
        try {
            const userModule = new UserModule();
            const user = await userModule.findById(id);
    
            if (user === undefined  ) {
                response.writeHead(400, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: "User Not Found"}));
            }else {
                await userModule.delete(id)
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: `User ${id} was removed`}));
            }
        }catch {
            response.writeHead(500, {"Content-Type": "application/json"});
            response.end(JSON.stringify({message: "Internal Server Error"}));
        }
    }
}