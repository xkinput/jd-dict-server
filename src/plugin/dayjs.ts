import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/zh-cn'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import devHelper from 'dayjs/plugin/devHelper'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.locale('zh-cn')
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(isBetween)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

if (process.env.NODE_ENV === 'development') {
  dayjs.extend(devHelper)
}

dayjs.tz.setDefault('Asia/Shanghai')

export default dayjs
