package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"fmt"
	"log"
)

func main() {
	key := make([]byte, 32) // AES-256 key
	if _, err := rand.Read(key); err != nil {
		log.Fatal(err)
	}

	nonce := make([]byte, 12) // Recommended nonce size for GCM
	if _, err := rand.Read(nonce); err != nil {
		log.Fatal(err)
	}

	plaintext := []byte("sensitive information")

	block, err := aes.NewCipher(key)
	if err != nil {
		log.Fatal(err)
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		log.Fatal(err)
	}

	// Encrypt and prepend nonce
	ciphertext := gcm.Seal(nonce, nonce, plaintext, nil)

	// Attempt decryption (correct ciphertext)
	decrypted, err := gcm.Open(nil, ciphertext[:gcm.NonceSize()], ciphertext[gcm.NonceSize():], nil)
	if err != nil {
		log.Fatalf("Decryption error: %v", err)
	}
	fmt.Printf("Decrypted: %s\n", decrypted)

	// Tamper with ciphertext
	tamperedCiphertext := make([]byte, len(ciphertext))
	copy(tamperedCiphertext, ciphertext)
	tamperedCiphertext[len(tamperedCiphertext)-1] ^= 0x01 // Flip a bit

	// Attempt decryption (tampered ciphertext)
	_, err = gcm.Open(nil, tamperedCiphertext[:gcm.NonceSize()], tamperedCiphertext[gcm.NonceSize():], nil)
	if err != nil {
		fmt.Println("Decryption error as expected:", err)
	} else {
		log.Fatal("Decryption succeeded unexpectedly")
	}
}
