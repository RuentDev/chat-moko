interface Details {
  browser: any;
  browserVersion: any;
  operatingSystem: any;
  osVersion: any;
  device: any;
}
export function getUserAgentDetails() {
  const userAgent = window.navigator.userAgent;
  const details: Details = {
    browser: undefined,
    browserVersion: undefined,
    operatingSystem: undefined,
    osVersion: undefined,
    device: undefined,
  };
  const browserMatch = userAgent.match(
    /(Chrome|Safari|Firefox|Edge|IE|Opera|Brave|Android)\/(\d+(\.\d+)?)/
  );
  if (browserMatch) {
    details.browser = browserMatch[1];
    details.browserVersion = parseFloat(browserMatch[2]);
  }
  const osMatch = userAgent.match(
    /(Windows NT|Mac OS X|Linux|Android)(?: ([\d._]+))?/
  );
  if (osMatch) {
    if (osMatch[0]) {
      let os = osMatch[0].replace(/ /g, ".");
      const screenWidth = window.screen.width;

      if (screenWidth < 600) {
        if (os === "Mac.OS.X") {
          os = "IOS";
        }

        if (os.toLowerCase() === "linux") {
          os = "Android";
        }
      }
      details.operatingSystem = os;
    }
  }
  const deviceMatch = userAgent.match(
    /(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/
  );
  if (deviceMatch) {
    details.device = deviceMatch[1].toLowerCase();
  }

  return details;
}
