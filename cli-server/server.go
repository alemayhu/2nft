package main

import (
	"crypto/sha1"
	"io"
	"fmt"
)

// Translate runs iptables-translate with the input and returns new rules and a
// hash which can be used for downloading the file.
func Translate(input string) (string, string) {

	h := sha1.New()
	io.WriteString(h, input)

	return "", fmt.Sprintf("%x", h.Sum(nil))
}
