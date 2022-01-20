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
    const userAlreadyExists = await this.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error("user already exists");
    }

    const user = new User({ email, username });

    await this.usersStorage.push(user);

    return user;
  }

  async list(): Promise<User[]> {
    const users = await this.usersStorage;
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersStorage.find((user) => user.email === email);
    return user;
  }
}

export { UserRepository };
