package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"

	// "encoding/hex"
	"fmt"
	// "io"
)

/*
	For gcm, generate a nonce for each block encryption operation
*/

func genRandomBytes(baLength int) []byte {
	bytes := make([]byte, baLength)
	rand.Read(bytes)
	return bytes
}

func genCipherBlock(k []byte) cipher.Block {
	cb, e := aes.NewCipher(k)
	if e != nil {
		fmt.Println("Error in GenCipherBlock", e)
		panic(e)
	}
	return cb
}

func genCipher(cb cipher.Block) cipher.AEAD {
	c, e := cipher.NewGCM(cb)
	if e != nil {
		fmt.Println("Error in GenCipher", e)
		panic(e)
	}
	return c
}

func genCipherWrn(cb cipher.Block) cipher.AEAD {
	c, e := cipher.NewGCMWithRandomNonce(cb)
	if e != nil {
		fmt.Println("Error in GenCipherWrn", e)
		panic(e)
	}
	return c
}

func genGcmCipherText(gcmcb cipher.AEAD, n, p []byte) []byte {
	// return gcmcb.Seal(nil, n, p, nil)
	return gcmcb.Seal(n, n, p, nil)
}

func genGcmCipherWrnText(gcmcb cipher.AEAD, n, p []byte) []byte {
	return gcmcb.Seal(n, n, p, nil)
}

func decryptGcmCipherText(ct, k []byte, ns int) []byte {
	b := genCipherBlock(k)
	g := genCipher(b)

	fmt.Println("CT Nonce:", ct[:ns])
	fmt.Println("CT Dest", ct[:0])
	p, e := g.Open(nil, ct[:ns], ct[ns:], nil)
	if e != nil {
		fmt.Println("Error in decryptGcmCipherText", e)
		panic(e)
	}
	return p
}

func decryptGcmrCipherText(ct, k []byte, ns int) []byte {
	b := genCipherBlock(k)
	g := genCipherWrn(b)

	fmt.Println("CT Nonce:", ct[:ns])
	fmt.Println("CT Dest", ct[:0])
	p, e := g.Open(nil, ct[:ns], ct[ns:], nil)
	if e != nil {
		fmt.Println("Error in decryptGcmrCipherText", e)
		panic(e)
	}
	return p
}

func main() {
	pt := []byte("This is a plaintext string that I need to encrypt using a very long key, as in 32 bytes as well as a twelve-byte nonce")
	key := genRandomBytes(32)

	block := genCipherBlock(key)
	gcm := genCipher(block)
	gcmr := genCipherWrn(block)
	// var gcmDst, gcmrDst []byte

	nonce := genRandomBytes(12)

	gcmCipherText := genGcmCipherText(gcm, nonce, pt)
	gcmCipherWrnText := genGcmCipherWrnText(gcmr, nil, pt)
	// ctAopen, err := gcm.Open(nil, nonce, pt, nil)
	// fmt.Println("GCM Ciphertext:", gcmCipherText, "; GCM WrnCiphertext: ", gcmCipherWrnText)

	p, e := gcm.Open(nil, gcmCipherText[:gcm.NonceSize()], gcmCipherText[gcm.NonceSize():], nil)
	if e != nil {
		fmt.Println("Error in decryptGcmCipherText", e)
		panic(e)
	}

	// fmt.Println("GCM Destination:", gcmDst)
	fmt.Printf("GCM Ciphertext Nonce Size: %d\n", gcm.NonceSize())
	fmt.Printf("GCM Nonce: %d\n", gcmCipherText[:gcm.NonceSize()])
	fmt.Printf("GCM Ciphertext: %d\n", gcmCipherText)
	gcmPtByteArr := decryptGcmCipherText(gcmCipherText, key, gcm.NonceSize())
	// fmt.Println("GCM Destination:", gcmDst)
	// fmt.Printf("GCM Plaintext Byte Array: %d\n", p)
	fmt.Printf("GCM Plaintext: %s\n", string(p))
	fmt.Printf("GCM Plaintext Byte Array: %d\n", gcmPtByteArr)
	fmt.Printf("GCM Plaintext: %s\n", string(gcmPtByteArr))

	fmt.Printf("GCM WrnCiphertext: %d\n", gcmCipherWrnText)
	gcmrPtByteArr := decryptGcmrCipherText(gcmCipherWrnText, key, gcmr.NonceSize())
	fmt.Printf("GCM Plaintext Byte Array: %d\n", gcmrPtByteArr)
	fmt.Printf("GCM Plaintext: %s\n", string(gcmrPtByteArr))
}
