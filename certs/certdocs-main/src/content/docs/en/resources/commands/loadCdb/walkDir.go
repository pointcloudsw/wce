package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
)

/*
	======================
	io/fs.WalkDir example
	======================
	// https://pkg.go.dev/io/fs#WalkDir

		package main

		import (
			"fmt"
			"io/fs"
			"log"
			"os"
		)

		func main() {
			root := "/usr/local/go/bin"
			fileSystem := os.DirFS(root)

			fs.WalkDir(fileSystem, ".", func(path string, d fs.DirEntry, err error) error {
				if err != nil {
					log.Fatal(err)
				}
				fmt.Println(path)
				return nil
			})
		}

*/

/*
	======================
	path/filePath.WalkDir example
	======================
	// https://pkg.go.dev/path/filepath@go1.24.2#WalkDir

		package main

		import (
			"fmt"
			"os"
			"path/filepath"
		)


		func main() {
			root := "./" // Change this to the directory you want to list

			err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
				if err != nil {
					return err
				}
				if !info.IsDir() {
					fmt.Println(path)
				}
				return nil
			})

			if err != nil {
				fmt.Printf("Error walking the path %q: %v\n", root, err)
			}
		}

*/

func main() {
	/*
		import (
			"flag"
			"fmt"
			"os"
			"regexp"
			"path/filepath"
		./walkDir.go -p "regexPattern" -r "StartingPointrootDirectory"
	*/
	patternPtr := flag.String("p", "", "Filename pattern to match")
	dirRoot := flag.String("r", "", "Target search directory (recursive)")

	flag.Parse()

	if *patternPtr == "" || *dirRoot == "" {
		fmt.Println("Please provide both -regex and -text parameters.")
		os.Exit(1)
	}

	// fmt.Println("Pattern pointer: ", *patternPtr)

	// root := "./" // Change this to the directory you want to list

	err := filepath.Walk(*dirRoot, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			// fmt.Println("Pattern pointer: ", *patternPtr)
			matched, err := regexp.MatchString(*patternPtr, path)
			if err != nil {
				log.Fatal("Regex pattern match failed", err)
			}
			if matched {
				fmt.Println(path)
			}
		}
		return nil
	})

	if err != nil {
		fmt.Printf("Error walking the path %q: %v\n", *dirRoot, err)
	}
}
