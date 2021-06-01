export const scoreIndicatorColors = () => {
  return [
    "#f11d28",
    "#fd3a2d",
    "#fe612c",
    "#ff872c",
    "#ffa12c",
    "#ffa83b",
    "#53b83a",
    "#3da940",
  ];
};

export const rechartColors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#8884d8",
  "#82ca9d",
];

export const radialBarChartColors = [
  "#a95dfc",
  "#4489fc",
  // "#8dd1e1",
  // "#82ca9d",
  // "#a4de6c",
  // "#d0ed57",
  // "#ffc658",
];

export const bilingHomeBreakpoints = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1375 },
    slidesToSlide: 4,
    items: 4,
  },
  mediumDesktop: {
    breakpoint: { max: 1375, min: 1130 },
    slidesToSlide: 3,
    items: 3,
  },
  smallDesktop: {
    breakpoint: { max: 1130, min: 925 },
    slidesToSlide: 2,
    items: 2,
  },
  tablet: {
    breakpoint: { max: 925, min: 560 },
    slidesToSlide: 2,
    items: 2,
  },
  mobile: {
    breakpoint: { max: 560, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const clientCardsBreakpoints = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1375 },
    slidesToSlide: 6,
    items: 6,
  },
  mediumDesktop: {
    breakpoint: { max: 1375, min: 1130 },
    slidesToSlide: 5,
    items: 5,
  },
  smallDesktop: {
    breakpoint: { max: 1130, min: 925 },
    slidesToSlide: 4,
    items: 4,
  },
  tablet: {
    breakpoint: { max: 925, min: 560 },
    slidesToSlide: 2,
    items: 2,
  },
  mobile: {
    breakpoint: { max: 560, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const reminderCardsBreakpoints = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1400, min: 1024 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 1024, min: 0 },
    items: 1,
  },
};

export const carouselBreakpoints = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    slidesToSlide: 5,
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    slidesToSlide: 3,
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 643 },
    slidesToSlide: 2,
    items: 2,
  },
  mobile: {
    breakpoint: { max: 643, min: 0 },
    slidesToSlide: 1,
    items: 1,
  },
};

export const smallCarouselBreakpoints = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
