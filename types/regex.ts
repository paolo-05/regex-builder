export interface RegexOption {
  id: string
  label: string
  pattern: string
  type: "character" | "quantifier" | "anchor" | "preset" | "special"
  category: string
  conflictsWith?: string[]
  requiresBase?: boolean
}

export interface RegexMatch {
  match: string
  index: number
  groups?: string[]
}

export interface TestResult {
  isMatch: boolean
  matches: RegexMatch[]
  error?: string
}
