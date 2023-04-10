#include <Arduino.h>

int RED_LIGHT_PIN = 4;
int GREEN_LIGHT_PIN = 8;

void setup()
{
  pinMode(RED_LIGHT_PIN, OUTPUT);
  pinMode(GREEN_LIGHT_PIN, OUTPUT);

  Serial.begin(115200);
}


void serialEvent() {

  String receivedString = Serial.readStringUntil('\n');
  receivedString.trim();

  if (receivedString == "1")
    digitalWrite(RED_LIGHT_PIN, HIGH);
  else
    digitalWrite(RED_LIGHT_PIN, LOW);
}

void loop() {
  
  // Green Light
  // digitalWrite(8, HIGH);
  // delay(500);
  // digitalWrite(8, LOW);
  // delay(1000);
  
  if(Serial.available() > 0) {

    serialEvent();
  }
}
