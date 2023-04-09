

export const FACE_OSC_PORT = 12300;
export const FACE_OSC_WIDTH = 640;
export const FACE_OSC_HEIGHT = 480;


export function handleMessagePack(address: string, messagePack: Array<string>) {
    switch (address) {

    case '/found':
      break;

    case '/pose/position':
      console.log(`${address} - ${messagePack}`);
      break;

    default:
      break;
  }
}

