import { SSD1306 } from '../../src/ssd1306'

const ssd1306 = new SSD1306('gpiochip0', '/dev/spidev0.0', {
    RES: 24,
    DC: 25,
    CS: 22
})

const data = new Uint8Array(1024)
for (let y = 0; y < 64; y++) {
    data.fill(y, y*16, y*16 + 15)
}

ssd1306.content.send1BitDisplayContent(data.buffer)
