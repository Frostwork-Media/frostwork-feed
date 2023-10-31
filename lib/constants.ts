if (!process.env.JSON_BIN_SECRET) throw new Error("Missing JSON_BIN_SECRET");

export const jbKey = process.env.JSON_BIN_SECRET;

export const binId = "65400a5212a5d3765992a70e";
