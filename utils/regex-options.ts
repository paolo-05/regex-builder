import type { RegexOption } from "../types/regex"

export const regexOptions: RegexOption[] = [
  // Character Types
  { id: "letters", label: "Letters (a-z, A-Z)", pattern: "[a-zA-Z]", type: "character", category: "Character Types" },
  { id: "digits", label: "Digits (0-9)", pattern: "\\d", type: "character", category: "Character Types" },
  { id: "whitespace", label: "Whitespace", pattern: "\\s", type: "character", category: "Character Types" },
  { id: "word-chars", label: "Word characters", pattern: "\\w", type: "character", category: "Character Types" },
  {
    id: "any-char",
    label: "Any character",
    pattern: ".",
    type: "character",
    category: "Character Types",
    conflictsWith: ["letters", "digits", "whitespace", "word-chars"],
  },

  // Quantifiers
  {
    id: "one-or-more",
    label: "One or more (+)",
    pattern: "+",
    type: "quantifier",
    category: "Quantifiers",
    requiresBase: true,
  },
  {
    id: "zero-or-more",
    label: "Zero or more (*)",
    pattern: "*",
    type: "quantifier",
    category: "Quantifiers",
    requiresBase: true,
  },
  {
    id: "optional",
    label: "Optional (?)",
    pattern: "?",
    type: "quantifier",
    category: "Quantifiers",
    requiresBase: true,
  },
  {
    id: "exactly-n",
    label: "Exactly 3 times",
    pattern: "{3}",
    type: "quantifier",
    category: "Quantifiers",
    requiresBase: true,
  },
  {
    id: "range",
    label: "Between 2-5 times",
    pattern: "{2,5}",
    type: "quantifier",
    category: "Quantifiers",
    requiresBase: true,
  },

  // Anchors & Boundaries
  { id: "start", label: "Start of string (^)", pattern: "^", type: "anchor", category: "Anchors & Boundaries" },
  { id: "end", label: "End of string ($)", pattern: "$", type: "anchor", category: "Anchors & Boundaries" },
  {
    id: "word-boundary",
    label: "Word boundary",
    pattern: "\\b",
    type: "anchor",
    category: "Anchors & Boundaries",
    conflictsWith: ["non-word-boundary"],
  },
  {
    id: "non-word-boundary",
    label: "Non-word boundary",
    pattern: "\\B",
    type: "anchor",
    category: "Anchors & Boundaries",
    conflictsWith: ["word-boundary"],
  },

  // Common Patterns
  {
    id: "email",
    label: "Email format",
    pattern: "[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}",
    type: "preset",
    category: "Common Patterns",
  },
  {
    id: "phone",
    label: "Phone number",
    pattern: "$$?\\d{3}$$?[-.]?\\d{3}[-.]?\\d{4}",
    type: "preset",
    category: "Common Patterns",
  },
  {
    id: "url",
    label: "URL format",
    pattern: "https?://[\\w.-]+\\.[a-zA-Z]{2,}(?:/[\\w.-]*)*/?",
    type: "preset",
    category: "Common Patterns",
  },
  {
    id: "ip",
    label: "IP Address",
    pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b",
    type: "preset",
    category: "Common Patterns",
  },
  {
    id: "date",
    label: "Date (MM/DD/YYYY)",
    pattern: "\\d{2}/\\d{2}/\\d{4}",
    type: "preset",
    category: "Common Patterns",
  },

  // Special Characters
  { id: "punctuation", label: "Punctuation", pattern: "[.,;:!?]", type: "special", category: "Special Characters" },
  { id: "brackets", label: "Brackets", pattern: "[\\[\\]{}()]", type: "special", category: "Special Characters" },
  { id: "quotes", label: "Quotes", pattern: "[\"']", type: "special", category: "Special Characters" },
  { id: "symbols", label: "Symbols", pattern: "[#$%&*+/<=>@^_`|~-]", type: "special", category: "Special Characters" },
]
