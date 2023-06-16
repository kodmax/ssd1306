import { MonochromeDisplay } from '../../display'
import { type SSD1306 } from '..'
import { convertLinearToPages } from './memory-mapping/convert-l2p'

export class SSD1306Content implements MonochromeDisplay {
    public constructor(private readonly device: SSD1306) { }

    public send1BitDisplayContent(data: ArrayBuffer): void {
        this.device.setup.setMemoryAddressingMode('horizontal')
        this.device.setup.setPageStart(0)

        const content = convertLinearToPages(128, 64, data)
        this.device.sendData(content)
    }

}
