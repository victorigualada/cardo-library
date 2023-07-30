import {AuthService} from './auth.service';
import {User} from '../entity/user.entity';

describe('Auth Service unit tests', () => {

  describe('#login', () => {

    it('should return access token', async () => {
      // arrange
      const user = {  username: 'test', password: 'test' } as User;
      const userService = {
        findOneByUsernameAuth: jest.fn().mockReturnValue(user),
      }
      const jwtService = {
        sign: jest.fn().mockReturnValue('token'),
      }
      const authService = new AuthService(userService as any, jwtService as any);

      // act
      const result = await authService.login(user);

      // assert
      expect(result.access_token).toBe('token');
    });

    it('should throw exception when user not found', async () => {
      // arrange
      const user = {  username: 'test', password: 'test' } as User;
      const userService = {
        findOneByUsernameAuth: jest.fn().mockReturnValue(undefined),
      }
      const authService = new AuthService(userService as any, undefined as any);

      // act
      const reult = authService.login(user);

      // assert
      await expect(reult)
        .rejects
        .toThrow('Unauthorized');
    });
  });
});