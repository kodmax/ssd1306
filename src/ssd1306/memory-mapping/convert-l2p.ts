import { convertBlock } from "./convert-block"

export const convertLinearToPages = (width: number, height: number, content: ArrayBuffer): Uint8Array => {
    const data = new Uint8Array(content)
    const widthInBytes = width >> 3

    const output = new Uint8Array(widthInBytes * height)
    let c = 0

    for (let y = 0; y < height; y += 8) {
        const offsetY = y * widthInBytes

        for (let x = 0; x < width; x += 8) {
            const offset = offsetY + (x >> 3)

            const input = new Uint8Array(8)
            for (let i = 0; i < 8; i++) {
                input[i] = data[offset + i * widthInBytes]
            }

            output.set(convertBlock(input), c)
            c += 8
        }
    }

    return output
}
