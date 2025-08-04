import { Github, Linkedin, TwitterIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const socialLinks = [
    {
      label: "GitHub",
      url: "https://github.com/paolo-05/regex-builder",
      icon: <Github />,
    },
  ];
  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold mb-2">Regext Builder</div>
            <p className="text-muted-foreground">
              A tool to help you build and test regular expressions
            </p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Regext Builder - Made by{" "}
            <Link
              href="https://bianchessipaolo.works/"
              className="font-primary font-semibold text-foreground hover:underline"
            >
              Paolo Bianchessi
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
