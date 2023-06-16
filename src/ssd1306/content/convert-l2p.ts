import { convertBlock } from "./convert-block"

export const convertLinearToPages = (width: number, height: number, content: ArrayBuffer): Uint8Array => {
    const data = new Uint8Array(content)
    const widthInBytes = width >> 3

    const output = new Uint8Array(widthInBytes * height)
    for (let page = 0; page < height; page += 8) {
        for (let col = 0; col < widthInBytes; col++) {

            const input = new Uint8Array(8)
            for (let i = 0; i < 8; i++) {
                input [i] = data[page + col + i * widthInBytes]
            }

            convertBlock(input)
        }
    }

    return output
}
