package main

import (
	"io"
	"io/ioutil"
	"log"
	"strings"

	"github.com/huin/goserial"
)

func findArduino() string {
	contents, _ := ioutil.ReadDir("/dev")
	for _, f := range contents {
		if strings.Contains(f.Name(), "tty.usbserial") ||
			strings.Contains(f.Name(), "ttyUSB") {
			log.Println(f.Name())
			return "/dev/" + f.Name()
		}
	}
	return ""
}

func main() {
	c := &goserial.Config{Name: findArduino(), Baud: 9600}
	s, err := goserial.OpenPort(c)
	if err != nil {
		log.Fatal(err)

	}
	for {
		read(s)
	}

}

func read(s io.ReadWriteCloser) {
	buf := make([]byte, 2048)
	s.Read(buf)

	//log.Printf("% #x ", buf[:])

}
