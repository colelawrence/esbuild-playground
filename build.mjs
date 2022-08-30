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
minify`
namespace Permissions {
  export const pmt = "pmt";
  export enum PaymentFlags {
    ADD_PAYMENT_METHOD = 1 << 0,
    REMOVE_PAYMENT_METHOD = 1 << 1,
    CHANGE_DEFAULT_PAYMENT_METHOD = 1 << 2,
    AUTHORIZE_NEW_CHARGE = 1 << 3,
    AUTHORIZE_SUBSCRIPTION_SETUP = 1 << 4,
  }
  export const PMT_OWNER_FLAGS =
    PaymentFlags.ADD_PAYMENT_METHOD |
    PaymentFlags.REMOVE_PAYMENT_METHOD |
    PaymentFlags.CHANGE_DEFAULT_PAYMENT_METHOD |
    PaymentFlags.AUTHORIZE_NEW_CHARGE |
    PaymentFlags.AUTHORIZE_SUBSCRIPTION_SETUP |
    0;

  checkEnum(pmt, PaymentFlags);

  export function combine<T extends Record<string, number>>(...perms: Partial<T>[]): Partial<T> {
    if (perms.length === 0) return {};
    if (perms.length === 1) return perms[0];
    const acc = { ...perms[0] };
    // start at 1
    for (let i = 1; i < perms.length; i++) {
      const perm = perms[i];
      for (const key in perm) {
        // @ts-ignore hmm... probably want to get some tests in place
        acc[key] |= perm[key];
      }
    }
    return acc;
  }
}
`;
minify`
const a = {
  trop: 1,
  _prop: 1,
}

a._prop * a._prop
a.trop * a.trop

function n(b) {
  return b._prop
}
function h(b) {
  return b["_prop"]
}
`;
minify`
class Requirements<TName extends string = string> {
  // @ts-ignore
  _name: TName
}
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
    giveMeAColor("🔔") +
      esbuild.transformSync(src, {
        minifySyntax: true,
        loader: "ts",
        mangleProps: /^_/,
      }).code
  );
}

function giveMeAColor(name) {
  return `\u001b[38;5;${
    22 + (name.charCodeAt(0) % 12) + (name.charCodeAt(name.length - 1) % 6) * 36
  }m`;
}
