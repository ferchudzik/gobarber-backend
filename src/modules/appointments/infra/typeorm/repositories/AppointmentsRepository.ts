import { getRepository, Repository, Raw } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import IFindMonthAvailabilityFromProviderDTO from '@modules/appointments/dtos/IFindMonthAvailabilityFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id: providerId,
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
}

export default AppointmentsRepository;
