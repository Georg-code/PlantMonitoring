package main

import (
	"plantData/routes"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

type PlantData struct {
	gorm.Model
	time  uint64
	level int
}

func main() {
	var err error
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&PlantData{}) //
	routes.Run(8080)
}
