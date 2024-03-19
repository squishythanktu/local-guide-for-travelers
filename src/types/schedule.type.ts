import { BusyDate } from 'src/enums/busy-date.enum'

export type BusySchedule = {
  id: number
  busyDate: Date
}

export type ScheduleLists = { busyDayOfGuider: Date[]; busyDayByBooking: Date[] }

export type DayInSchedule = {
  id: number
  busyDate: Date
  typeBusyDayEnum: BusyDate
}
