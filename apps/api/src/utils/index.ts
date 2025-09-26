export function getPublicUrl(key: string) {
  return `${process.env.S3_ENDPOINT.replace(/\/+$/, "")}/${process.env.S3_BUCKET}/${key}`;
}

export function parseKey(url: string) {
  return url.split(`${process.env.S3_BUCKET}/`)[1];
}
