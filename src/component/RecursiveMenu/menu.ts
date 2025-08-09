const menu = [
  {
    label: "Projects",
    children: [
      {
        label: "QR Code Generator",
        path: "/QRCodeGenerator",
      },
      {
        label: "Random Color Generator",
        path: "/RandomColorGenerator",
      },
      {
        label: "Image Slider",
        path: "/ImageSlider",
      },
      {
        label: "Star Rating System",
        path: "/StarRatingSystem",
      },
      {
        label: "Load More Feature",
        path: "/LoadMoreFeature",
      },
      {
        label: "Accordion",
        children: [
          {
            label: "Accordion Sample",
            path: "/AccordionSample",
          },
          {
            label: "Math Trivia",
            path: "/MathTrivia",
          },
        ],
      },
    ],
  },
  {
    label: "public",
    children: [
      {
        label: "vite.svg",
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
          },
        ],
      },
      {
        label: "components",
        children: [
          {
            label: "RecursiveMenu.tsx",
          },
        ],
      },
      {
        label: "data",
        children: [
          {
            label: "menu.ts",
            path: "/Yolo",
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
];

export default menu;
