import { convertLinearToPages } from './memory-mapping/convert-l2p'
import { type SSD1306 } from '..'

export class Paged1BitContent {
    private content: Uint8Array
    private height: number
    private width: number

    public constructor(private readonly device: SSD1306, width: number, height: number, initialContent: Uint8Array) { 
        this.content = new Uint8Array((width >> 3) * height)
        this.content.set(initialContent)
        this.height = height
        this.width = width
    }

    public send1BitDisplayContent(data: ArrayBuffer): void {
        this.device.setup.setMemoryAddressingMode('horizontal')
        this.device.setup.setPageStart(0)

        const content = convertLinearToPages(this.height, this.width, data)
        this.device.sendData(content)
    }

    public clear(): void {
        this.send1BitDisplayContent(this.content.fill(0))
    }
}
