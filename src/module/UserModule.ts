import {v4 as uuidv4} from "uuid";

import {writeData} from "../util/writeData";
import { Data } from "../data/Data";

const objData = new Data();

export class UserModule {
   
    public findAll() {
        return new Promise((resolve, reject) => {
            // resolve(jsonUser);
            resolve(objData.getStorage());
        });
    }
    public findById(id) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < objData.getStorage().length; ++i) {
                if (objData.getStorage()[i].id === id)
                    resolve(objData.getStorage()[i]);
            }
            resolve(undefined);
        });
    }

    public create(user) {
        return new Promise((resolve, reject) => {
            const newUser = {id: uuidv4(), ...user};
            objData.addNewUser(newUser);
            resolve(newUser);
        })
    }

    public update(id, user) {
        return new Promise((resolve, reject) => {
            var userIndex = objData.getUserIndex(id);
            objData.getStorage()[userIndex] = {id, ...user};
            resolve(objData.getStorage()[userIndex]);
        })
    }

    public delete(id) {
        return new Promise((resolve, reject) => {
            var userIndex = objData.getUserIndex(id);
            objData.getStorage().splice(userIndex, 1);

            resolve ({});

        })
    }
}