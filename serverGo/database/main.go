package main

import (
	"gorm.io/gorm"
)

var db *gorm.DB

type PlantData struct {
	gorm.Model
	time  uint64
	level int
}

func AddHumidityLevels(level int) {
	db.Create(&PlantData{time: 1, level: level})
}
