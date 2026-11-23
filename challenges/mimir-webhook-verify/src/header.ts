export interface ParsedHeader {
  /** Unix seconds; NaN when missing or malformed. */
  timestamp: number;
  signatures: string[];
}

export function parseHeader(header: string): ParsedHeader {
  let timestamp = Number.NaN;
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const [key, value] = part.trim().split("=", 2);
    if (key === "t" && value !== undefined && /^\d+$/.test(value)) timestamp = Number(value);
    if (key === "v1" && value) signatures.push(value);
  }
  return { timestamp, signatures };
}
