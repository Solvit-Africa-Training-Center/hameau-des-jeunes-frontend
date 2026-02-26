/**
 * Parses an RTK Query / fetch error into a clean, user-friendly message.
 * Prevents exposing raw Django tracebacks or settings dumps to end users.
 */
export function parseApiError(error: any, fallback = "An unexpected error occurred. Please try again."): string {
  if (!error) return fallback;

  const data = error?.data;

  if (!data) return fallback;

  // Django REST Framework field-level errors — e.g. { "child": ["This field is required."] }
  if (typeof data === "object" && !Array.isArray(data)) {
    // Grab the first recognizable field error
    const knownFields = ["detail", "message", "non_field_errors", "error"];
    for (const key of knownFields) {
      if (data[key]) {
        const val = data[key];
        if (Array.isArray(val)) return val[0];
        if (typeof val === "string" && val.length < 300) return val;
      }
    }

    // Collect field validation errors
    const fieldErrors: string[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        fieldErrors.push(`${key}: ${(value as string[]).join(", ")}`);
      } else if (typeof value === "string" && value.length < 200) {
        fieldErrors.push(`${key}: ${value}`);
      }
    }
    if (fieldErrors.length > 0) {
      return fieldErrors.slice(0, 3).join(" | ");
    }
  }

  // Short string error
  if (typeof data === "string" && data.length < 300) {
    return data;
  }

  return fallback;
}
