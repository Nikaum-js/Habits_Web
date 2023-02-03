import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import { ProgressBar } from '../ProgressBar'

interface HabitDayProps {
  completed: number
  amount: number
}

export function HabitDay(props: HabitDayProps) {
  const completedPercentage = Math.round((props.completed / props.amount) * 100)

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 bg-zinc-900 border-zinc-800 rounded-lg', {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-pink-900 border-pink-700':
            completedPercentage >= 0 && completedPercentage < 20,
          'bg-pink-800 border-pink-600':
            completedPercentage >= 20 && completedPercentage < 40,
          'bg-pink-700 border-pink-500':
            completedPercentage >= 40 && completedPercentage < 60,
          'bg-pink-600 border-pink-500':
            completedPercentage >= 60 && completedPercentage < 80,
          'bg-pink-500 border-pink-400': completedPercentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] rounded-t-2xl bg-zinc-900 flex flex-col p-6">
          <span className="font-semibold text-zinc-400">segunda-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-2xl">
            17/01
          </span>

          <ProgressBar progress={completedPercentage} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
