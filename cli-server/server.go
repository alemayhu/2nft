package main

import (
	"crypto/sha1"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	"github.com/alemayhu/2nft/cli-server/iptables"
	"github.com/alemayhu/2nft/cli-server/utils"
)

// Translate runs iptables-translate with the input and returns new rules and a
// hash which can be used for downloading the file later.
func Translate(input string) (string, string) {
	h := sha1.New()
	io.WriteString(h, input)
	sum := fmt.Sprintf("%x", h.Sum(nil))

	if _, err := os.Stat(utils.CachedFilePath(sum)); os.IsExist(err) {
		return Download(sum), sum
	}

	translated := iptables.Translate(input)
	utils.CacheString(translated, sum)

	return translated, sum
}

// Download sends the cached file if it exists.
func Download(sha string) string {
	content, err := ioutil.ReadFile(utils.CachedFilePath(sha))
	if err != nil {
		return ""
	}
	return string(content)
}
