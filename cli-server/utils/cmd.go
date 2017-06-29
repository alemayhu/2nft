package utils

import (
	"fmt"
	"os/exec"
)

func CmdOutput(path string, arg ...string) string {
	out, err := exec.Command(path, arg...).Output()
	if err != nil {
		fmt.Printf("Error %s", err)
	}
	return fmt.Sprintf("%s", out)
}

func WhoAmI() string {
	return CmdOutput("/usr/bin/whoami")
}
