import type { LanguageExport } from "../types/export"

export class LanguageExporter {
  static exportToLanguages(pattern: string, testString = "your text here"): LanguageExport[] {
    if (!pattern) return []

    const escapedPattern = pattern.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
    const singleQuotePattern = pattern.replace(/\\/g, "\\\\").replace(/'/g, "\\'")

    return [
      {
        language: "JavaScript",
        icon: "🟨",
        description: "ES6+ JavaScript with RegExp constructor and methods",
        code: `// Create the regex
const regex = /${pattern}/g;

// Test if string matches
const isMatch = regex.test("${testString}");

// Find all matches
const matches = "${testString}".match(/${pattern}/g);

// Find matches with details
const detailedMatches = [...("${testString}".matchAll(/${pattern}/g))];

// Replace matches
const replaced = "${testString}".replace(/${pattern}/g, "replacement");

console.log("Is match:", isMatch);
console.log("Matches:", matches);
console.log("Detailed matches:", detailedMatches);`,
      },
      {
        language: "Python",
        icon: "🐍",
        description: "Python with re module for regex operations",
        code: `import re

# Create the regex pattern
pattern = r"${pattern}"

# Test if string matches
is_match = bool(re.search(pattern, "${testString}"))

# Find first match
first_match = re.search(pattern, "${testString}")

# Find all matches
all_matches = re.findall(pattern, "${testString}")

# Find matches with details
detailed_matches = list(re.finditer(pattern, "${testString}"))

# Replace matches
replaced = re.sub(pattern, "replacement", "${testString}")

print(f"Is match: {is_match}")
print(f"All matches: {all_matches}")
print(f"Replaced: {replaced}")`,
      },
      {
        language: "Go",
        icon: "🔵",
        description: "Go with regexp package for pattern matching",
        code: `package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Compile the regex
    regex, err := regexp.Compile(\`${pattern}\`)
    if err != nil {
        panic(err)
    }
    
    text := "${testString}"
    
    // Test if string matches
    isMatch := regex.MatchString(text)
    
    // Find first match
    firstMatch := regex.FindString(text)
    
    // Find all matches
    allMatches := regex.FindAllString(text, -1)
    
    // Replace matches
    replaced := regex.ReplaceAllString(text, "replacement")
    
    fmt.Printf("Is match: %v\\n", isMatch)
    fmt.Printf("First match: %s\\n", firstMatch)
    fmt.Printf("All matches: %v\\n", allMatches)
    fmt.Printf("Replaced: %s\\n", replaced)
}`,
      },
      {
        language: "Java",
        icon: "☕",
        description: "Java with Pattern and Matcher classes",
        code: `import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.ArrayList;
import java.util.List;

public class RegexExample {
    public static void main(String[] args) {
        // Compile the pattern
        Pattern pattern = Pattern.compile("${escapedPattern}");
        String text = "${testString}";
        
        // Create matcher
        Matcher matcher = pattern.matcher(text);
        
        // Test if string matches
        boolean isMatch = matcher.find();
        matcher.reset(); // Reset for reuse
        
        // Find all matches
        List<String> matches = new ArrayList<>();
        while (matcher.find()) {
            matches.add(matcher.group());
        }
        
        // Replace matches
        String replaced = pattern.matcher(text).replaceAll("replacement");
        
        System.out.println("Is match: " + isMatch);
        System.out.println("Matches: " + matches);
        System.out.println("Replaced: " + replaced);
    }
}`,
      },
      {
        language: "C#",
        icon: "🔷",
        description: "C# with System.Text.RegularExpressions namespace",
        code: `using System;
using System.Text.RegularExpressions;

class Program 
{
    static void Main() 
    {
        // Create the regex
        Regex regex = new Regex(@"${pattern}");
        string text = "${testString}";
        
        // Test if string matches
        bool isMatch = regex.IsMatch(text);
        
        // Find first match
        Match firstMatch = regex.Match(text);
        
        // Find all matches
        MatchCollection allMatches = regex.Matches(text);
        
        // Replace matches
        string replaced = regex.Replace(text, "replacement");
        
        Console.WriteLine($"Is match: {isMatch}");
        Console.WriteLine($"First match: {firstMatch.Value}");
        Console.WriteLine($"Match count: {allMatches.Count}");
        Console.WriteLine($"Replaced: {replaced}");
    }
}`,
      },
      {
        language: "PHP",
        icon: "🐘",
        description: "PHP with PCRE functions for regex operations",
        code: `<?php

$pattern = '/${singleQuotePattern}/';
$text = '${testString}';

// Test if string matches
$isMatch = preg_match($pattern, $text);

// Find all matches
preg_match_all($pattern, $text, $matches);

// Find matches with details
preg_match_all($pattern, $text, $detailedMatches, PREG_OFFSET_CAPTURE);

// Replace matches
$replaced = preg_replace($pattern, 'replacement', $text);

echo "Is match: " . ($isMatch ? 'true' : 'false') . "\\n";
echo "Matches: " . print_r($matches[0], true) . "\\n";
echo "Replaced: " . $replaced . "\\n";

?>`,
      },
      {
        language: "Ruby",
        icon: "💎",
        description: "Ruby with built-in regex support and methods",
        code: `# Create the regex
regex = /${pattern}/

text = "${testString}"

# Test if string matches
is_match = !!(text =~ regex)

# Find all matches
matches = text.scan(regex)

# Find matches with details
detailed_matches = text.to_enum(:scan, regex).map { Regexp.last_match }

# Replace matches
replaced = text.gsub(regex, 'replacement')

puts "Is match: #{is_match}"
puts "Matches: #{matches}"
puts "Replaced: #{replaced}"`,
      },
      {
        language: "Rust",
        icon: "🦀",
        description: "Rust with regex crate for pattern matching",
        code: `use regex::Regex;

fn main() {
    // Create the regex (add regex = "1" to Cargo.toml)
    let regex = Regex::new(r"${pattern}").unwrap();
    let text = "${testString}";
    
    // Test if string matches
    let is_match = regex.is_match(text);
    
    // Find first match
    let first_match = regex.find(text);
    
    // Find all matches
    let all_matches: Vec<&str> = regex
        .find_iter(text)
        .map(|m| m.as_str())
        .collect();
    
    // Replace matches
    let replaced = regex.replace_all(text, "replacement");
    
    println!("Is match: {}", is_match);
    println!("All matches: {:?}", all_matches);
    println!("Replaced: {}", replaced);
}`,
      },
      {
        language: "Swift",
        icon: "🦉",
        description: "Swift with NSRegularExpression and native regex support",
        code: `import Foundation

let pattern = "${escapedPattern}"
let text = "${testString}"

do {
    // Create NSRegularExpression
    let regex = try NSRegularExpression(pattern: pattern)
    let range = NSRange(location: 0, length: text.utf16.count)
    
    // Test if string matches
    let isMatch = regex.firstMatch(in: text, range: range) != nil
    
    // Find all matches
    let matches = regex.matches(in: text, range: range)
    let matchStrings = matches.compactMap { match in
        Range(match.range, in: text).map { String(text[$0]) }
    }
    
    // Replace matches
    let replaced = regex.stringByReplacingMatches(
        in: text, 
        range: range, 
        withTemplate: "replacement"
    )
    
    print("Is match: \\(isMatch)")
    print("Matches: \\(matchStrings)")
    print("Replaced: \\(replaced)")
    
} catch {
    print("Invalid regex: \\(error)")
}`,
      },
    ]
  }
}
