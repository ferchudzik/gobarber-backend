import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindMonthAvailabilityFromProviderDTO from '../dtos/IFindMonthAvailabilityFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findMonthAvailabilityFromProvider(
    data: IFindMonthAvailabilityFromProviderDTO,
  ): Promise<Appointment[]>;
}
