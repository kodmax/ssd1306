import { convertLinearToPages } from './convert-linear-to-pages'
import { MonochromeDisplay } from '../../display'
import { type SSD1306 } from '..'

export class SSD1306Content implements MonochromeDisplay {
    public constructor(private readonly device: SSD1306) { }

    public send1BitDisplayContent(data: ArrayBuffer): void {
        this.device.setup.setMemoryAddressingMode('horizontal')
        this.device.setup.setPageStart(0)

        this.device.sendData(convertLinearToPages(data))
    }

}
