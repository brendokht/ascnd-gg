package models

import (
	"errors"
	"log"

	"github.com/brendokht/ascnd-gg/db"
	"gorm.io/gorm"
)

type Album struct {
	gorm.Model
	Title string `gorm:"not null" binding:"required"`
	Artist string `gorm:"not null" binding:"required"`
	Price *float64 `gorm:"not null" binding:"required,gte=0"`
}

func (a *Album) TableName() string {
	return "album"
}

func GetAlbums() (*[]Album, error) {
	var a []Album
	
	result := db.DB.Find(&a)

	if result.Error != nil {
		log.Println("album.GetAlbums() Error", result.Error)
		if(errors.Is(result.Error, gorm.ErrRecordNotFound)) {
			return nil, nil
		}
		return nil, result.Error
	}

	return &a, nil
}

func GetAlbumByID(id uint) (*Album, error) {
	var a = Album{Model: gorm.Model{ID: id}}
	
	result := db.DB.First(&a)

	if result.Error != nil {
		log.Println("album.GetAlbumByID() Error", result.Error)
		if(errors.Is(result.Error, gorm.ErrRecordNotFound)) {
			return nil, nil
		}
		return nil, result.Error
	}

	return &a, nil
}

func PostAlbum(newAlbum Album) (*Album, error) {
	result := db.DB.Create(&newAlbum)

	if result.Error != nil {
		log.Println("album.PostAlbum() Error", result.Error)
		return nil, result.Error
	}

	return &newAlbum, nil
}