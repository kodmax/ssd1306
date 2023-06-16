import { GPIOController, GPIOOutputLine } from 'gpiod-client'
import { Pins } from './setup/pins'
import { SPIDev } from 'spi-dev'
import { SSD1306Setup } from './setup'
import { Paged1BitContent } from './1-bit-paged-content'

/**
 * @see https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf
 */
export class SSD1306 {
    private readonly gpio: GPIOController
    private readonly spidev: SPIDev

    private readonly RES: GPIOOutputLine
    private readonly CS: GPIOOutputLine
    private readonly DC: GPIOOutputLine

    public readonly content: Paged1BitContent
    public readonly setup: SSD1306Setup

    public constructor(chipname: string, path: string, pins: Pins) {
        this.gpio = new GPIOController(chipname, 'this')

        this.RES = this.gpio.requestLineAsOutput(pins.RES, 0)
        this.CS = this.gpio.requestLineAsOutput(pins.CS, 1)
        this.DC = this.gpio.requestLineAsOutput(pins.DC, 0)

        this.spidev = new SPIDev(path, {
            MAX_SPEED_HZ: 10000000,
            SPI_LSB_FIRST: false,
            BITS_PER_WORD: 8,
            SPI_NO_CS: true,
            SPI_MODE: 0
        })

        this.content = new Paged1BitContent(this, 128, 64, new Uint8Array(1024))
        this.setup = new SSD1306Setup(this)

        this.reset()
    }

    public reset(): void {
        this.RES.trigger(0, 1000)
        this.setup.initialize()
    }

    public sendData(data: Uint8Array): void {
        this.DC.setValue(1)
        this.CS.setValue(0)

        this.spidev.transfer(data.byteLength, data)
        this.CS.setValue(1)
    }

    public sendCommand(cmd: number): void {
        this.DC.setValue(0)
        this.CS.setValue(0)

        this.spidev.transfer(1, Uint8Array.from([cmd]))
        this.CS.setValue(1)
    }


    public release(): void {
        this.spidev.close()
        this.gpio.close()
    }
}
