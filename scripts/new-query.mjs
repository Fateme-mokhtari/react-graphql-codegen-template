import fs from "node:fs";
import path from "node:path";

const rawName = process.argv[2] ?? "NewQuery";
const operationName = rawName.replace(/[^a-zA-Z0-9_]/g, "");

if (!operationName) {
  console.error(
    "Please provide a valid query name, example: pnpm query:new GetEpisodes",
  );
  process.exit(1);
}

const fileName = `${operationName[0].toLowerCase()}${operationName.slice(1)}.graphql`;
const filePath = path.join(process.cwd(), "src", "queries", fileName);

if (fs.existsSync(filePath)) {
  console.error(`Query file already exists: ${filePath}`);
  process.exit(1);
}

const sampleQuery = `query ${operationName} {
  characters(page: 1) {
    results {
      id
      name
      status
      species
      image
    }
  }
}
`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, sampleQuery, "utf8");

console.log(`Created ${path.relative(process.cwd(), filePath)}`);
console.log(
  `Import with: import ${operationName}Query from "./queries/${fileName}?raw";`,
);
