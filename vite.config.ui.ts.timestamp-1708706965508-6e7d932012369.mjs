// vite.config.ui.ts
import { defineConfig } from "file:///Users/arenda5000klient/projects/figma-plugin/node_modules/vite/dist/node/index.js";
import path from "path";
import { viteSingleFile } from "file:///Users/arenda5000klient/projects/figma-plugin/node_modules/vite-plugin-singlefile/dist/esm/index.js";
import react from "file:///Users/arenda5000klient/projects/figma-plugin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import postcssUrl from "file:///Users/arenda5000klient/projects/figma-plugin/node_modules/postcss-url/src/index.js";

// scripts/vite/vite-inline-svg.ts
import fs from "fs";
function svgToDataURL(svgStr) {
  const encoded = encodeURIComponent(svgStr).replace(/'/g, "%27").replace(/"/g, "%22");
  const header = "data:image/svg+xml,";
  const dataUrl = header + encoded;
  return dataUrl;
}
function vite_inline_svg_default() {
  return {
    name: "vite-inline-svg",
    enforce: "pre",
    async load(id) {
      const [path2, query] = id.split("?", 2);
      if (!path2.endsWith(".svg"))
        return;
      if (query !== "inline")
        return;
      const svg = await fs.promises.readFile(path2, "utf-8");
      return `export default "${svgToDataURL(svg)}"`;
    }
  };
}

// scripts/vite/vite-svgr-component.ts
import { createFilter } from "file:///Users/arenda5000klient/projects/figma-plugin/node_modules/@rollup/pluginutils/dist/es/index.js";
import fs2 from "fs";
import { transformWithEsbuild } from "file:///Users/arenda5000klient/projects/figma-plugin/node_modules/vite/dist/node/index.js";
function viteSvgr({
  svgrOptions,
  esbuildOptions,
  include = "**/*.svg?component",
  exclude
} = {}) {
  const filter = createFilter(include, exclude);
  return {
    name: "vite-svgr-component",
    async transform(code, id) {
      if (filter(id)) {
        const { transform } = await import("file:///Users/arenda5000klient/projects/figma-plugin/node_modules/@svgr/core/dist/index.js");
        const svgCode = await fs2.promises.readFile(
          id.replace(/\?.*$/, ""),
          "utf8"
        );
        const componentCode = await transform(svgCode, svgrOptions, {
          filePath: id,
          caller: { previousExport: null }
        });
        const res = await transformWithEsbuild(componentCode, id, {
          loader: "jsx",
          ...esbuildOptions
        });
        return {
          code: res.code,
          map: null
        };
      }
    }
  };
}

// vite.config.ui.ts
var __vite_injected_original_dirname = "/Users/arenda5000klient/projects/figma-plugin";
var vite_config_ui_default = defineConfig({
  plugins: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    react(),
    viteSvgr(),
    vite_inline_svg_default(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    viteSingleFile()
  ],
  root: path.resolve(__vite_injected_original_dirname, "./src/ui/"),
  build: {
    outDir: path.resolve(__vite_injected_original_dirname, "./dist"),
    rollupOptions: {
      input: {
        ui: path.relative(__vite_injected_original_dirname, "./src/ui/index.html")
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  },
  css: {
    postcss: {
      plugins: [postcssUrl({ url: "inline" })]
    }
  },
  resolve: {
    alias: {
      "@common": path.resolve(__vite_injected_original_dirname, "./src/common"),
      "@ui": path.resolve(__vite_injected_original_dirname, "./src/ui")
    }
  }
});
export {
  vite_config_ui_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudWkudHMiLCAic2NyaXB0cy92aXRlL3ZpdGUtaW5saW5lLXN2Zy50cyIsICJzY3JpcHRzL3ZpdGUvdml0ZS1zdmdyLWNvbXBvbmVudC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hcmVuZGE1MDAwa2xpZW50L3Byb2plY3RzL2ZpZ21hLXBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FyZW5kYTUwMDBrbGllbnQvcHJvamVjdHMvZmlnbWEtcGx1Z2luL3ZpdGUuY29uZmlnLnVpLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hcmVuZGE1MDAwa2xpZW50L3Byb2plY3RzL2ZpZ21hLXBsdWdpbi92aXRlLmNvbmZpZy51aS50c1wiOy8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llcyAqL1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IHZpdGVTaW5nbGVGaWxlIH0gZnJvbSBcInZpdGUtcGx1Z2luLXNpbmdsZWZpbGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBwb3N0Y3NzVXJsIGZyb20gXCJwb3N0Y3NzLXVybFwiO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGlubGluZVN2ZyBmcm9tIFwiLi9zY3JpcHRzL3ZpdGUvdml0ZS1pbmxpbmUtc3ZnXCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgc3ZnQ29tcG9uZW50IGZyb20gXCIuL3NjcmlwdHMvdml0ZS92aXRlLXN2Z3ItY29tcG9uZW50XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZWFjdCgpLFxuICAgIHN2Z0NvbXBvbmVudCgpLFxuICAgIGlubGluZVN2ZygpLFxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB2aXRlU2luZ2xlRmlsZSgpLFxuICBdLFxuICByb290OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3VpL1wiKSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9kaXN0XCIpLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIHVpOiBwYXRoLnJlbGF0aXZlKF9fZGlybmFtZSwgXCIuL3NyYy91aS9pbmRleC5odG1sXCIpLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0uanNcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW3Bvc3Rjc3NVcmwoeyB1cmw6IFwiaW5saW5lXCIgfSldLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAY29tbW9uXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29tbW9uXCIpLFxuICAgICAgXCJAdWlcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy91aVwiKSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hcmVuZGE1MDAwa2xpZW50L3Byb2plY3RzL2ZpZ21hLXBsdWdpbi9zY3JpcHRzL3ZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hcmVuZGE1MDAwa2xpZW50L3Byb2plY3RzL2ZpZ21hLXBsdWdpbi9zY3JpcHRzL3ZpdGUvdml0ZS1pbmxpbmUtc3ZnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hcmVuZGE1MDAwa2xpZW50L3Byb2plY3RzL2ZpZ21hLXBsdWdpbi9zY3JpcHRzL3ZpdGUvdml0ZS1pbmxpbmUtc3ZnLnRzXCI7aW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSBcInZpdGVcIjtcblxuZnVuY3Rpb24gc3ZnVG9EYXRhVVJMKHN2Z1N0cjogc3RyaW5nKSB7XG4gIGNvbnN0IGVuY29kZWQgPSBlbmNvZGVVUklDb21wb25lbnQoc3ZnU3RyKVxuICAgIC5yZXBsYWNlKC8nL2csIFwiJTI3XCIpXG4gICAgLnJlcGxhY2UoL1wiL2csIFwiJTIyXCIpO1xuXG4gIGNvbnN0IGhlYWRlciA9IFwiZGF0YTppbWFnZS9zdmcreG1sLFwiO1xuICBjb25zdCBkYXRhVXJsID0gaGVhZGVyICsgZW5jb2RlZDtcblxuICByZXR1cm4gZGF0YVVybDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFBsdWdpbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJ2aXRlLWlubGluZS1zdmdcIixcbiAgICBlbmZvcmNlOiBcInByZVwiLFxuXG4gICAgYXN5bmMgbG9hZChpZCkge1xuICAgICAgY29uc3QgW3BhdGgsIHF1ZXJ5XSA9IGlkLnNwbGl0KFwiP1wiLCAyKTtcblxuICAgICAgaWYgKCFwYXRoLmVuZHNXaXRoKFwiLnN2Z1wiKSkgcmV0dXJuO1xuICAgICAgaWYgKHF1ZXJ5ICE9PSBcImlubGluZVwiKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHN2ZyA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHBhdGgsIFwidXRmLThcIik7XG4gICAgICByZXR1cm4gYGV4cG9ydCBkZWZhdWx0IFwiJHtzdmdUb0RhdGFVUkwoc3ZnKX1cImA7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FyZW5kYTUwMDBrbGllbnQvcHJvamVjdHMvZmlnbWEtcGx1Z2luL3NjcmlwdHMvdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FyZW5kYTUwMDBrbGllbnQvcHJvamVjdHMvZmlnbWEtcGx1Z2luL3NjcmlwdHMvdml0ZS92aXRlLXN2Z3ItY29tcG9uZW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hcmVuZGE1MDAwa2xpZW50L3Byb2plY3RzL2ZpZ21hLXBsdWdpbi9zY3JpcHRzL3ZpdGUvdml0ZS1zdmdyLWNvbXBvbmVudC50c1wiO2ltcG9ydCB7IGNyZWF0ZUZpbHRlciwgRmlsdGVyUGF0dGVybiB9IGZyb20gXCJAcm9sbHVwL3BsdWdpbnV0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IENvbmZpZyB9IGZyb20gXCJAc3Znci9jb3JlXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm1XaXRoRXNidWlsZCB9IGZyb20gXCJ2aXRlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVml0ZVN2Z3JPcHRpb25zIHtcbiAgc3Znck9wdGlvbnM/OiBDb25maWc7XG4gIGVzYnVpbGRPcHRpb25zPzogUGFyYW1ldGVyczx0eXBlb2YgdHJhbnNmb3JtV2l0aEVzYnVpbGQ+WzJdO1xuICBleGNsdWRlPzogRmlsdGVyUGF0dGVybjtcbiAgaW5jbHVkZT86IEZpbHRlclBhdHRlcm47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpdGVTdmdyKHtcbiAgc3Znck9wdGlvbnMsXG4gIGVzYnVpbGRPcHRpb25zLFxuICBpbmNsdWRlID0gXCIqKi8qLnN2Zz9jb21wb25lbnRcIixcbiAgZXhjbHVkZSxcbn06IFZpdGVTdmdyT3B0aW9ucyA9IHt9KTogUGx1Z2luIHtcbiAgY29uc3QgZmlsdGVyID0gY3JlYXRlRmlsdGVyKGluY2x1ZGUsIGV4Y2x1ZGUpO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJ2aXRlLXN2Z3ItY29tcG9uZW50XCIsXG5cbiAgICBhc3luYyB0cmFuc2Zvcm0oY29kZSwgaWQpIHtcbiAgICAgIGlmIChmaWx0ZXIoaWQpKSB7XG4gICAgICAgIGNvbnN0IHsgdHJhbnNmb3JtIH0gPSBhd2FpdCBpbXBvcnQoXCJAc3Znci9jb3JlXCIpO1xuICAgICAgICBjb25zdCBzdmdDb2RlID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoXG4gICAgICAgICAgaWQucmVwbGFjZSgvXFw/LiokLywgXCJcIiksXG4gICAgICAgICAgXCJ1dGY4XCIsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50Q29kZSA9IGF3YWl0IHRyYW5zZm9ybShzdmdDb2RlLCBzdmdyT3B0aW9ucywge1xuICAgICAgICAgIGZpbGVQYXRoOiBpZCxcbiAgICAgICAgICBjYWxsZXI6IHsgcHJldmlvdXNFeHBvcnQ6IG51bGwgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJhbnNmb3JtV2l0aEVzYnVpbGQoY29tcG9uZW50Q29kZSwgaWQsIHtcbiAgICAgICAgICBsb2FkZXI6IFwianN4XCIsXG4gICAgICAgICAgLi4uZXNidWlsZE9wdGlvbnMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgbWFwOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxVQUFVO0FBRWpCLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjs7O0FDTmlWLE9BQU8sUUFBUTtBQUd2WCxTQUFTLGFBQWEsUUFBZ0I7QUFDcEMsUUFBTSxVQUFVLG1CQUFtQixNQUFNLEVBQ3RDLFFBQVEsTUFBTSxLQUFLLEVBQ25CLFFBQVEsTUFBTSxLQUFLO0FBRXRCLFFBQU0sU0FBUztBQUNmLFFBQU0sVUFBVSxTQUFTO0FBRXpCLFNBQU87QUFDVDtBQUVlLFNBQVIsMEJBQTRCO0FBQ2pDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUVULE1BQU0sS0FBSyxJQUFJO0FBQ2IsWUFBTSxDQUFDQSxPQUFNLEtBQUssSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBRXJDLFVBQUksQ0FBQ0EsTUFBSyxTQUFTLE1BQU07QUFBRztBQUM1QixVQUFJLFVBQVU7QUFBVTtBQUV4QixZQUFNLE1BQU0sTUFBTSxHQUFHLFNBQVMsU0FBU0EsT0FBTSxPQUFPO0FBQ3BELGFBQU8sbUJBQW1CLGFBQWEsR0FBRyxDQUFDO0FBQUEsSUFDN0M7QUFBQSxFQUNGO0FBQ0Y7OztBQzdCZ1gsU0FBUyxvQkFBbUM7QUFFNVosT0FBT0MsU0FBUTtBQUVmLFNBQVMsNEJBQTRCO0FBU3RCLFNBQVIsU0FBMEI7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFVBQVU7QUFBQSxFQUNWO0FBQ0YsSUFBcUIsQ0FBQyxHQUFXO0FBQy9CLFFBQU0sU0FBUyxhQUFhLFNBQVMsT0FBTztBQUU1QyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFFTixNQUFNLFVBQVUsTUFBTSxJQUFJO0FBQ3hCLFVBQUksT0FBTyxFQUFFLEdBQUc7QUFDZCxjQUFNLEVBQUUsVUFBVSxJQUFJLE1BQU0sT0FBTyw0RkFBWTtBQUMvQyxjQUFNLFVBQVUsTUFBTUMsSUFBRyxTQUFTO0FBQUEsVUFDaEMsR0FBRyxRQUFRLFNBQVMsRUFBRTtBQUFBLFVBQ3RCO0FBQUEsUUFDRjtBQUVBLGNBQU0sZ0JBQWdCLE1BQU0sVUFBVSxTQUFTLGFBQWE7QUFBQSxVQUMxRCxVQUFVO0FBQUEsVUFDVixRQUFRLEVBQUUsZ0JBQWdCLEtBQUs7QUFBQSxRQUNqQyxDQUFDO0FBRUQsY0FBTSxNQUFNLE1BQU0scUJBQXFCLGVBQWUsSUFBSTtBQUFBLFVBQ3hELFFBQVE7QUFBQSxVQUNSLEdBQUc7QUFBQSxRQUNMLENBQUM7QUFFRCxlQUFPO0FBQUEsVUFDTCxNQUFNLElBQUk7QUFBQSxVQUNWLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBRmpEQSxJQUFNLG1DQUFtQztBQWV6QyxJQUFPLHlCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUE7QUFBQTtBQUFBLElBR1AsTUFBTTtBQUFBLElBQ04sU0FBYTtBQUFBLElBQ2Isd0JBQVU7QUFBQTtBQUFBO0FBQUEsSUFJVixlQUFlO0FBQUEsRUFDakI7QUFBQSxFQUNBLE1BQU0sS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxFQUN6QyxPQUFPO0FBQUEsSUFDTCxRQUFRLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsSUFDeEMsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsSUFBSSxLQUFLLFNBQVMsa0NBQVcscUJBQXFCO0FBQUEsTUFDcEQ7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQztBQUFBLElBQ3pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELE9BQU8sS0FBSyxRQUFRLGtDQUFXLFVBQVU7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgImZzIiwgImZzIl0KfQo=
