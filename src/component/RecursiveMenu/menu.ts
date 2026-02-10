const menu = [
  {
    label: "Projects",
    children: [
      {
        label: "QR Code Generator",
        path: "/QRCodeGenerator",
      },
      {
        label: "Github Profile Finder",
        path: "/GithubProfileFinder",
      },
      {
        label: "Tic Tac Toe",
        path: "/TicTacToe",
      },
      {
        label: "Accordion",
        children: [
          {
            label: "Math Trivia",
            path: "/MathTrivia",
          },
          {
            label: "Accordion Sample",
            path: "/AccordionSample",
          },
        ],
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
        label: "Load More Feature",
        path: "/LoadMoreFeature",
      },
      {
        label: "Star Rating System",
        path: "/StarRatingSystem",
      },
      {
        label: "Scroll Indicator",
        path: "/ScrollIndicator",
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
