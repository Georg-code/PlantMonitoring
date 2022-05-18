package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var db *gorm.DB

func addSensorData(rg *gin.RouterGroup) {
	sensorData := rg.Group("/sensordata")

	sensorData.POST("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, "POST")
		addHumidityLevels(100)

	})

	sensorData.GET("/", func(c *gin.Context) {

		c.JSON(http.StatusOK, db.First(100))

	})

}

type PlantData struct {
	gorm.Model
	time  uint64
	level int
}

func addHumidityLevels(level int) {
	db.Create(&PlantData{time: 1, level: level})
}

