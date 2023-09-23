interface UserInterface {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export class User implements UserInterface {
  public id: string = "";

  public username: string = "";

  public age: number = -1;

  public hobbies: string[] = [];

  constructor(props: User) {
    Object.assign(this, props);
  }
}
