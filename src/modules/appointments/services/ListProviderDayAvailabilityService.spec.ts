import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should list the day availability from a provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: '123123123',
      userId: '321321321',
      date: new Date(2020, 7, 15, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: '123123123',
      userId: '321321321',
      date: new Date(2020, 7, 15, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 15, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      providerId: '123123123',
      year: 2020,
      month: 8,
      day: 15,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 11,
          available: false,
        },
        {
          hour: 12,
          available: false,
        },
        {
          hour: 13,
          available: true,
        },
        {
          hour: 14,
          available: true,
        },
        {
          hour: 15,
          available: false,
        },
        {
          hour: 16,
          available: true,
        },
        {
          hour: 17,
          available: true,
        },
      ]),
    );
  });
});
