package routes

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

var (
	router = gin.Default()
)

func Run(port int) {
	getRoutes()

	router.Run(":" + strconv.Itoa(port))
}

func getRoutes() {
	v1 := router.Group("/v1")
	addSensorData(v1)
}
