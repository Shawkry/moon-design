import * as fs from "fs";
import * as path from "path";
import type { Alias } from "vite";

const cache: string[] = [];
const extensions = [".tsx", ".ts", ".js", ".jsx", ".json"];

function findPackageRoot(filename: string): string {
  let dir = path.dirname(filename);

  const matched = cache.find((item) => dir.startsWith(item));

  if (matched) {
    return matched;
  }

  while (!isExist(path.join(dir, "package.json"))) {
    dir = path.join(dir, "..");
  }

  cache.push(dir);

  return dir;
}

function isExist(file: string): boolean {
  try {
    fs.accessSync(file, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function isDir(file: string): boolean {
  try {
    return fs.statSync(file).isDirectory();
  } catch {
    return false;
  }
}

function findFileAvailable(base: string): string {
  if (base.endsWith("/")) {
    base = base + "index";
  } else if (isDir(base)) {
    base = base + "/index";
  } else if (isExist(base)) {
    return base;
  }

  for (const ext of extensions) {
    const file = base + ext;

    if (isExist(file)) {
      return file;
    }
  }

  return base;
}

export function createViteAliasUtil(find: string, replace: string): Alias {
  return {
    find,
    replacement: find,
    customResolver(source, importer) {
      if (!replace.startsWith("./")) {
        throw 'replace must start with "./"';
      }

      if (!importer) {
        return null;
      }

      const root = findPackageRoot(importer);
      source = source.replace(find, replace);

      const id = findFileAvailable(path.join(root, source));

      return {
        id,
      };
    },
  };
}
