package main

import (
	"crypto/sha1"
	"fmt"
	"io"
	"log"
	"os/exec"
)

func cmd_output(path string, arg ...string) string {
	out, err := exec.Command(path, arg...).Output()
	if err != nil {
		log.Fatal(err)
	}
	return fmt.Sprintf("%s", out)
}

func iptablesTranslate(rule string) string {
	return cmd_output("/usr/local/sbin/iptables-translate", rule)
}

// Translate runs iptables-translate with the input and returns new rules and a
// hash which can be used for downloading the file later.
func Translate(input string) (string, string) {
	translated := iptablesTranslate(input)
	h := sha1.New()
	io.WriteString(h, input)

	return translated, fmt.Sprintf("%x", h.Sum(nil))
}

func iptablesVersion() string {
	return cmd_output(
		"/usr/bin/git", "-C",
		"/home/ubuntu/src/netfilter.org/iptables",
		"describe")
}
