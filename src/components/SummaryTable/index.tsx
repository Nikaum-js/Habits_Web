import { useEffect, useState } from 'react'
import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-beginning'
import { HabitDayNull } from '../HabitDayNull'
import { HabitDay } from '../HabitDay'
import { api } from '../../lib/axios'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', ' S', 'S']
const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

interface Summary {
  id: string
  date: string
  amount: number
  completed: number
}

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([])

  useEffect(() => {
    api.get('summary').then((response) => {
      setSummary(response.data)
    })
  }, [])
  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return <HabitDayNull key={index} />
          })}
      </div>
    </div>
  )
}
