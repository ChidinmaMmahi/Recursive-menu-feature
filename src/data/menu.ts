const menu = [
  {
    label: "public",
    children: [
      {
        label: "vite.svg",
        path: "/public/vite.svg",
      },
    ],
  },
  {
    label: "src",
    children: [
      {
        label: "assets",
        children: [
          {
            label: "react.svg",
            path: "/src/assets/react.svg",
          },
        ],
      },
      {
        label: "components",
        children: [
          {
            label: "RecursiveMenu.tsx",
            path: "/src/components/RecursiveMenu.tsx",
          },
        ],
      },
      {
        label: "data",
        children: [
          {
            label: "menu.ts",
            path: "/src/components/Yolo.tsx",
          },
        ],
      },
      {
        label: "App.css",
      },
      {
        label: "App.tsx",
      },
      {
        label: "index.css",
      },

      {
        label: "main.tsx",
      },
      {
        label: "vite-env.d.ts",
      },
    ],
  },
  {
    label: "index.html",
  },
  {
    label: "vite.config.ts",
  },
  {
    label: "QrCodeGenerator",
    path: "/src/components/QrCodeGenerator/QrCodeGenerator.tsx",
  },
];

export default menu;
