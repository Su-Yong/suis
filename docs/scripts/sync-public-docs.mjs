import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = join(docsRoot, 'src', 'en');
const targetRoot = join(docsRoot, 'public', 'docs');

const getMarkdownFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return getMarkdownFiles(path);
      }

      return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
    }),
  );

  return files.flat();
};

await rm(targetRoot, { force: true, recursive: true });

const sourceFiles = await getMarkdownFiles(sourceRoot);

for (const sourceFile of sourceFiles) {
  const targetFile = join(targetRoot, relative(sourceRoot, sourceFile));
  const content = await readFile(sourceFile);

  await mkdir(dirname(targetFile), { recursive: true });
  await writeFile(targetFile, content);
}

console.log(`Synced ${sourceFiles.length} Markdown docs to ${relative(docsRoot, targetRoot)}.`);
