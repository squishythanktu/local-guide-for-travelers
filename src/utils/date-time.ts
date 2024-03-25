import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { DateObject } from 'react-multi-date-picker'

dayjs.extend(relativeTime)

export const formatDate = (date: Date | string, format: string) => dayjs(date).format(format)

export const formatTime = (timeString: string, currentFormat: string, desiredFormat: string) =>
  dayjs(timeString, currentFormat).format(desiredFormat)

export const formatDateLocaleString = (dateTime: Date | string) =>
  dayjs(dateTime).locale('en').format('dddd, MMMM D, YYYY')

export const convertHourToUTC7 = (hour: string) => {
  return parseInt(hour.substring(0, 2)) + 7 + hour.substring(2)
}

export const convertDateToUTC7 = (date: Date) => {
  return new Date(date.getTime() + 25200000)
}

export const getRelativeTime = (specificTime: Date | string) => {
  return dayjs().to(dayjs(specificTime))
}

export const convertNormalDate = (date: DateObject) => {
  return new Date(date.year, date.monthIndex, date.day + 1).toISOString().replace('.000Z', '')
}

export const compareDate = (a: Date, b: Date) => {
  return new Date(a).getTime() - new Date(b).getTime()
}

export const DateArrayConvertToDateObjectArray = (dateArr: Date[]) => {
  return dateArr.map((item: Date) => {
    return new DateObject(item)
  })
}

export const isInArr = (date: Date, arr: Date[]) => {
  return arr.map((item) => new Date(item).getTime()).includes(new Date(date).getTime())
}
