/**
 * Calculates total players across all maps.
 * @param {Array} maps - Array of map objects with `globalCCU`.
 * @returns {number} - Total players.
 */
function calculateTotalPlayers(maps) {
    return maps.reduce((sum, map) => sum + map.globalCCU, 0);
}

module.exports = { calculateTotalPlayers };
