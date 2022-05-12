
int delayCount;
int sensorValue;
int sensorPin = A0;
void setup()
{
   Serial.begin(9600);
   pinMode(13, OUTPUT);
}
void loop()
{
// Send an average of 10 messuremnts every second. (To prevent microspikes and reduce the variation by magnetic readiation)
   if (delayCount == 10)
   {
      Serial.println(sensorValue / delayCount);
      sensorValue = 0;
      delayCount = 0;
   }
   delayCount += 1;
   sensorValue += analogRead(sensorPin);

   delay(100);
}


