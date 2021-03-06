import {
  IUserDTO,
  IUserSecondaryDatabasePort,
} from "../../../../domain/entities/user/port";
import { User } from "../../../../domain/entities/user/user";

class UserRepository implements IUserSecondaryDatabasePort {
  private usersStorage: User[];

  private static INSTANCE: UserRepository;

  private constructor() {
    this.usersStorage = [];
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository();
    }
    return UserRepository.INSTANCE;
  }

  async createUser({ email, username }: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      email,
      username,
    });

    await this.usersStorage.push(user);

    return user;
  }

  async all(): Promise<User[]> {
    const users = await this.usersStorage;
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersStorage.find((user) => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersStorage.find((user) => user.id === id);
    return user;
  }

  async deleteById(id: string): Promise<void> {
    this.usersStorage = await this.usersStorage.filter(
      (user) => user.id !== id
    );
  }
}

export { UserRepository };
