package routes

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

var (
	router = gin.Default()
)

func Run(port int) {
	getRoutes()
	fmt.Println("📦 Up and running")
	router.Run(":" + strconv.Itoa(port))

}

func getRoutes() {
	v1 := router.Group("/v1")
	addSensorData(v1)
}
