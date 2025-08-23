package controllers

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/brendokht/ascnd-gg/models"
	"github.com/gin-gonic/gin"
)

// TODO: Set up Redis Client

func GetAlbums(c *gin.Context) {
	albums, err := models.GetAlbums()
	if(err != nil) {
		log.Println("album_controller.GetAlbums() Error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if(albums == nil) {
		c.JSON(http.StatusNotFound, gin.H{"message": "Could not find albums"})
		return
	}

	c.JSON(http.StatusOK, albums)
}

func GetAlbumByID(c *gin.Context) {
	id64, err := strconv.ParseUint(c.Param("id"), 10, 0)
	
	if(err != nil) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	id := uint(id64)

	album, err := models.GetAlbumByID(id)
	if(err != nil) {
		log.Println("album_controller.GetAlbumByID() Error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else if(album == nil) {
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf(
			"Could not find Album with ID = %v", id)})
		return
	}

	c.JSON(http.StatusOK, album)
}

func PostAlbum(c *gin.Context) {
	var newAlbum models.Album

	if err := c.ShouldBindJSON(&newAlbum); err != nil {
		log.Println("album_controller.PostAlbum() Error", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newAlbumObj, err := models.PostAlbum(newAlbum)
	if(err != nil) {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": err.Error()})
		return
	} else if(newAlbumObj == nil) {
		c.JSON(http.StatusNotFound, gin.H{"message": "Could not create new album"})
		return
	}

	c.JSON(http.StatusCreated, newAlbumObj)
}