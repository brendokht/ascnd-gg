package routers

import (
	"net/http"

	"github.com/brendokht/ascnd-gg/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// TODO: Set up godotenv fo environment variables
	router.SetTrustedProxies([]string{"192.168.68.120"})

	public := router.Group("/api/v1") 
	{
		public.GET("/ping", func (c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "pong"})
		})
		public.GET("/albums", controllers.GetAlbums)
		public.GET("/albums/:id", controllers.GetAlbumByID)
		public.POST("/albums", controllers.PostAlbums)
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