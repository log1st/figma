import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import cors from "cors";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { env } from "./env";


const realRoot = path.resolve(import.meta.env.FIGMA_PWD, import.meta.env.FIGMA_ROOT);
const iconsRoot = path.resolve(realRoot, import.meta.env.ICONS_ROOT || 'assets/icons');

console.log('figma root:', realRoot)
console.log('icons root:', iconsRoot)

const t = initTRPC.create({
  transformer: superjson,
  isDev: true,
  isServer: true,
  allowOutsideOfServer: true,
});

export const { router, procedure, middleware } = t;

const appRouter = router({
  renderThemes: procedure
    .input(
      z.object({
        themes: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
            await fs.writeFile(
                path.resolve(
                    realRoot,
                    "assets/themes.scss",
                ),
                input.themes,
            );
    }),
  renderTypography: procedure
    .input(
      z.object({
        typography: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await fs.writeFile(
        path.resolve(
          realRoot,
          "assets/typography.scss",
        ),
        input.typography,
      );
    }),
  renderIcon: procedure
    .input(
      z.object({
        icon: z.array(z.tuple([z.string(), z.string()])),
      }),
    )
    .mutation(async ({ input }) => {
        console.log(path.resolve(
            iconsRoot
        ))
      await Promise.all(
        input.icon.map(([name, value]) =>
          fs.writeFile(
            path.resolve(
                iconsRoot,
              `${name}.svg`,
            ),
            value,
          ),
        ),
      );
        console.log(import.meta.env.FIGMA_PWD);
      exec(`bun run gen:icons`, {
        cwd: import.meta.env.FIGMA_PWD,
      });
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

server.listen(env.PORT);
