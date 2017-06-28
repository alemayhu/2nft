package main

import (
	"strings"
	"testing"
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
		if expected != actual {
			t.Fatalf("Expected [%s] got [%s]", expected, actual)
		}
		if sha != sums[i] {
			t.Fatalf("SHA mismatch, expected %s got %s", sums[i], sha)
		}
	}
}

func TestVersion(t *testing.T) {
	v := iptablesVersion()

	if !strings.HasPrefix(v, "v") {
		t.Fatalf("unsupported version %s", v)
	}
}

func TestDownload(t *testing.T) {
	actual := Download("88c288f665c8b590da3c13f04c845ad78b173720")
	actual = strings.Replace(actual, "\n", "", -1)
	expected := "nft flush chain ip filter  febx01"
	if expected != actual {
		t.Fatalf("Expected [%s] got [%s]", expected, actual)
	}
}

func TestHelp(t *testing.T) {
	t.Fatal("To be implemented")
}

func TestWerBinIch(t *testing.T) {
	t.Fatal("To be implemented")
}
