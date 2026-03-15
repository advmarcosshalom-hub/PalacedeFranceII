// csvValidator.ts

/**
 * Validates if the input string is a well-formed CSV string.
 * @param {string} csvInput - The CSV string that needs to be validated.
 * @returns {boolean} - Returns true if the CSV string is valid, otherwise false.
 */
function validateCSV(csvInput) {
    const rows = csvInput.split('\n');
    // Check for each row
    for (const row of rows) {
        const columns = row.split(',');
        // Check if columns are empty
        if (columns.length === 0 || columns.some(column => column.trim() === '')) {
            return false;
        }
    }
    return true;
}

// Export the validation function
module.exports = validateCSV;