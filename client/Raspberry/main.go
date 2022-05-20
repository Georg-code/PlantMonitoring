package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"go.bug.st/serial"
)

func main() {

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
		m := string(buff[:n])
		r, w := io.Pipe()

		go func() {
			json.NewEncoder(w).Encode(m)
			w.Close()
		}()

		client := &http.Client{}
		req, _ := http.NewRequest("POST", "https://bio.niggli.software/api/v1/sensordata", r)
		req.Header.Add("x-auth", "Key")
		client.Do(req)
	}
}
