import dayjs from 'dayjs'

export const formatDate = (date: Date | string, format: string) => dayjs(date).format(format)

export const formatTime = (timeString: string, currentFormat: string, desiredFormat: string) =>
  dayjs(timeString, currentFormat).format(desiredFormat)
