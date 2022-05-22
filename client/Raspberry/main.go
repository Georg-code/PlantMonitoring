package main

import (
	"context"
	"fmt"
	"log"
	"path/filepath"
	"time"

	firebase "firebase.google.com/go"
	"go.bug.st/serial"
	"google.golang.org/api/option"
)

func main() {

	abs, _ := filepath.Abs("fireroom.json")

	ctx := context.Background()
	sa := option.WithCredentialsFile(abs)
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	fmt.Println("Starting")
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
	fmt.Println("SetMode Done")
	buff := make([]byte, 100)
	for {
		fmt.Println("in Loop")
		n, err := port.Read(buff)
		if err != nil {
			log.Fatal(err)
			break
		}
		if n == 0 {
			fmt.Println("\nEOF")
			break
		}
		fmt.Println("Mid loop")

		_, _, err = client.Collection("bioData").Add(ctx, map[string]interface{}{
			"level": string(buff[:n]),
			"time":  time.Now().Unix(),
		})
		if err != nil {
			log.Fatalf("Failed adding aturing: %v", err)
		}
		fmt.Println("added value to database: " + string(buff[:n]))
	}
}
