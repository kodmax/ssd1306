import { getTextAsData } from './get-text-data'
import { SSD1306 } from '../../src/ssd1306'

const ssd1306 = new SSD1306('gpiochip0', '/dev/spidev0.0', {
    RES: 24,
    DC: 25,
    CS: 22
})

setInterval(() => {
    ssd1306.sendData(getTextAsData(new Date().toISOString()))
}, 1)

