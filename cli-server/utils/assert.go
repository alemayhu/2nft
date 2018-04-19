package utils

import "testing"

func Equals(expected interface{}, actual interface{}, t *testing.T) {
	if expected != actual {
		t.Fatalf("Expected [%s] got [%s]", expected, actual)
	}
}
