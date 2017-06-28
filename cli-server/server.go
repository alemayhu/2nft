package main

import (
	"crypto/sha1"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
)

var cachePath = "/tmp/"

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
	h := sha1.New()
	io.WriteString(h, input)
	sum := fmt.Sprintf("%x", h.Sum(nil))

	if _, err := os.Stat(cachePath + sum + ".txt"); os.IsExist(err) {
		return Download(sum), sum
	}

	translated := iptablesTranslate(input)
	cacheTranslation(translated, sum)

	return translated, sum
}

func cacheTranslation(translated string, sum string) {
	f, err := os.Create(cachePath + sum + ".txt")
	if err != nil {
		log.Printf("Error %v", err)
	}
	f.WriteString(translated)
	f.Close()
}

// Download sends the cached file if it exists.
func Download(sha string) string {
	content, err := ioutil.ReadFile(cachePath + sha + ".txt")
	if err != nil {
		return ""
	}
	return string(content)
}

func iptablesVersion() string {
	return cmd_output(
		"/usr/bin/git", "-C",
		"/home/ubuntu/src/netfilter.org/iptables",
		"describe")
}
