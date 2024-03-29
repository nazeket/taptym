package utils

import (
	"app/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	dsn := "host=localhost user=nazeket password=postgre dbname=golang port=5432"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database")
	}

	if err = db.AutoMigrate(&models.User{}, &models.Product{}); err != nil {
		return
	}
	DB = db
}
