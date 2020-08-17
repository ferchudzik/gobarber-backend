import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 16, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 7, 16, 13),
      providerId: '123',
      userId: '321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('date');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not create two appointments with same time', async () => {
    await createAppointment.execute({
      date: new Date(2020, 8, 1, 12),
      providerId: '123',
      userId: '321',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 8, 1, 12),
        providerId: '123',
        userId: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 16, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 16, 11),
        providerId: '123',
        userId: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an appointment with same user as a provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 16, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 16, 17),
        providerId: '123',
        userId: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an appointment outside of the defined worktime', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 16, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 17, 7),
        providerId: '123',
        userId: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 17, 18),
        providerId: '123',
        userId: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
