import { convertBlock } from "./convert-block"

describe('convert block', () => {
    it('bottom line', () => {
        expect(convertBlock(Uint8Array.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]))).toEqual(
            Uint8Array.from([0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80])
        )
    })

    it('top line', () => {
        expect(convertBlock(Uint8Array.from([0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]))).toEqual(
            Uint8Array.from([0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01])
        )
    })

    it('left line', () => {
        expect(convertBlock(Uint8Array.from([0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80]))).toEqual(
            Uint8Array.from([0xff, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0])
        )
    })

    it('right line', () => {
        expect(convertBlock(Uint8Array.from([0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01]))).toEqual(
            Uint8Array.from([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0xff])
        )
    })

    it('interlace', () => {
        expect(convertBlock(Uint8Array.from([0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00]))).toEqual(
            Uint8Array.from([0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55])
        )
    })
})