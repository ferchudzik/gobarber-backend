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
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('date');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not create two appointments with same time', async () => {
    await createAppointment.execute({
      date: new Date(2020, 8, 1, 12),
      providerId: '123',
    });

    expect(
      createAppointment.execute({
        date: new Date(2020, 8, 1, 12),
        providerId: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
