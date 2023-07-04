
interface Users {
    id:  string;
    username: string;
    age: number;
    hobbies: string[];
}

export class Data {
    private static StorageOfUsers: Users[];

    constructor() {
        Data.StorageOfUsers = []
    }

    public getStorage() {
        return Data.StorageOfUsers;
    }

    public addNewUser(value) {
        Data.StorageOfUsers.push(value);
    }

    public getUserIndex(id) : number {
        var result = 0;
        for (let i = 0; i < Data.StorageOfUsers.length; ++i) {
            if (Data.StorageOfUsers[i].id === id) {
                result = i;
                break;
            }
        }
        return result; 
    }
}
