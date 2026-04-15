/**
 * Parses a duration string (e.g., "32h 45m", "10 hours 30 mins")
 * and returns the duration rounded to the nearest hour.
 * 
 * @param lengthStr The duration string to parse
 * @returns The number of hours rounded to the nearest integer
 */
export const getRoundedHours = (lengthStr: string): number => {
    if (!lengthStr) return 0;

    let totalMinutes = 0;

    // Normalizing the string: lowercase
    const normalized = lengthStr.toLowerCase();

    // Extract Hours
    // Matches "32h", "32 h", "32hours", "32 hours"
    const hoursMatch = normalized.match(/(\d+)\s*h/);
    if (hoursMatch) {
        totalMinutes += parseInt(hoursMatch[1], 10) * 60;
    }

    // Extract Minutes
    // Matches "45m", "45 m", "45mins", "45 mins"
    const minutesMatch = normalized.match(/(\d+)\s*m/);
    if (minutesMatch) {
        totalMinutes += parseInt(minutesMatch[1], 10);
    }

    // If no structure matches but there are digits (fallback)
    if (!hoursMatch && !minutesMatch) {
        const fallbackMatch = normalized.match(/(\d+)/);
        if (fallbackMatch) {
            // Assume hours if just a number? Or ignore?
            // For safety, let's assume if it looks like just a number it might be hours in this context
            return parseInt(fallbackMatch[1], 10);
        }
        return 0;
    }

    return Math.round(totalMinutes / 60);
};
