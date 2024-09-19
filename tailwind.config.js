/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#485b50",
          "light": "#C1CEC5",
          "medium": "#9aaea1",
          "dark": "#1E2D24",
          "status": "#99C1AA",
        },
        secondary: {
          DEFAULT: "#D4AF37",
          "dark": "#aa7a24",
          "gradeintDark": "#6E5B1D",
        },
        newWhite: "#F6F7F7",
        newBlack: "#232626",
        redCustom: "#BB0808",
      },
      fontFamily: {
        mBlack: ["Montserrat-Black", "sans-serif"],
        mBold: ["Montserrat-Bold", "sans-serif"],
        mExtraBold: ["Montserrat-ExtraBold", "sans-serif"],
        mExtraLight: ["Montserrat-ExtraLight", "sans-serif"],
        mLight: ["Montserrat-Light", "sans-serif"],
        mMedium: ["Montserrat-Medium", "sans-serif"],
        mRegular: ["Montserrat-Regular", "sans-serif"],
        mSemiBold: ["Montserrat-SemiBold", "sans-serif"],
        mThin: ["Montserrat-Thin", "sans-serif"],

        whisper: ["Whisper", "sans-serif"],
      },
    },
  },
  plugins: [],
}

