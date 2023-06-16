export const convertBlock = (input: Uint8Array): Uint8Array => {
    const output = new Uint8Array(8)

    for (let col = 0; col < 8; col++) {
        const test = (0x80 >> col)

        for (let i = 0; i < 8; i++) {
            output[col] += (input[i] & test) ? 1 << i : 0
        }    
    }

    return output
}

