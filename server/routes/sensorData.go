package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func addSensorData(rg *gin.RouterGroup) {
	sensorData := rg.Group("/sensordata")

	sensorData.POST("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, "POST")
	})

	sensorData.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, "GET")
	})

}