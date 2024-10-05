// Vitest Config
import {configDefaults, defineConfig} from "vitest/config";
//import { nodeLoaderPlugin } from "@vavite/node-loader/plugin";

export default defineConfig({
    test: {
        globals: true,
        root: "./",
        exclude: [...configDefaults.exclude, "node_modules/*"],
    },
});