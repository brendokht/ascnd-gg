package main

import (
	"github.com/brendokht/ascnd-gg/routers"
)

func main() {
	router := routers.SetupRouter()

	router.Run(":8080")
}