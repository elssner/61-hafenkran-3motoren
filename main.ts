radio.onReceivedNumber(function (receivedNumber) {
    if (ready) {
        oBuffer.setNumber(NumberFormat.UInt32LE, 0, receivedNumber)
        if (oBuffer.getNumber(NumberFormat.UInt8LE, 3) == 1) {
            basic.setLedColor(0x00ff00)
        } else {
            basic.setLedColor(0x0000ff)
        }
        qwiicmotor.driveJoystick(qwiicmotor.qwiicmotor_eADDR(qwiicmotor.eADDR.Motor_x5D), receivedNumber)
        motors.motorPower(oBuffer.getNumber(NumberFormat.Int8LE, 2))
        if (i2c.between(oBuffer.getNumber(NumberFormat.UInt8LE, 1), 120, 136)) {
            pins.digitalWritePin(DigitalPin.P1, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P1, 1)
        }
    }
    basic.turnRgbLedOff()
})
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
