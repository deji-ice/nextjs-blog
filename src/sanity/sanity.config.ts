import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { myTheme } from "./theme";
import { codeInput } from '@sanity/code-input';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

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
