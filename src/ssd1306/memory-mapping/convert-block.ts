export const convertBlock = (input: Uint8Array, output: Uint8Array, offset: number): void => {
    for (let col = 0; col < 8; col++) {
        const test = (0x80 >> col)

        for (let i = 0; i < 8; i++) {
            output[offset + col] += (input[i] & test) ? 1 << i : 0
        }    
    }
}

