import { GPIOController } from "gpiod-client"
import { Pins } from "./pins"
import { GPIOOutputLine } from "gpiod-client/dist/src/gpio-output-line"
import { SPIDev } from 'spi-dev'
import { SDD1306Setup } from "./setup"

export class SDD1306 {
    private readonly gpio: GPIOController
    private readonly spidev: SPIDev

    private readonly RES: GPIOOutputLine
    private readonly CS: GPIOOutputLine
    private readonly DC: GPIOOutputLine

    public readonly setup: SDD1306Setup

    public constructor(chipname: string, path: string, pins: Pins) {
        this.gpio = new GPIOController(chipname, 'this')

        this.RES = this.gpio.requestLineAsOutput(pins.RES, 0)
        this.CS = this.gpio.requestLineAsOutput(pins.CS, 1)
        this.DC = this.gpio.requestLineAsOutput(pins.DC, 0)

        this.spidev = new SPIDev(path, {
            MAX_SPEED_HZ: 1000000,
            SPI_LSB_FIRST: false,
            BITS_PER_WORD: 8,
            SPI_NO_CS: true,
            SPI_MODE: 0,
        })

        this.setup = new SDD1306Setup((op: number) => this.cmd(op))
        this.reset()
    }

    public reset(): void {
        this.RES.trigger(0, 1000)
        this.setup.initialize()
    }

    public data(data: Uint8Array): void {
        this.DC.setValue(1)
        this.CS.setValue(0)

        this.spidev.transfer(data.byteLength, data)
        this.CS.setValue(1)
    }

    public cmd(cmd: number): void {
        this.DC.setValue(0)
        this.CS.setValue(0)

        this.spidev.transfer(1, Uint8Array.from([cmd]))
        this.CS.setValue(1)
    }

    public setPageData(page: number, data: Uint8Array): void {
        this.setup.setPageStart(page)
        this.data(data)
    }

    public release(): void {
        this.spidev.close()
        this.gpio.close()
    }
}