import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IFindMonthAvailabilityFromProviderDTO from '@modules/appointments/dtos/IFindMonthAvailabilityFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id: providerId });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const founAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return founAppointment;
  }

  public async findMonthAvailabilityFromProvider({
    providerId,
    month,
    year,
  }: IFindMonthAvailabilityFromProviderDTO): Promise<Appointment[]> {
    const founAppointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return founAppointments;
  }
}

export default FakeAppointmentsRepository;
