import { IDuration } from '@/types/date'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
import en from 'dayjs/locale/en'

dayjs.locale(en)
dayjs.locale(fr)

const isBefore = (date1: Date, date2: Date): boolean => {
    return dayjs(date1).isBefore(dayjs(date2))
}

const isAfter = (date1: Date, date2: Date): boolean => {
    return dayjs(date1).isAfter(dayjs(date2))
}

const dayBetweenTwoDates = (date1: Date, date2: Date): number => {
    return dayjs(date1).diff(dayjs(date2), 'day')
}

const monthBetweenTwoDates = (date1: Date, date2: Date): number => {
    return dayjs(date1).diff(dayjs(date2), 'month')
}

const yearBetweenTwoDates = (date1: Date, date2: Date): number => {
    return dayjs(date1).diff(dayjs(date2), 'year')
}

const durationBetweenTwoDates = (date1: Date, date2: Date): IDuration => {
    if (yearBetweenTwoDates(date1,date2) > 0) return {duration: yearBetweenTwoDates(date1,date2),type: 2}
    if (monthBetweenTwoDates(date1,date2) > 0) return {duration: monthBetweenTwoDates(date1,date2),type: 1}
    return {duration: dayBetweenTwoDates(date1,date2),type: 0}
}

const formatDate = (date: Date): string => {
    return dayjs(date).format('DD MMMM, YYYY')
}

const dateFormat = (dateString: string): string => {
        const parts = dateString.split('/')
        return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1,  parseInt(parts[0], 10)).toISOString()
}

export {
    isBefore,
    isAfter,
    dayBetweenTwoDates,
    monthBetweenTwoDates,
    yearBetweenTwoDates,
    durationBetweenTwoDates,
    formatDate,
    dateFormat,
}