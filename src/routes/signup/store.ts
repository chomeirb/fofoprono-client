import { writable } from 'svelte/store'

export const submiting = writable(false)

export const result = writable("")

export function cleanResult() {
  result.set("")
}