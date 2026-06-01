import { GrassField } from './grass'

const canvas = document.getElementById('grassCanvas') as HTMLCanvasElement
const h1 = document.querySelector('h1') as HTMLElement
const instructions = document.getElementById('instructions') as HTMLElement
const stateEl = document.getElementById('state') as HTMLElement
const windToggle = document.getElementById('wind-toggle')   as HTMLButtonElement
const windSlider = document.getElementById('wind-strength') as HTMLInputElement
const windWrap = document.getElementById('wind-slider-wrap') as HTMLElement

const field = new GrassField(canvas, {
  onIdle: () => {
    h1.classList.add('overgrown')
    stateEl.textContent = 'overgrowth'
    stateEl.classList.add('overgrown')
    instructions.textContent = 'Field idle — natural overgrowth activated'
    instructions.classList.add('highlight')
  },
  onInteract: () => {
    h1.classList.remove('overgrown')
    stateEl.textContent = ''
    stateEl.classList.remove('overgrown')
    instructions.textContent = windOn
      ? 'Wind active — adjust strength with slider'
      : 'Interact to agitate. Leave idle to watch overgrowth'
    instructions.classList.remove('highlight')
  },
})

let windOn = false

windToggle.addEventListener('click', () => {
  windOn = !windOn
  windToggle.classList.toggle('active', windOn)
  document.getElementById('wind-label')!.textContent = windOn ? 'wind on' : 'wind off'
  windWrap.classList.toggle('visible', windOn)
  field.setWind(windOn ? sliderToStrength(windSlider.value) : 0)

  instructions.textContent = windOn
    ? 'Wind active — adjust strength with slider'
    : 'Interact to agitate. Leave idle to watch overgrowth'
  instructions.classList.add('highlight')
  setTimeout(() => instructions.classList.remove('highlight'), 2000)
})

windSlider.addEventListener('input', () => {
  if (windOn) field.setWind(sliderToStrength(windSlider.value))
})

function sliderToStrength(val: string): number {
  const v = parseInt(val)
  return 0.25 + ((v - 1) / 9) * 4.25
}

field.start()