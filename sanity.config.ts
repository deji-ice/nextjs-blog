import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { myTheme } from "./src/sanity/theme";
import { codeInput } from '@sanity/code-input';


let projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
let dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
    console.warn('Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Using fallback value.');
    projectId = 'e1we4hfw'; // fallback projectId
}
if (!dataset) {
    console.warn('Warning: NEXT_PUBLIC_SANITY_DATASET is not set. Using fallback value.');
    dataset = 'production'; // fallback dataset
}

export default defineConfig({
    basePath: "/studio",
    name: "The_Code_Chronicles_Studio",
    title: "The Code Chronicles Studio",

    projectId,
    dataset,

    plugins: [structureTool(), visionTool(), codeInput(),],

    schema: {
        types: schemaTypes,
    },
    theme: myTheme,
});
