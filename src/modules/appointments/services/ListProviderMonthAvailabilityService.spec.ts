import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should list the month availability from a provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: '123123123',
      userId: '321321321',
      date: new Date(2020, 6, 15, 8, 0, 0),
    });

    const promisesArray = [];

    for (let i = 8; i <= 17; i++) {
      promisesArray.push(
        fakeAppointmentsRepository.create({
          providerId: '123123123',
          userId: '321321321',
          date: new Date(2020, 7, 15, i, 0, 0),
        }),
      );
    }

    Promise.all(promisesArray);

    await fakeAppointmentsRepository.create({
      providerId: '123123123',
      userId: '321321321',
      date: new Date(2020, 6, 16, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: '123123123',
      year: 2020,
      month: 8,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 14,
          available: true,
        },
        {
          day: 15,
          available: false,
        },
        {
          day: 16,
          available: true,
        },
        {
          day: 17,
          available: true,
        },
      ]),
    );
  });
});
