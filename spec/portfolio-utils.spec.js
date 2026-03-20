describe("PortfolioUtils", function () {
  var U = window.PortfolioUtils;

  describe("isValidEmail", function () {
    it("accepts a normal address", function () {
      expect(U.isValidEmail("tai@example.com")).toBe(true);
    });

    it("rejects invalid addresses", function () {
      expect(U.isValidEmail("not-an-email")).toBe(false);
      expect(U.isValidEmail("@nodomain.com")).toBe(false);
      expect(U.isValidEmail("")).toBe(false);
    });

    it("trims whitespace", function () {
      expect(U.isValidEmail("  user@mail.co  ")).toBe(true);
    });
  });

  describe("isNonEmpty", function () {
    it("returns false for empty or whitespace", function () {
      expect(U.isNonEmpty("")).toBe(false);
      expect(U.isNonEmpty("   ")).toBe(false);
    });

    it("returns true for real content", function () {
      expect(U.isNonEmpty("hello")).toBe(true);
    });
  });

  describe("hasMinLength", function () {
    it("respects minimum length after trim", function () {
      expect(U.hasMinLength("ab", 2)).toBe(true);
      expect(U.hasMinLength("a", 2)).toBe(false);
      expect(U.hasMinLength("  hi  ", 2)).toBe(true);
    });
  });

  describe("scrollProgressDegrees", function () {
    it("returns 0 when page fits in viewport", function () {
      expect(U.scrollProgressDegrees(0, 800, 900)).toBe(0);
    });

    it("returns 0 at top of scrollable page", function () {
      expect(U.scrollProgressDegrees(0, 2000, 800)).toBe(0);
    });

    it("returns 180 halfway", function () {
      var h = 2000;
      var vh = 800;
      var mid = (h - vh) / 2;
      expect(U.scrollProgressDegrees(mid, h, vh)).toBe(180);
    });

    it("returns 360 at bottom", function () {
      var h = 2000;
      var vh = 800;
      var max = h - vh;
      expect(U.scrollProgressDegrees(max, h, vh)).toBe(360);
    });
  });

  describe("isScrolledToBottom", function () {
    it("detects bottom", function () {
      expect(U.isScrolledToBottom(1200, 800, 2000)).toBe(true);
    });

    it("false when not at bottom", function () {
      expect(U.isScrolledToBottom(0, 800, 2000)).toBe(false);
    });
  });

  describe("serviceTitleRightPosition", function () {
    it("returns inset when collapsed", function () {
      expect(U.serviceTitleRightPosition(false, "100px", "4rem")).toBe("4rem");
    });

    it("returns calc when expanded", function () {
      expect(U.serviceTitleRightPosition(true, "120px", "4rem")).toBe(
        "calc(100% - 120px - 4rem)"
      );
    });
  });
});
