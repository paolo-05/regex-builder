import type { RegexOption, TestResult, RegexMatch } from "../types/regex"

export class RegexGenerator {
  private options: Map<string, RegexOption> = new Map()

  constructor(allOptions: RegexOption[]) {
    allOptions.forEach((option) => {
      this.options.set(option.id, option)
    })
  }

  generateRegex(selectedIds: string[]): string {
    if (selectedIds.length === 0) {
      return ""
    }

    const selectedOptions = selectedIds.map((id) => this.options.get(id)).filter(Boolean) as RegexOption[]

    // Separate different types of patterns
    const anchors = selectedOptions.filter((opt) => opt.type === "anchor")
    const characters = selectedOptions.filter((opt) => opt.type === "character")
    const quantifiers = selectedOptions.filter((opt) => opt.type === "quantifier")
    const presets = selectedOptions.filter((opt) => opt.type === "preset")
    const specials = selectedOptions.filter((opt) => opt.type === "special")

    // If we have preset patterns, use the most specific one
    if (presets.length > 0) {
      const preset = presets[0] // Use first preset for simplicity
      return this.wrapWithAnchors(preset.pattern, anchors)
    }

    // Build character class
    let characterPattern = this.buildCharacterClass(characters, specials)

    // Apply quantifiers
    if (quantifiers.length > 0 && characterPattern) {
      const quantifier = quantifiers[0] // Use first quantifier
      characterPattern += quantifier.pattern
    }

    // Wrap with anchors
    return this.wrapWithAnchors(characterPattern, anchors)
  }

  private buildCharacterClass(characters: RegexOption[], specials: RegexOption[]): string {
    if (characters.length === 0 && specials.length === 0) {
      return ""
    }

    const patterns: string[] = []

    // Handle character types
    characters.forEach((char) => {
      switch (char.id) {
        case "letters":
          patterns.push("a-zA-Z")
          break
        case "digits":
          patterns.push("0-9")
          break
        case "whitespace":
          patterns.push("\\s")
          break
        case "word-chars":
          patterns.push("\\w")
          break
        case "any-char":
          return "." // Any character doesn't need character class
        default:
          patterns.push(char.pattern)
      }
    })

    // Handle special characters
    specials.forEach((special) => {
      switch (special.id) {
        case "punctuation":
          patterns.push(".,;:!?")
          break
        case "brackets":
          patterns.push("\\[\\]{}()")
          break
        case "quotes":
          patterns.push("\"'")
          break
        case "symbols":
          patterns.push("#$%&*+/<=>@^_`|~-")
          break
      }
    })

    if (patterns.length === 0) return ""
    if (patterns.length === 1 && patterns[0] === ".") return "."

    return `[${patterns.join("")}]`
  }

  private wrapWithAnchors(pattern: string, anchors: RegexOption[]): string {
    if (!pattern) return ""

    let result = pattern
    const hasStart = anchors.some((a) => a.id === "start")
    const hasEnd = anchors.some((a) => a.id === "end")
    const hasWordBoundary = anchors.some((a) => a.id === "word-boundary")
    const hasNonWordBoundary = anchors.some((a) => a.id === "non-word-boundary")

    if (hasWordBoundary) {
      result = `\\b${result}\\b`
    } else if (hasNonWordBoundary) {
      result = `\\B${result}\\B`
    }

    if (hasStart) {
      result = `^${result}`
    }
    if (hasEnd) {
      result = `${result}$`
    }

    return result
  }

  testRegex(pattern: string, testString: string, flags = "g"): TestResult {
    try {
      if (!pattern) {
        return { isMatch: false, matches: [] }
      }

      const regex = new RegExp(pattern, flags)
      const matches: RegexMatch[] = []
      let match

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          })

          // Prevent infinite loop on zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++
          }
        }
      } else {
        match = regex.exec(testString)
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          })
        }
      }

      return {
        isMatch: matches.length > 0,
        matches,
      }
    } catch (error) {
      return {
        isMatch: false,
        matches: [],
        error: error instanceof Error ? error.message : "Invalid regex pattern",
      }
    }
  }
}
