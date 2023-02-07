import { Check } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { api } from '../../lib/axios'
import { CheckboxWeekDay } from '../Checkbox/CheckboxWeekDay'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      alert('Por favor, Preencha os campos!')
    }

    await api.post('habits', {
      title,
      weekDays,
    })

    setTitle('')
    setWeekDays([])

    alert('Hábito criado com sucesso!')
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemoveOne = weekDays.filter((day) => day !== weekDay)

      setWeekDays(weekDaysWithRemoveOne)
    } else {
      const weekDaysWithRemoveOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithRemoveOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual é o seu comprometimento
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual é a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekday, index) => (
          <CheckboxWeekDay
            key={index}
            getWeekDays={() => handleToggleWeekDay(index)}
            checked={weekDays.includes(index)}
            title={weekday}
          />
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center hover:bg-green-500 font-semibold bg-green-600 gap-3"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
