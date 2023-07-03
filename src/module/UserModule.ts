
import jsonUser from "../data/users.json";
import {v4 as uuidv4} from "uuid";

import {writeData} from "../util/writeData";

export class UserModule {
   
    public findAll() {
        return new Promise((resolve, reject) => {
            resolve(jsonUser);
        });
    }
    public findById(id) {
        return new Promise((resolve, reject) => {
            
            jsonUser.forEach((u) => {
                if (u.id.toString() === id) {
                    resolve(u);
                }
            });   
            resolve(undefined);
        });
    }

    public create(user) {
        return new Promise((resolve, reject) => {
            const newUser = {id: uuidv4(), ...user};
            jsonUser.push(newUser);
            writeData("./src/data/users.json", jsonUser);
            resolve(newUser);
        })
    }

    public update(id, user) {
        return new Promise((resolve, reject) => {
            const userIndex = jsonUser.findIndex((p) => p.id === id);
            jsonUser[userIndex] = {id, ...user};
            writeData("./src/data/users.json", jsonUser);
            resolve(jsonUser[userIndex]);
        })
    }

    public delete(id) {
        return new Promise((resolve, reject) => {
            writeData("./src/data/users.json", jsonUser.filter((p) => p.id !== id));
            resolve({});
        })
    }
}