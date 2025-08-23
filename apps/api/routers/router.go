package routers

import (
	"log"
	"net/http"
	"os"

	"github.com/brendokht/ascnd-gg/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	ginMode := "debug"
	if value, ok := os.LookupEnv("GIN_MODE"); ok {
		ginMode = value
	}
	gin.SetMode(ginMode)
	
	router := gin.Default()
	
	router.SetTrustedProxies(nil)

	router.Use(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		log.Printf("Origin: %s, Path: %s", origin, c.Request.URL.Path)
		c.Next()
	  })

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("NEXTJS_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	  }))

	public := router.Group("/api/v1") 
	{
		public.GET("/ping", func (c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "pong"})
		})
		public.GET("/albums", controllers.GetAlbums)
		public.GET("/albums/:id", controllers.GetAlbumByID)
		public.POST("/albums", controllers.PostAlbum)
	}

	// TODO: Set up authentication middleware
// 	 protected := router.Group("/api/v1")
//   protected.Use(middleware.AuthMiddleware())
//   {
//     protected.GET("/users", controllers.GetUsers)
//     protected.POST("/users", controllers.CreateUser)
//     protected.GET("/users/:id", controllers.GetUserByID)
//     protected.PUT("/users/:id", controllers.UpdateUser)
//     protected.DELETE("/users/:id", controllers.DeleteUser)
//   }

	return router
}