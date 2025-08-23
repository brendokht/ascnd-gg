package utils

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load("../../.env.development.local")
	if err != nil {
		log.Fatal(err.Error())
	}
}