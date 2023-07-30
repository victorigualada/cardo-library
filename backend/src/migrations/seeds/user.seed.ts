import { User } from '../../app/administration/entity/user.entity';

export const UserSeed: Partial<User> = {
    username: 'rehman',
    password: 'rehman',
    name: 'Rehman',
    lastName: 'Adil',
    email: 'rehman@rehman.com',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};
