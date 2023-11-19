export const regexPatterns = {
  hasTouchScreen:
    /\b(BlackBerry|webOS|iPhone|IEMobile|Android|Windows Phone|iPad|iPod)\b/i,
};

/**
 * Returns if the device type is mobile or not (desktop)
 * @return {boolean} true/false      Returns if the device is mobile or not
 */
export const isMobile = (): boolean => {
  let hasTouchScreen = false;
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = (navigator as any).msMaxTouchPoints > 0;
  } else {
    const mQ = (window as any).matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true;
    } else {
      var UA = (navigator as any).userAgent;
      hasTouchScreen = regexPatterns.hasTouchScreen.test(UA);
    }
  }
  if (hasTouchScreen) {
    return true;
  }
  return false;
};
