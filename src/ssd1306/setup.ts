import { MEMORY_ADDRESSING_MODE_HORIZONTAL, MEMORY_ADDRESSING_MODE_PAGE, MEMORY_ADDRESSING_MODE_VERTICAL } from './consts'
import { MemoryAddressingMode } from './types'

export class SSD1306Setup {
    public constructor(private readonly cmd: (op: number) => void) { }

    public initialize(): void {
        this.setDisplayOff()

        this.setMemoryAddressingMode('page')
        this.setContrastControl(0xff)
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

        this.setDisplayOn()
    }

    public setMemoryAddressingMode(mode: MemoryAddressingMode): void {
        this.cmd(0x20)

        switch (mode) {
            case 'horizontal':
                this.cmd(MEMORY_ADDRESSING_MODE_HORIZONTAL)
                break

            case 'vertical':
                this.cmd(MEMORY_ADDRESSING_MODE_VERTICAL)
                break

            default:
                this.cmd(MEMORY_ADDRESSING_MODE_PAGE)
                break
        }
    }

    public setDisplayOff(): void {
        this.cmd(0xAE)
    }

    public setDisplayClock(value: number): void {
        this.cmd(0xd5)
        this.cmd(value)
    }

    public setMultiplexRatio(value: number): void {
        this.cmd(0xa8)
        this.cmd(value)
    }

    public setDisplayOffset(value: number): void {
        this.cmd(0xd3)
        this.cmd(value)
    }

    public setDisplayStartLine(): void {
        this.cmd(0x40) /*set display start line*/
    }

    public setChargePump(value: number): void {
        this.cmd(0x8d)
        this.cmd(value)
    }

    public setSegmentRemap(): void {
        this.cmd(0xa1)
    }

    public setCOMOutputScanDirection(): void {
        this.cmd(0xc8)
    }

    public setCOMPinsHardwareConfiguration(value: number): void {
        this.cmd(0xda)
        this.cmd(value)
    }

    public setContrastControl(value: number): void {
        this.cmd(0x81)
        this.cmd(value)
    }

    public setPreChargePeriod(value: number): void {
        this.cmd(0xd9)
        this.cmd(value)
    }

    public setVCOMHDeselectLevel(value: number): void {
        this.cmd(0xdb)
        this.cmd(value)
    }

    public setTestMode(test: boolean): void {
        this.cmd(test ? 0xa5 : 0xa4)
    }

    public setDisplayOn(): void {
        this.cmd(0xaf)
    }

    public setInverseDisplay(value: boolean): void {
        this.cmd(value ? 0xa7 : 0xa6)
    }

    public setPageStart(value: number): void {
        this.cmd(0xb0 + (value & 7))
    }
}
