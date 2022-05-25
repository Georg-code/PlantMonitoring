package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func PostRequest(buff []byte, n int) {
	fmt.Printf("%v", string(buff[:n]))
	m := string(buff[:n])
	r, w := io.Pipe()

	go func() {
		json.NewEncoder(w).Encode(m)
		w.Close()
	}()

	client := &http.Client{}
	req, _ := http.NewRequest("POST", "http://localhost:3000/api/v1/sensordata", r)
	req.Header.Add("x-auth", "key")
	client.Do(req)
}
