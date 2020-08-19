import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should list the appointments from a provider on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      providerId: '123123123',
      userId: '321321321',
      date: new Date(2020, 6, 15, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      providerId: '123123123',
      userId: '321321321',
      date: new Date(2020, 6, 15, 9, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      providerId: '123123123',
      year: 2020,
      month: 7,
      day: 15,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
