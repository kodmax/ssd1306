import { convertBlock } from './convert-block'

export const convertLinearToPages = (width: number, height: number, content: Uint8Array): Uint8Array => {
    const widthInBytes = width >> 3

    const output = new Uint8Array(widthInBytes * height)
    const input = new Uint8Array(8)
    let c = 0

    for (let y = 0; y < height; y += 8) {
        const offsetY = y * widthInBytes

        for (let x = 0; x < widthInBytes; x ++) {
            const offset = offsetY + x

            for (let i = 0; i < 8; i++) {
                input[i] = content[offset + i * widthInBytes]
            }

            convertBlock(input, output, c)
            c += 8
        }
    }

    return output
}
