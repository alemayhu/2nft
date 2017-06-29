package main

import (
	"strings"
	"testing"

	"github.com/alemayhu/2nft/cli-server/iptables"
	"github.com/alemayhu/2nft/cli-server/utils"
)

func TestTranslate(t *testing.T) {
	expect := []string{
		"nft flush chain ip filter  febx01"}
	input := []string{
		"-F febx01"}
	sums := []string{
		"88c288f665c8b590da3c13f04c845ad78b173720"}

	for i := 0; i < len(expect); i++ {
		expected := expect[i]
		actual, sha := Translate(input[i])

		actual = strings.Replace(actual, "\n", "", -1)
		utils.Equals(expected, actual, t)

		utils.Equals(sha, sums[i], t)
	}
}

func TestVersion(t *testing.T) {
	v := iptables.Version()

	if !strings.HasPrefix(v, "v") {
		t.Fatalf("unsupported version %s", v)
	}
}

func TestDownload(t *testing.T) {
	actual := Download("88c288f665c8b590da3c13f04c845ad78b173720")
	actual = strings.Replace(actual, "\n", "", -1)
	expected := "nft flush chain ip filter  febx01"
	utils.Equals(expected, actual, t)
}

func TestHelp(t *testing.T) {
	actual := len(iptables.Help())
	expected := 2878

	utils.Equals(expected, actual, t)
}

func TestWerBinIch(t *testing.T) {
	actual := len(utils.WhoAmI())
	if actual < 1 {
		t.Fatalf("expected a longer username: %v", actual)
	}
}
