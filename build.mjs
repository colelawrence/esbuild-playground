import esbuild from "esbuild";

minify(function a() {
  const a = 1 | 2 | 4;
  return a;
});

minify`
e:break e;
`;
minify`
const a = 1 | 2 | 4
`;

function minify(template, ...args) {
  const ANSI_RESET = "\u001b[0m";
  const src =
    typeof template === "function"
      ? template.toString()
      : String.raw(template, ...args).trim();
  console.log(ANSI_RESET + giveMeAColor("🫥") + "____".repeat(8));
  console.log(giveMeAColor("🧐") + src);
  console.log(
    giveMeAColor("🔔") + esbuild.transformSync(src, { minifySyntax: true }).code
  );
}

function giveMeAColor(name) {
  return `\u001b[38;5;${
    22 + (name.charCodeAt(0) % 12) + (name.charCodeAt(name.length - 1) % 6) * 36
  }m`;
}
