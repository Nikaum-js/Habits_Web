import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

interface CheckBoxProps {
  title: string
  getWeekDays: () => void
}

export function CheckboxWeekDay(props: CheckBoxProps) {
  return (
    <div className="flex flex-col gap-3">
      <CheckboxRadix.Root
        className="flex items-center gap-3 group"
        onCheckedChange={props.getWeekDays}
      >
        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
          <CheckboxRadix.Indicator>
            <Check size={20} className="text-white" />
          </CheckboxRadix.Indicator>
        </div>

        <span className="font-semibold text-white leading-tight">
          {props.title}
        </span>
      </CheckboxRadix.Root>
    </div>
  )
}