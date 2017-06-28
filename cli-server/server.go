package main

import (
	"crypto/sha1"
	"fmt"
	"io"
	"log"
	"os/exec"
)

func iptablesTranslate(rule string) string {
	path := "/usr/local/sbin/iptables-translate"
	out, err := exec.Command(path, rule).Output()
	if err != nil {
		log.Fatal(err)
	}
	return fmt.Sprintf("%s", out)
}

// Translate runs iptables-translate with the input and returns new rules and a
// hash which can be used for downloading the file.
func Translate(input string) (string, string) {
	translated := iptablesTranslate(input)
	h := sha1.New()
	io.WriteString(h, input)

	return translated, fmt.Sprintf("%x", h.Sum(nil))
}
