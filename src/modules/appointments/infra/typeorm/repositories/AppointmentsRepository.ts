import { getRepository, Repository, Raw } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import IFindMonthAvailabilityFromProviderDTO from '@modules/appointments/dtos/IFindMonthAvailabilityFromProviderDTO';
import IFindDayAvailabilityFromProviderDTO from '@modules/appointments/dtos/IFindDayAvailabilityFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    providerId,
    userId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id: providerId,
      user_id: userId,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }

  public async findMonthAvailabilityFromProvider({
    providerId,
    month,
    year,
  }: IFindMonthAvailabilityFromProviderDTO): Promise<Appointment[]> {
    const parsedDate = `${String(month).padStart(2, '0')}-${year}`;

    const founAppointments = await this.ormRepository.find({
      where: {
        provider_id: providerId,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedDate}'`,
        ),
      },
    });

    return founAppointments;
  }

  public async findDayAvailabilityFromProvider({
    providerId,
    day,
    month,
    year,
  }: IFindDayAvailabilityFromProviderDTO): Promise<Appointment[]> {
    const parsedDate = `${String(day).padStart(2, '0')}-${String(
      month,
    ).padStart(2, '0')}-${year}`;

    const founAppointments = await this.ormRepository.find({
      where: {
        provider_id: providerId,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDate}'`,
        ),
      },
    });

    return founAppointments;
  }
}

export default AppointmentsRepository;
