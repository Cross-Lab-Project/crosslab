import { spawn } from "child_process";
import CDP from "chrome-remote-interface";
import { Option, program } from "commander";

const entrypoint = __dirname + "/../http-dist/index.html";

async function main() {
  interface Options {
    baseUrl: string;
    authToken: string;
    deviceUrl: string;
  }

  program
    .addOption(
      new Option("--url <url>", "URL of the CrossLab instance").env(
        "CROSSLAB_URL"
      )
    )
    .addOption(
      new Option("--auth-token <token>", "Token to use for authentication").env(
        "CROSSLAB_TOKEN"
      )
    )
    .addOption(
      new Option("--device-url <device-url>", "Device url").env(
        "CROSSLAB_DEVICE_URL"
      )
    )
    .addOption(new Option("--browser-inspect <port>", "Chrome Debug Port"));

  program.parse();

  const opts = program.opts();
  const options: Options = {
    baseUrl: opts.url,
    authToken: opts.authToken,
    deviceUrl: opts.deviceUrl,
  };

  const chromePort =
    opts.browserInspect ?? Math.floor(Math.random() * 10000) + 10000;
  const debugging = opts.browserInspect !== undefined;

  const chromium = spawn("chromium", [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--remote-debugging-port=" + chromePort,
    entrypoint,
  ]);
  await new Promise<void>((resolve) => {
    chromium.stderr.on("data", (data: string) => {
      console.log(data.toString());
      if (data.includes("DevTools listening on ws://")) {
        resolve();
      }
    });
  });
  console.log("Chromium is ready");

  const protocol = await CDP({ port: chromePort });

  const { Debugger, Runtime, Log } = protocol;
  await Runtime.enable();
  await Log.enable();
  await Debugger.enable();

  Log.entryAdded((result) => {
    console.log(result.entry.text);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const previewTransform = (preview: any) => {
    if ("value" in preview) {
      return preview.value;
    } else if (preview.type === "object") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ret: any = {};
      for (const prop of preview.properties) {
        ret[prop.name] = previewTransform(prop);
      }
      return ret;
    } else {
      return undefined;
    }
  };

  Runtime.consoleAPICalled((result) => {
    console.log(
      ...result.args.map((arg) => arg.value ?? previewTransform(arg.preview))
    );
  });

  debugging && (await Debugger.pause());
  const expression = "window.app(" + JSON.stringify(options) + ")";
  const appPromise = await (
    await Runtime.evaluate({ expression, silent: false })
  ).result;
  if (appPromise.objectId === undefined) {
    throw new Error("app() did not return a promise");
  }
  //debugging && console.log(await Debugger.paused());
  //debugging && await Debugger.stepInto();
  console.log(
    await Runtime.awaitPromise({ promiseObjectId: appPromise.objectId })
  );

  let stdin = "";
  process.stdin.on("data", (data) => {
    stdin += data.toString();
    const lines = stdin.split("\n");
    stdin = lines.pop() ?? "";
    for (const line of lines) {
      // eslint-disable-next-line prefer-const
      let [event, argument] = line.split(" ");
      event = event.slice(1, -1);
      const eventExpression = 'window.event("' + event + '",' + argument + ")";
      Runtime.evaluate({ expression: eventExpression, silent: false });
    }
  });

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      resolve();
    });
  });
  console.log("[closed]");
  await protocol.close();
  chromium.kill("SIGKILL");
  process.exit();
}

main();
