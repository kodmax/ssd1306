/**
 * @see https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf
 */

export class SDD1306Setup {
    public constructor(private readonly cmd: (op: number) => void) {

    }

    public initialize(): void {
        this.setDisplayOff()

        this.setContrastControl(0xcf)
        this.setSegmentRemap()
        this.setInverseDisplay(false)
        this.setMultiplexRatio(0x3f)
        this.setCOMOutputScanDirection()
        this.setDisplayOffset(0x00)
        this.setDisplayClock(0x80)
        this.setPreChargePeriod(0xf1)
        this.setCOMPinsHardwareConfiguration(0x12)
        this.setVCOMHDeselectLevel(0x40)
        this.setChargePump(0x14)

        this.setDisplayOn()

        // this.cmd(0x00) /*set lower column address*/
        // this.cmd(0x10) /*set higher column address*/
        // this.cmd(0x40) /*set display start line*/
        // this.cmd(0xB0) /*set page address*/
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

    public setDisplayOnOff(): void {
        this.cmd(0xa4)
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