import { AppointmentHoursService } from "../../core/services/AppointmentHoursService";

const defaultOpeningHours: string[] = [
  "08:00:00",
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
];

const millisecondsInADay = 24 * 60 * 60 * 1_000;

export class AppointmentHoursServiceImpl implements AppointmentHoursService {
  private openingDays: Set<number>;

  constructor(
    private listDaysInAdvance: number = 3,
    openingDays: number[] = [1, 2, 3, 4, 5],
    private openingHours: string[] = defaultOpeningHours
  ) {
    this.openingDays = new Set(openingDays);
  }

  async listNextHours(): Promise<Date[]> {
    const allHours: Date[] = [];
    let generatedDays = 0;

    for (let i = 0; generatedDays < this.listDaysInAdvance; i += 1) {
      const timeOffset = millisecondsInADay * i;
      const date = new Date(Date.now() + timeOffset);
      if (!this.openingDays.has(date.getDay())) continue;

      const day = AppointmentHoursServiceImpl.getDayString(date);

      for (const hour of this.openingHours) {
        allHours.push(new Date(`${day} ${hour}`));
      }

      if (allHours.at(-1)?.getTime() ?? 0 >= Date.now()) {
        generatedDays += 1;
      }
    }

    const futureHours = allHours.filter((h) => h.getTime() > Date.now());

    return futureHours;
  }

  private static getDayString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
