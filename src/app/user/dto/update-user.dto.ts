interface updateUserInterfce {
  username: string;
  hobbies: string[];
}

export class UpdateUser implements updateUserInterfce {
  public username: string = '';
  public hobbies: string[] = [];
}
