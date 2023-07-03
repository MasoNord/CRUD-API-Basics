import http from 'http';
import { UserController } from './src/controller/UserController';
import { checkID } from './src/util/checkID';
import dotenv from 'dotenv';

export async function main() {
    dotenv.config();
    const server = http.createServer((request, response) => {
        
        const userController = new UserController();
        try {
            if(request.url === "/api/users" && request.method === "GET") {
                userController.getUsers(request, response);
            }
            else if(request.url.match(/\/api\/users\/.+/) && request.method === "GET") {
                const id = request.url.split('/')[3];

                if(!checkID(id))
                throw new Error("Inccorect form of an user's id");

                userController.getUser(request, response, id);
            }else if (request.url === "/api/users" && request.method === "POST") {
                userController.createUser(request, response);
            }
            else if(request.url.match(/\/api\/users\/.+/) && request.method === "PUT") {
                const id = request.url.split('/')[3];

                if(!checkID(id))
                    throw new Error("Inccorect form of an user's id");

                userController.updateUser(request, response, id);
            }
            else if(request.url.match(/\/api\/users\/.+/) && request.method === "DELETE") {
                const id = request.url.split('/')[3];

                if(!checkID(id))
                    throw new Error();

                userController.deleteUser(request, response, id);
            }
            else {
                response.writeHead(404, {"Content-Type": "application/json"});
                response.end(JSON.stringify({mesage: "Route Not Found"}));
            }
        }catch({}) {
            response.writeHead(400, {"Content-Type": "application/json"});
            response.end(JSON.stringify({mesage: `${"Inccorect form of an user's id"}`}));
        }
    })

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main();



/** 
 * TODO: writes tests for the apis
 * TODO: implement horizontal scaling for the current project
 * TODO: and also don't forget about small tiny things as such as: read prot from .end file, add two dfferents modes, etc
 */