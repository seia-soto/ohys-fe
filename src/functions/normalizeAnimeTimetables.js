import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

export default data => {
  dayjs.extend(utc)

  const currentDay = dayjs().day()
  const results = []

  for (let i = 0, l = data.length; i < l; i++) {
    const item = data[i]

    let day = Number(item.airingDay)

    if (!item.airingTime || day > 6) continue

    let [hour, minute] = item.airingTime.split(':')

    hour = Number(hour)
    minute = Number(minute)

    if (minute >= 60) {
      minute -= 60
      hour += 1
    }
    if (hour >= 24) {
      hour -= 24
      day += 1
    }

    day += 1

    if (day > 6) {
      day = 0
    }

    let time = dayjs()
      .day(day)
      .hour(hour)
      .minute(minute)
      .utcOffset(9, true)

    // NOTE: set the start point to today;
    if (day < currentDay) time = time.add(7, 'day')

    item.schedule = {
      day,
      hour,
      minute,
      time
    }

    results.push(item)
  }

  return results
}
