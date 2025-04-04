export function convertToSeconds(timeString: string): number {
  if (!timeString) return 0;

  const parts = timeString.split(":");
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  }

  // Handle edge cases (single number or invalid format)
  const totalSeconds = parseInt(timeString, 10);
  return isNaN(totalSeconds) ? 0 : totalSeconds;
}
