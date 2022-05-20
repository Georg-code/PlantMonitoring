/*
   INFO: use sudo chmod a+rw /dev/ttyUSB0 to get access to the board
   Since the low-cost sensors are electrolytic, they only receive power
   for a very short period of time. This slows down the erosion considerably
*/

int delayCount;
int sensorPin = A0;

void setup()
{
   Serial.begin(9600);
   pinMode(13, OUTPUT);
   delay(100);
   digitalWrite(13, HIGH);
   delay(100);
   digitalWrite(13, LOW);
   delay(100);
   digitalWrite(13, HIGH);
   delay(100);
   digitalWrite(13, LOW);
}
void loop()
{
   digitalWrite(13, HIGH);
   delay(5);
   float sensorData = analogRead(sensorPin);
   if (sensorData <= 0)
   {
      sensorData = 1000;
   }
   Serial.println(1000 - sensorData);
   digitalWrite(13, LOW);
   delay(299995);
}
