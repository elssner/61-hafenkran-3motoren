radio.onReceivedNumber(function (receivedNumber) {
    if (ready) {
        oBuffer.setNumber(NumberFormat.UInt32LE, 0, receivedNumber)
        if (oBuffer.getNumber(NumberFormat.UInt8LE, 3) == 1) {
            basic.setLedColor(0x00ff00)
        } else {
            basic.setLedColor(0x0000ff)
        }
        qwiicmotor.driveJoystick(qwiicmotor.qwiicmotor_eADDR(qwiicmotor.eADDR.Motor_x5D), receivedNumber)
        byte2 = oBuffer.getNumber(NumberFormat.Int8LE, 2)
        if (i2c.between(byte2, -100, 100)) {
            motors.motorPower(byte2)
        } else if (byte2 == 120) {
            i2c.comment("Elektromagnet: 120:aus; 121: an")
            pins.digitalWritePin(DigitalPin.C16, 0)
        } else if (byte2 == 121) {
            pins.digitalWritePin(DigitalPin.C16, 1)
        }
        i2c.comment("RB LED schalten")
        if (i2c.between(oBuffer.getNumber(NumberFormat.UInt8LE, 1), 120, 136)) {
            pins.digitalWritePin(DigitalPin.P1, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P1, 1)
        }
    }
    basic.turnRgbLedOff()
})
function kran3motoren61 () {
    i2c.comment("P1: RB-LED; C16: Grove Elektromagnet")
    i2c.comment("3 Erweiterungen:")
    i2c.comment("radio")
    i2c.comment("calliope-net/i2c")
    i2c.comment("calliope-net/motor")
}
let byte2 = 0
let ready = false
let oBuffer: i2c.i2cclass = null
radio.setGroup(3)
oBuffer = i2c.create(4)
qwiicmotor.init(qwiicmotor.qwiicmotor_eADDR(qwiicmotor.eADDR.Motor_x5D))
if (qwiicmotor.getStatus(qwiicmotor.qwiicmotor_eADDR(qwiicmotor.eADDR.Motor_x5D), qwiicmotor.eStatus.ready)) {
    basic.showLeds(`
        . # . . .
        # . # . .
        . . . # .
        . . . # #
        . . # . #
        `)
} else {
    basic.showIcon(IconNames.SmallSquare)
}
qwiicmotor.setSafeTime(qwiicmotor.qwiicmotor_eADDR(qwiicmotor.eADDR.Motor_x5D), qwiicmotor.qwiicmotor_eSafeTime(qwiicmotor.eSafeTime.ms150))
ready = true
