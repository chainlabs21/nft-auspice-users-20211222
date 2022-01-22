import bs58 from 'bs58'
import crypto from 'crypto'

import { generaterandomstr } from './common'

const get_ipfsformatcid_str=str=>{
  const hashFunction = Buffer.from('12', 'hex') // 0x20
  const digest = crypto.createHash('sha256').update(str).digest() // data
//  CONSOLEON && console.log(digest.toString('hex')) // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
  const digestSize = Buffer.from(digest.byteLength.toString(16), 'hex')
//  CONSOLEON && console.log(digestSize.toString('hex')) // 20
  const combined = Buffer.concat([hashFunction, digestSize, digest])
//  CONSOLEON && console.log(combined.toString('hex')) // 1220b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
  const multihash = bs58.encode(combined)
//  CONSOLEON && console.log(multihash.toString()) // QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4
  return multihash.toString()
}
const get_random_ipfs=_=>{
	return get_ipfsformatcid_str( generaterandomstr ( 10 ) ) 
}
export {
	get_ipfsformatcid_str
	,  get_random_ipfs
}
// > const bs58=require('bs58')