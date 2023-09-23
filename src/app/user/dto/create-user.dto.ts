interface createUserInterface {
  username: string;
  age: number;
  hobbies: string[];
}

export class CreateUser implements createUserInterface {
  public username: string = "";
  public age: number = 0;
  public hobbies: string[] = [];
}
