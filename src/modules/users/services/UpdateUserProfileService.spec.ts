import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateUserProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should update an user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    const updatedUser = await updateUserProfile.execute({
      userId: user.id,
      name: 'John "Snow" Doe',
      email: 'john@email.com',
    });

    expect(updatedUser.name).toBe('John "Snow" Doe');
    expect(updatedUser.email).toBe('john@email.com');
  });

  it('should not update the user e-mail if e-mail already exists', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Mary Jane',
      email: 'mary@email.com',
      password: '123',
    });

    await expect(
      updateUserProfile.execute({
        userId: user.id,
        name: 'Mary Jane Second',
        email: 'john@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    const updatedUser = await updateUserProfile.execute({
      userId: user.id,
      name: 'John Doe',
      email: 'john@email.com',
      oldPassword: '123',
      newPassword: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not update the user password if the old password is not sent', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    await expect(
      updateUserProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'john@email.com',
        newPassword: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update the user password if the old password does not match', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    await expect(
      updateUserProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'john@email.com',
        oldPassword: 'not-matching-pass',
        newPassword: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update an user profile from non-existing user', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    await expect(
      updateUserProfile.execute({
        userId: 'non-existing-user-id',
        name: 'John Doe',
        email: 'john@email.com',
        oldPassword: 'not-matching-pass',
        newPassword: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
