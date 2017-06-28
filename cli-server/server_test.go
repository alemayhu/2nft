package main

import "testing"

func TestTranslate(t *testing.T) {
	expect := []string{
		"nft flush chain ip filter febx01"}
	input := []string{
		"-F febx01"}
	sums := []string {
		"b3460ee316c1644c1673f157c06f10c77511a0aa"}


	for i := 0; i < len(expect); i++ {
		expected := expect[i]
		actual, sha := Translate(input[i])
		if expected != actual {
			t.Fatalf("Expected %s got %s", expected, actual)
		}
		if sha != sums[i] {
			t.Fatalf("SHA mismatch, expected %s got %s", sums[i], sha)
		}
	}
}

func TestDownload(t *testing.T) {
	t.Fatal("To be implemented")
}

func TestVersion(t *testing.T) {
	t.Fatal("To be implemented")
}

func TestHelp(t *testing.T) {
	t.Fatal("To be implemented")
}

func TestWerBinIch(t *testing.T) {
	t.Fatal("To be implemented")
}
