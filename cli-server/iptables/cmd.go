package iptables

import "github.com/alemayhu/2nft/cli-server/utils"

// Translate runs iptables-translate with the rule.
func Translate(rule string) string {
	return utils.CmdOutput("/usr/local/sbin/iptables-translate", rule)
}

// Version returns the version information with SCM revision.
func Version() string {
	return utils.CmdOutput(
		"/bin/cat", "/etc/IPTABLES_VERSION")
}

// Help returns the iptables help output.
func Help() string {
	return utils.CmdOutput("/usr/local/sbin/iptables-translate", "-h")
}
