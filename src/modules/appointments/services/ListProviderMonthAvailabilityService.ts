import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  month: number;
  providerId: string;
  year: number;
}

type Response = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    month,
    year,
  }: IRequest): Promise<Response> {
    const appointments = await this.appointmentsRepository.findMonthAvailabilityFromProvider(
      {
        providerId,
        month,
        year,
      },
    );

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDay = Array.from(
      {
        length: daysInMonth,
      },
      (value, index) => index + 1,
    );

    const monthAvailability = eachDay.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });

    return monthAvailability;
  }
}

export default ListProviderMonthAvailabilityService;
