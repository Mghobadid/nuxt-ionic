import { existsSync, promises } from 'node:fs';
import { addComponent, useNuxt, addImportsSources, useLogger, findPath, defineNuxtModule, addTemplate, addPlugin } from '@nuxt/kit';
import { resolve as resolve$1, join } from 'pathe';
import { readPackageJSON } from 'pkg-types';
import { defineUnimportPreset } from 'unimport';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import * as _icons from 'ionicons/icons';
import { isWindows } from 'std-env';
import { createJiti } from 'jiti';

const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));

const IonicHooks = [
  "createAnimation",
  "createGesture",
  "getIonPageElement",
  "getPlatforms",
  "getTimeGivenProgression",
  "iosTransitionAnimation",
  "isPlatform",
  "mdTransitionAnimation",
  "menuController",
  "modalController",
  "popoverController",
  "alertController",
  "actionSheetController",
  "loadingController",
  "pickerController",
  "toastController",
  "onIonViewDidEnter",
  "onIonViewDidLeave",
  "onIonViewWillEnter",
  "onIonViewWillLeave",
  "openURL",
  "useBackButton",
  "useIonRouter",
  "useKeyboard"
];
const IonicBuiltInComponents = [
  "IonAccordion",
  "IonAccordionGroup",
  "IonActionSheet",
  "IonAlert",
  "IonApp",
  "IonAvatar",
  "IonBackButton",
  "IonBackdrop",
  "IonBadge",
  "IonBreadcrumb",
  "IonBreadcrumbs",
  "IonButton",
  "IonButtons",
  "IonCard",
  "IonCardContent",
  "IonCardHeader",
  "IonCardSubtitle",
  "IonCardTitle",
  "IonCheckbox",
  "IonChip",
  "IonCol",
  "IonContent",
  "IonDatetime",
  "IonDatetimeButton",
  "IonFab",
  "IonFabButton",
  "IonFabList",
  "IonFooter",
  "IonGrid",
  "IonHeader",
  "IonIcon",
  "IonImg",
  "IonInfiniteScroll",
  "IonInfiniteScrollContent",
  "IonInput",
  "IonInputOtp",
  "IonInputPasswordToggle",
  "IonItem",
  "IonItemDivider",
  "IonItemGroup",
  "IonItemOption",
  "IonItemOptions",
  "IonItemSliding",
  "IonLabel",
  "IonList",
  "IonListHeader",
  "IonLoading",
  "IonMenu",
  "IonMenuButton",
  "IonMenuToggle",
  "IonModal",
  "IonNav",
  "IonNavLink",
  "IonNote",
  "IonPage",
  "IonPicker",
  "IonPickerColumn",
  "IonPickerColumnOption",
  "IonPickerLegacy",
  "IonPopover",
  "IonProgressBar",
  "IonRadio",
  "IonRadioGroup",
  "IonRange",
  "IonRefresher",
  "IonRefresherContent",
  "IonReorder",
  "IonReorderGroup",
  "IonRippleEffect",
  "IonRouterOutlet",
  "IonRow",
  "IonSearchbar",
  "IonSegment",
  "IonSegmentButton",
  "IonSegmentContent",
  "IonSegmentView",
  "IonSelect",
  "IonSelectModal",
  "IonSelectOption",
  "IonSkeletonText",
  "IonSpinner",
  "IonSplitPane",
  "IonTab",
  "IonTabs",
  "IonTabBar",
  "IonTabButton",
  "IonText",
  "IonTextarea",
  "IonThumbnail",
  "IonTitle",
  "IonToast",
  "IonToggle",
  "IonToolbar"
];

const setupUtilityComponents = () => {
  addComponent({
    name: "IonAnimation",
    filePath: resolve(runtimeDir, "components", "IonAnimation.vue")
  });
};

const useCSSSetup = () => {
  const nuxt = useNuxt();
  const setupCore = () => {
    nuxt.options.css.unshift("@ionic/vue/css/core.css");
  };
  const setupBasic = () => {
    nuxt.options.css.unshift(
      "@ionic/vue/css/normalize.css",
      "@ionic/vue/css/structure.css",
      "@ionic/vue/css/typography.css"
    );
  };
  const setupUtilities = () => {
    nuxt.options.css.unshift(
      "@ionic/vue/css/padding.css",
      "@ionic/vue/css/float-elements.css",
      "@ionic/vue/css/text-alignment.css",
      "@ionic/vue/css/text-transformation.css",
      "@ionic/vue/css/flex-utils.css",
      "@ionic/vue/css/display.css"
    );
  };
  return { setupCore, setupBasic, setupUtilities };
};

const icons = _icons;
const iconsPreset = defineUnimportPreset({
  from: "ionicons/icons",
  imports: Object.keys(icons).map((name) => ({
    name,
    as: "ionicons" + name[0].toUpperCase() + name.slice(1)
  }))
});
const setupIcons = () => {
  const nuxt = useNuxt();
  nuxt.options.build.transpile.push(/ionicons/);
  addImportsSources(iconsPreset);
};

const setupMeta = () => {
  const nuxt = useNuxt();
  const metaDefaults = [
    { name: "color-scheme", content: "light dark" },
    { name: "format-detection", content: "telephone: no" },
    { name: "msapplication-tap-highlight", content: "no" }
  ];
  nuxt.options.app.head.meta = nuxt.options.app.head.meta || [];
  for (const meta of metaDefaults) {
    if (!nuxt.options.app.head.meta.some((i) => i.name === meta.name)) {
      nuxt.options.app.head.meta.unshift(meta);
    }
  }
  const viewport = nuxt.options.app.head.meta.find((i) => i.name === "viewport");
  if (viewport?.content === "width=device-width, initial-scale=1") {
    viewport.content = "viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no";
  }
};

const setupRouter = () => {
  const nuxt = useNuxt();
  const logger = useLogger();
  const pagesDirs = nuxt.options._layers.map(
    (layer) => resolve$1(layer.config?.srcDir || layer.cwd, layer.config?.dir?.pages || "pages")
  );
  if (nuxt.options.pages === false || nuxt.options.pages !== true && !pagesDirs.some((dir) => existsSync(dir))) {
    logger.info("Disabling Ionic Router integration as pages dir does not exist.");
    return;
  }
  const ROUTER_PLUGIN_RE = /nuxt(?:3|-nightly)?\/dist\/(?:app\/plugins|pages\/runtime)\/(?:plugins\/)?router/;
  const PAGE_USAGE_PLUGIN_RE = /nuxt(?:3|-nightly)?\/dist\/(?:app\/plugins|pages\/runtime)\/(?:plugins\/)?check-if-page-unused/;
  const ionicRouterPlugin = {
    src: resolve$1(runtimeDir, "plugins/router"),
    mode: "all"
  };
  nuxt.hook("modules:done", () => {
    nuxt.hook("app:resolve", (app) => {
      app.plugins = app.plugins.filter((p) => !PAGE_USAGE_PLUGIN_RE.test(p.src));
      const routerPlugin = app.plugins.findIndex((p) => ROUTER_PLUGIN_RE.test(p.src));
      if (routerPlugin !== -1) {
        app.plugins.splice(routerPlugin, 1, ionicRouterPlugin);
      } else {
        app.plugins.unshift(ionicRouterPlugin);
      }
    });
  });
  nuxt.hook("app:resolve", (app) => {
    if (!app.mainComponent || app.mainComponent.includes("@nuxt/ui-templates") || app.mainComponent.match(/nuxt3?\/dist/)) {
      app.mainComponent = join(runtimeDir, "app.vue");
    }
  });
};

const setupCapacitor = () => {
  const nuxt = useNuxt();
  let jiti;
  const findCapacitorConfig = async () => {
    const path = await findPath(
      "capacitor.config",
      {
        extensions: ["ts", "json"],
        virtual: false
      },
      "file"
    );
    return path;
  };
  const parseCapacitorConfig = async (path) => {
    if (!path) {
      return {
        androidPath: null,
        iosPath: null
      };
    }
    jiti ||= createJiti(import.meta.url);
    const capacitorConfig = await jiti.import(isWindows ? pathToFileURL(path).href : path);
    return {
      androidPath: capacitorConfig.android?.path || null,
      iosPath: capacitorConfig.ios?.path || null
    };
  };
  const excludeNativeFolders = (androidPath, iosPath) => {
    nuxt.hook("prepare:types", (ctx) => {
      const paths = [
        join("..", androidPath ?? "android"),
        join("..", iosPath ?? "ios")
      ];
      for (const key of ["tsConfig", "nodeTsConfig", "sharedTsConfig"]) {
        if (ctx[key]) {
          ctx[key].exclude ||= [];
          ctx[key].exclude.push(...paths);
        }
      }
    });
    nuxt.options.ignore.push(
      join(androidPath ?? "android"),
      join(iosPath ?? "ios")
    );
  };
  return {
    excludeNativeFolders,
    findCapacitorConfig,
    parseCapacitorConfig
  };
};

const module$1 = defineNuxtModule({
  meta: {
    name: "@nuxtjs/ionic",
    configKey: "ionic",
    compatibility: {
      nuxt: ">=3.0.0-rc.12"
    }
  },
  defaults: {
    integrations: {
      meta: true,
      router: true,
      icons: true
    },
    css: {
      core: true,
      basic: true,
      utilities: false
    },
    config: {}
  },
  async setup(options, nuxt) {
    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.build.transpile.push(/@ionic/, /@stencil/);
    addTemplate({
      filename: "ionic/vue-config.mjs",
      getContents: () => `export default ${JSON.stringify(options.config)}`
    });
    const ionicConfigPath = join(nuxt.options.rootDir, "ionic.config.json");
    if (!existsSync(ionicConfigPath)) {
      await promises.writeFile(
        ionicConfigPath,
        JSON.stringify(
          {
            name: await readPackageJSON(nuxt.options.rootDir).then(
              ({ name }) => name || "nuxt-ionic-project"
            ),
            integrations: {},
            type: "vue"
          },
          null,
          2
        )
      );
    }
    addPlugin(resolve$1(runtimeDir, "plugins/ionic"));
    setupUtilityComponents();
    nuxt.options.typescript.hoist ||= [];
    nuxt.options.typescript.hoist.push("@ionic/vue");
    const { excludeNativeFolders, findCapacitorConfig, parseCapacitorConfig } = setupCapacitor();
    const capacitorConfigPath = await findCapacitorConfig();
    if (capacitorConfigPath) {
      const { androidPath, iosPath } = await parseCapacitorConfig(capacitorConfigPath);
      excludeNativeFolders(androidPath, iosPath);
    }
    IonicBuiltInComponents.map(
      (name) => addComponent({
        name,
        export: name,
        filePath: "@ionic/vue"
      })
    );
    addImportsSources([
      defineUnimportPreset({
        from: "@ionic/vue",
        imports: [...IonicHooks]
      }),
      defineUnimportPreset({
        from: resolve$1(runtimeDir, "composables/head"),
        imports: ["useHead"],
        priority: 2
      })
    ]);
    if (nuxt.options.nitro.static || nuxt.options._generate) {
      nuxt.hook("nitro:config", async (config) => {
        config.prerender ||= {};
        config.prerender.routes ||= [];
        config.prerender.routes.push("/200.html");
        config.output ||= {};
        if (!config.output.publicDir) {
          const distDir = resolve$1(nuxt.options.rootDir, "dist");
          const stats = await promises.lstat(distDir).catch(() => null);
          if (!stats || !stats.isSymbolicLink()) {
            config.output.publicDir = distDir;
            if (!existsSync(distDir)) {
              await promises.mkdir(distDir, { recursive: true });
            }
          }
        }
      });
      let publicFolder;
      nuxt.hook("nitro:init", (nitro) => {
        publicFolder = nitro.options.output.publicDir;
      });
      nuxt.hook("close", async () => {
        const indexFile = join(publicFolder, "index.html");
        const fallbackFile = join(publicFolder, "200.html");
        if (!existsSync(indexFile) && existsSync(fallbackFile)) {
          await promises.copyFile(fallbackFile, indexFile);
        }
      });
    }
    const { setupBasic, setupCore, setupUtilities } = useCSSSetup();
    if (options.css?.core) {
      await setupCore();
    }
    if (options.css?.basic) {
      await setupBasic();
    }
    if (options.css?.utilities) {
      await setupUtilities();
    }
    if (options.integrations?.icons) {
      await setupIcons();
    }
    if (options.integrations?.meta) {
      await setupMeta();
    }
    if (options.integrations?.pwa) {
      console.log("PWA integration is has been removed from @nuxtjs/ionic. It is recommended to install and configure @vite-pwa/nuxt instead following the instructions in https://vite-pwa-org.netlify.app/frameworks/nuxt.html.");
    }
    if (options.integrations?.router) {
      await setupRouter();
    }
  }
});

export { module$1 as default };
