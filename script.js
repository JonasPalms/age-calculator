const form = document.getElementById('form')

const yearsOutput = document.getElementById('years')
const monthsOutput = document.getElementById('months')
const daysOutput = document.getElementById('days')

const inputFields = document.getElementsByTagName('input')
const button = form.querySelector('button')

Array.from(inputFields).forEach((field, i) =>
  field.addEventListener('keyup', (e) => onChange(e, i))
)

function onChange(e, i) {
  if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.value.length - 1)
  }

  if (e.target.value.length === e.target.maxLength) {
    if (i === inputFields.length - 1) {
      button.focus()
    } else {
      inputFields[i + 1].focus()
    }
  }
}

const EPOCH = new Date(0)
const EPOCH_YEAR = EPOCH.getFullYear()
const EPOCH_MONTH = EPOCH.getMonth()
const EPOCH_DAY = EPOCH.getDate()

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  button.blur()

  const formData = new FormData(form)

  const day = formData.get('day')
  const month = formData.get('month') - 1
  const year = formData.get('year')

  const birthDate = new Date(year, month, day)
  const { days, months, years } = calculateAge(birthDate)

  yearsOutput.innerHTML = years
  monthsOutput.innerHTML = months
  daysOutput.innerHTML = days
}

function calculateAge(birthDate) {
  const diff = new Date(Date.now() - birthDate.getTime())

  return {
    years: Math.abs(diff.getFullYear() - EPOCH_YEAR),
    months: Math.abs(diff.getMonth() - EPOCH_MONTH),
    days: Math.abs(diff.getDate() - EPOCH_DAY),
  }
}
