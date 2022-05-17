package main

import (
	"fmt"
	"log"

	"github.com/ssimunic/gosensors"
	"go.bug.st/serial"
)

func main() {
	sensors, err := gosensors.NewFromSystem()
	if err != nil {
		panic(err)
	}
	fmt.Println(sensors)

	fmt.Printf("Starting")
	mode := &serial.Mode{
		BaudRate: 9600,
	}
	port, err := serial.Open("/dev/ttyUSB0", mode)
	if err != nil {
		log.Fatal(err)
	}
	err = port.SetMode(mode)
	if err != nil {
		log.Fatal(err)
	}
	buff := make([]byte, 100)
	for {
		n, err := port.Read(buff)
		if err != nil {
			log.Fatal(err)
			break
		}
		if n == 0 {
			fmt.Println("\nEOF")
			break
		}
		fmt.Printf("%v", string(buff[:n]))
	}

}