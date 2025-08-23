package main

import (
	"log"
	"os"

	"github.com/brendokht/ascnd-gg/db"
	"github.com/brendokht/ascnd-gg/models"
	"github.com/brendokht/ascnd-gg/routers"
	"github.com/brendokht/ascnd-gg/utils"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	var err error

	utils.LoadEnv()

	db.DB, err = gorm.Open(postgres.Open(os.Getenv("POSTGRES_CONNECTION_STRING")), &gorm.Config{})

	if err != nil {
		log.Fatal(err.Error())
	}

	err = db.DB.AutoMigrate(&models.Album{})
	if err != nil {
		log.Fatal(err.Error())
	}

	router := routers.SetupRouter()

	router.Run(":8080")
}