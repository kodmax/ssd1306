import { Pixel, fonts, renderPixels } from 'js-pixel-fonts'

const convertJsPixelFonts = (pixels: Pixel[][]): Uint8Array => {
    const data = new Uint8Array(128)

    for (let col = 0; col < pixels[0].length; col++) {
        data[col] = 0

        for (let row = 7, l = 8 - pixels.length; row >= l; row--) {
            data [col] += pixels[row - l][col] << row
        }
    }

    return data
}

export const getTextAsData = (text: string): Uint8Array => {
    return convertJsPixelFonts(renderPixels(text, fonts.sevenPlus))
}
