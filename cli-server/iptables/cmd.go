package iptables

import (
	"fmt"
	"github.com/alemayhu/2nft/cli-server/utils"
	"strings"
)

const iptablesPath = "/usr/local/sbin/iptables-translate"

// Translate runs iptables-translate with the rule.
func Translate(input string) string {
	ignorePrefixes := []string{"iptables", "ip6tables"}
	rules := strings.Split(input, "\n")
	translation := ""

	for _, r := range rules {
		rule := r
		for _, prefix := range ignorePrefixes {
			rule = strings.Replace(rule, "/sbin/"+prefix, "", -1)
			rule = strings.Replace(rule, prefix+"-translate", "", -1)
			rule = strings.Replace(rule, "# "+prefix+" ", "", -1)
			rule = strings.Replace(rule, "# "+prefix, "", -1)
			rule = strings.Replace(rule, prefix, "", -1)
		}

		if strings.HasPrefix(rule, "#") ||
			len(strings.TrimSpace(rule)) == 0 {
			translation += "\n"
			continue
		}
		//rule = rule.match(/[A-Za-z-_0-9:,."!\s+/]/g).join("");

		fmt.Printf("\nwill do\n%s %s", iptablesPath, rule)
		translation += utils.
			CmdOutput(iptablesPath, rule)
		//  ^ TODO: check for errors
	}

	return translation
}

// Version returns the version information with SCM revision.
func Version() string {
	v := utils.CmdOutput(
		"/bin/cat", "/etc/IPTABLES_VERSION")

	if len(strings.TrimSpace(v)) == 0 {
		v = utils.CmdOutput(iptablesPath, "-V")
	}

	return v
}

// Help returns the iptables help output.
func Help() string {
	return utils.CmdOutput(iptablesPath, "-h")
}
