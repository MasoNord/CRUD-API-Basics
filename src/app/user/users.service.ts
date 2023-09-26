import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUser } from './dto/create-user.dto';
import { pool } from '../../database';
import { parseHobbiesArray } from '../util/parseHobbiesArray';

export class UserService {
  private static users: User[] = [];

  public async findAll(): Promise<any> {
    const sql = 'SELECT * FROM `users`';
    const users = await pool.query(sql);

    return await users[0];
  }
  public async findById(id: string): Promise<any> | null {
    const sql = 'SELECT * FROM `users` WHERE `id` = ?';
    const user = await pool.query(sql, [id]);

    return await user[0];
  }
  public async create(user: CreateUser): Promise<any> {
    const hobbies = parseHobbiesArray(user.hobbies);
    const data = { id: uuidv4(), username: user.username, age: user.age, hobbies: hobbies };
    const sql = 'INSERT INTO `users` SET ?';

    await pool.query('INSERT INTO `users` SET ?', data);

    return data;
  }

  public async update(id: string, user: User): Promise<void> {
    const hobbies = parseHobbiesArray(user.hobbies);
    const newUser = { username: user.username, age: user.age, hobbies: hobbies };

    const sql = 'UPDATE `users` set ? WHERE id = ?';
    const updatedUser = await pool.query(sql, [newUser, id]);
  }

  public async delete(id: string): Promise<void> {
    const sql = 'DELETE FROM `users` WHERE id = ?';
    await pool.query(sql, [id]);
  }
}
