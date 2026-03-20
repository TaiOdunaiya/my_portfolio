/**
 * Pure helpers used by script.js — easy to unit test without the full DOM.
 * Loaded before script.js in index.html.
 */
(function (global) {
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const PortfolioUtils = {
    isValidEmail: function (value) {
      return EMAIL_REGEX.test(String(value).trim());
    },

    isNonEmpty: function (value) {
      return String(value).trim() !== "";
    },

    hasMinLength: function (value, min) {
      return String(value).trim().length >= min;
    },

    /**
     * Progress ring rotation (degrees) from scroll position.
     */
    scrollProgressDegrees: function (
      scrolledPortion,
      pageHeight,
      pageViewportHeight
    ) {
      const denom = pageHeight - pageViewportHeight;
      if (denom <= 0) return 0;
      return (scrolledPortion / denom) * 360;
    },

    isScrolledToBottom: function (
      scrolledPortion,
      pageViewportHeight,
      pageHeight
    ) {
      return scrolledPortion + pageViewportHeight === pageHeight;
    },

    /**
     * Service section title `right` CSS when toggled open/closed.
     */
    serviceTitleRightPosition: function (expanded, widthCss, inset) {
      inset = inset || "4rem";
      return expanded
        ? "calc(100% - " + widthCss + " - " + inset + ")"
        : inset;
    },
  };

  global.PortfolioUtils = PortfolioUtils;
})(typeof window !== "undefined" ? window : globalThis);
