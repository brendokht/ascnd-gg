export function getPublicUrl(key: string) {
  return `${process.env.S3_ENDPOINT.replace(/\/+$/, "")}/${process.env.S3_BUCKET}/${key}`;
}
