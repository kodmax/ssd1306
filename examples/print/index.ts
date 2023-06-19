import { print1Bit } from 'bdf-print'
import { SSD1306 } from '../../src/ssd1306'
import font from './14-Rockbox-Mix.bdf.json'

const ssd1306 = new SSD1306('gpiochip0', '/dev/spidev0.0', {
    RES: 24,
    DC: 25,
    CS: 22
})

setInterval(() => {
    ssd1306.putContent(0,0,128,14, print1Bit(font, 14, 128, new Date().toISOString()))
}, 1)

