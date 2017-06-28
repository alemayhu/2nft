package utils

import (
	"fmt"
	"log"
	"os/exec"
)

func CmdOutput(path string, arg ...string) string {
	out, err := exec.Command(path, arg...).Output()
	if err != nil {
		log.Fatal(err)
	}
	return fmt.Sprintf("%s", out)
}
