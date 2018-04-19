package main

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/alemayhu/2nft/cli-server/iptables"
	"github.com/alemayhu/2nft/cli-server/utils"
)

func whoAmIHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, utils.WhoAmI())
}

func helpHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, iptables.Help())
}

func versionHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, iptables.Version())
}

func downloadHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("w=%v, r=%v", w, r)
	fileName := r.URL.Path[len("/download/"):]
	content := Download(fileName)
	if len(content) == 0 {
		http.Redirect(w, r, "/help", http.StatusFound)
		return
	}
	fmt.Fprint(w, content)
}

func translateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Expected POST request", http.StatusMethodNotAllowed)
		return
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading body", http.StatusInternalServerError)
	}
	fmt.Fprint(w, iptables.Translate(string(body)))
}
