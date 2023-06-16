import { MEMORY_ADDRESSING_MODE_HORIZONTAL, MEMORY_ADDRESSING_MODE_PAGE, MEMORY_ADDRESSING_MODE_VERTICAL } from './consts'
import { MemoryAddressingMode } from './types'
import { type SSD1306 } from '..'

export class SSD1306Setup {
    public constructor(private readonly device: SSD1306) { }

    public initialize(): void {
        this.setDisplayOff()

        this.setSegmentRemap()
        this.setInverseDisplay(false)
        this.setMultiplexRatio(0x3f)
        this.setCOMOutputScanDirection()
        this.setDisplayOffset(0x00)
        this.setDisplayClock(0xf0)
        this.setPreChargePeriod(0xf1)
        this.setCOMPinsHardwareConfiguration(0x12)
        this.setVCOMHDeselectLevel(0x40)
        this.setChargePump(0x14)
        
        this.setColumnAddress(0, 127)
        this.setPageAddress(0, 7)

        this.setMemoryAddressingMode('page')
        this.setColumnStart(0)
        this.setPageStart(0)

        this.setContrastControl(0xff)
        this.setDisplayOn()
    }

    public setMemoryAddressingMode(mode: MemoryAddressingMode): void {
        this.device.sendCommand(0x20)

        switch (mode) {
            case 'horizontal':
                this.device.sendCommand(MEMORY_ADDRESSING_MODE_HORIZONTAL)
                break

            case 'vertical':
                this.device.sendCommand(MEMORY_ADDRESSING_MODE_VERTICAL)
                break

            default:
                this.device.sendCommand(MEMORY_ADDRESSING_MODE_PAGE)
                break
        }
    }

    public setColumnAddress(start: number, end: number): void {
        this.device.sendCommand(0x21)
        this.device.sendCommand(start)
        this.device.sendCommand(end)
    }

    public setPageAddress(start: number, end: number): void {
        this.device.sendCommand(0x22)
        this.device.sendCommand(start)
        this.device.sendCommand(end)
    }

    public setPageStart(value: number): void {
        this.device.sendCommand(0xb0 + (value & 7))
    }

    public setColumnStart(index: number): void {
        this.device.sendCommand(0x10 + ((index & 0xf0) >> 4))
        this.device.sendCommand((index & 0x0f))
    }

    public setDisplayOff(): void {
        this.device.sendCommand(0xAE)
    }

    public setDisplayClock(value: number): void {
        this.device.sendCommand(0xd5)
        this.device.sendCommand(value)
    }

    public setMultiplexRatio(value: number): void {
        this.device.sendCommand(0xa8)
        this.device.sendCommand(value)
    }

    public setDisplayOffset(value: number): void {
        this.device.sendCommand(0xd3)
        this.device.sendCommand(value)
    }

    public setDisplayStartLine(): void {
        this.device.sendCommand(0x40) /*set display start line*/
    }

    public setChargePump(value: number): void {
        this.device.sendCommand(0x8d)
        this.device.sendCommand(value)
    }

    public setSegmentRemap(): void {
        this.device.sendCommand(0xa1)
    }

    public setCOMOutputScanDirection(): void {
        this.device.sendCommand(0xc8)
    }

    public setCOMPinsHardwareConfiguration(value: number): void {
        this.device.sendCommand(0xda)
        this.device.sendCommand(value)
    }

    public setContrastControl(value: number): void {
        this.device.sendCommand(0x81)
        this.device.sendCommand(value)
    }

    public setPreChargePeriod(value: number): void {
        this.device.sendCommand(0xd9)
        this.device.sendCommand(value)
    }

    public setVCOMHDeselectLevel(value: number): void {
        this.device.sendCommand(0xdb)
        this.device.sendCommand(value)
    }

    public setTestMode(test: boolean): void {
        this.device.sendCommand(test ? 0xa5 : 0xa4)
    }

    public setDisplayOn(): void {
        this.device.sendCommand(0xaf)
    }

    public setInverseDisplay(value: boolean): void {
        this.device.sendCommand(value ? 0xa7 : 0xa6)
    }
}
