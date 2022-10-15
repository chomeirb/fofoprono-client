import { writable } from 'svelte/store'

export const connecting = writable(false)

export const result = writable("")

export function cleanResult() {
  result.set("")
}