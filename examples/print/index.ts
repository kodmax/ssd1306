import { print1Bit } from 'bdf-print'
import { SSD1306 } from '../../src/ssd1306'
import terminus14 from './14-Terminus.bdf.json'
import terminus16 from './16-Terminus.bdf.json'

// https://github.com/mguentner/rockbox/blob/master/fonts/16-Terminus.bdf

const ssd1306 = new SSD1306('gpiochip0', '/dev/spidev0.0', {
    RES: 24,
    DC: 25,
    CS: 22
})

ssd1306.putText(terminus16, 16, 0, 16, 128, 'ąćęśźźńół!')
ssd1306.putText(terminus16, 16, 0, 32, 128, 'hi hi hello!')
ssd1306.putText(terminus16, 16, 0, 48, 128, '======')

setInterval(() => {
    ssd1306.putText(terminus16, 16, 0, 0, 128, new Date().toISOString().substring(11))
    ssd1306.sendContentToDisplay()    
}, 1)
