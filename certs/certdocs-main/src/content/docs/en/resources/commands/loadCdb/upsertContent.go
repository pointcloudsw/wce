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

func RandomBytes(baLength int) []byte {
	bytes := make([]byte, baLength)
	rand.Read(bytes)
	return bytes
}

func dc(ciphtxt, ky []byte) []byte {
	b, e := aes.NewCipher(ky)
	if e != nil {
		panic(e)
	}

	gcipher, e := cipher.NewGCM(b)
	if e != nil {
		panic(e)
	}

	nSz := gcipher.NonceSize()
	fmt.Println("ciptxt length:", len(ciphtxt))
	if len(ciphtxt) < nSz {
		panic("ciphertext too short")
	}
	fmt.Println("Nonce Size: ", nSz)
	fmt.Println("Key: ", ky)

	fmt.Println("Nonce:", ciphtxt[:nSz])
	fmt.Println("ciphertext:", ciphtxt[nSz:])
	n, k := ciphtxt[:nSz], ciphtxt[nSz:]
	plaintxt, e := gcipher.Open(k[:0], n, k, nil)
	if e != nil {
		fmt.Println("Failed to open: ", e)
		panic(e)
	}
	return plaintxt
}

func main() {
	pt := []byte("This is a plaintext string that I need to encrypt")
	key := RandomBytes(32)
	gcmEvals := [][]byte{}
	gcmBEvals := [][]byte{}

	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err)
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		panic(err)
	}

	blockB, err := aes.NewCipher(key)
	if err != nil {
		panic(err)
	}

	fmt.Println("Key:", key)
	var gcmB cipher.AEAD

	for range 10 {
		nonce := RandomBytes(12)

		ctA := gcm.Seal(nil, nonce, pt, nil)
		fmt.Println("ctA", ctA)
		ctAopen, err := gcm.Open(nil, nonce, pt, nil)
		if err != nil {
			panic(err)
		}
		fmt.Println("Open ctA", ctAopen)
		gcmEvals = append(gcmEvals, ctA)

		gcmB, err = cipher.NewGCMWithRandomNonce(blockB)
		if err != nil {
			panic(err)
		}

		ctB := gcmB.Seal(nil, nil, pt, nil)
		if err != nil {
			panic(err)
		}

		fmt.Printf("ciphertext: %x; ciphertextB: %x\n", ctA, ctB)
		gcmBEvals = append(gcmBEvals, ctB)
	}

	for _, k := range gcmEvals {
		fmt.Print(k, string(k))
		retval := dc(k, key)
		fmt.Println("GCM-only", string(retval))
	}

	for _, k := range gcmBEvals {
		g, err := gcmB.Open(nil, nil, k, nil)
		if err != nil {
			panic(err)
		}
		fmt.Println("withRandomNonce", k, g, string(g))
	}
}

/*
const iv = crypto.getRandomValues(new Uint8Array(16));


async function generateAesKey(kfunc = 'dek') {
  let kf = [];

  if ( kfunc === 'dek' ) kf = [ 'encrypt', 'decrypt' ];
  if ( kfunc === 'kek' ) kf = [ 'wrapKey', 'unwrapKey' ];

  const key = await subtle.generateKey({
    name: process.env.CDB_KA,
    length: process.env.CDB_KL,
  }, true, kf);

  return key;
}

async function aesEncrypt(ptxt, key) {
  const ctxt = await crypto.subtle.encrypt({
    name: process.env.CDB_KA,
    iv,
  }, key, ec.encode(ptxt));
  return ctxt;
}

const ec = new TextEncoder();
const kek = await generateAesKey('kek');
const expkek = await subtle.exportKey( process.env.CDB_EKT, kek );

  let data;
  let content;
  let key, wkey, wkey_buf, wkey64;

    key = await generateAesKey();
    wkey = await subtle.wrapKey(
      process.env.CDB_EKT
      , key
      , kek
      , {
          name: process.env.CDB_KA
          , iv: iv
        }
    );
    wkey64 = Buffer.from(wkey).toString('base64');

    data = await aesEncrypt(content, key);



*/
