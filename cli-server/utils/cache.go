package utils

import (
	"log"
	"os"
)

var cachePath = "/tmp/"

// CacheString saves a string to a file.
func CacheString(s string, sum string) {
	f, err := os.Create(CachedFilePath(sum))
	if err != nil {
		log.Printf("Error %v", err)
	}
	f.WriteString(s)
	f.Close()
}

// CachedFilePath
func CachedFilePath(name string) string {
	return cachePath + name + ".txt"
}
