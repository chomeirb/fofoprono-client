import { writable, type Writable } from 'svelte/store'

export const submiting: Writable<boolean> = writable(false)

export const result: Writable<String> = writable("")

export function cleanResult() {
  result.set("")
}