import { GPIOController, GPIOOutputLine } from 'gpiod-client'
import { Pins } from './setup/pins'
import { SPIDev } from 'spi-dev'
import { SSD1306Setup } from './setup'
import { convertLinearToPages } from './memory-mapping/convert-l2p'

/**
 * @see https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf
 */
export class SSD1306 {
    private readonly gpio: GPIOController
    private readonly spidev: SPIDev

    private readonly RES: GPIOOutputLine
    private readonly CS: GPIOOutputLine
    private readonly DC: GPIOOutputLine

    public readonly setup: SSD1306Setup

    private readonly content: Uint8Array
    private readonly height = 64
    private readonly width = 128


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

        this.content = new Uint8Array((this.width >> 3) * this.height)
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

    public putContent(x: number, y: number, width: number, height: number, data: Uint8Array): void {
        if ((x % 8) || (width % 8)) {
            throw new RangeError('X and width must be 8 pixels aligned')
        }

        x >>= 3
        width >>= 3
        for (let row = 0; row < height; row++) {
            this.content.set(data.slice(row * width, row * width + width), (y + row) * (this.width >> 3) + x)
        }
    }

    public setContent(data: Uint8Array, offset = 0): void {
        this.content.set(data, offset)
    }

    public clear(value: 0 | 1 = 0): void {
        this.content.fill(value)
    }

    public sendContentToDisplay(): void {
        this.setup.setMemoryAddressingMode('horizontal')
        this.setup.setColumnAddress(0, 127)
        this.setup.setPageAddress(0, 7)
        this.setup.setPageStart(0)

        this.sendData(convertLinearToPages(this.width, this.height, this.content))
    }

    public release(): void {
        this.spidev.close()
        this.gpio.close()
    }
}
