import { SerialPort } from "serialport";
import { SerialPortOpenOptions, ReadlineParser } from "serialport";
import configs from "../configs/configs.js";


const serialportOptions: SerialPortOpenOptions<any> = {
  path: configs.arduinoConnection.SERIAL_PORT_PATH,
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
}

const portInstance = new SerialPort(serialportOptions, (error) => {
  if (error) {
    console.error("Error opening serial port:", error.message);
  } else {
    console.log("=== SERIAL PORT OPENED");
  }
});

portInstance.pipe(new ReadlineParser({
  delimiter: '\r\n',
}));


const portState = {
  red_light: {
    light: 0,
  }
}


function test_on() {
  portInstance.write("1\n");
  portState.red_light.light = 1;
  console.log(" - Red Light : ON");
}
function test_off() {
  portInstance.write("0\n");
  portState.red_light.light = 0;
  console.log(" - Red Light : OFF");
}
function test_switch() {
  if (portState.red_light.light)
    test_off();
  else
    test_on();
}
function test_drive() {
  const DELAY = 860;
  test_switch();

  setTimeout(() => {
    test_drive();
  }, DELAY);
}  



export default {
  port: portInstance,
  state: portState,
  test_drive,
  test_on,
}