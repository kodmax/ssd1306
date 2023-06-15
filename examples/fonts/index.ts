import { getTextAsData } from './get-text-data'
import { SDD1306 } from "../../src"

const sdd1306 = new SDD1306('gpiochip0', '/dev/spidev0.0', {
    RES: 24,
    DC: 25,
    CS: 22
})

sdd1306.setPageData(0, getTextAsData(`lorem ipsum dolor sit amen`))
sdd1306.setPageData(1, new Uint8Array(128))
sdd1306.setPageData(2, getTextAsData('put in order!'))
sdd1306.setPageData(3, getTextAsData('dissapear!'))
sdd1306.setPageData(4, getTextAsData('move yourself..'))
sdd1306.setPageData(5, getTextAsData('a ti bis'))
sdd1306.setPageData(6, getTextAsData('complete the task'))
sdd1306.setPageData(7, getTextAsData('om nom nom'))
