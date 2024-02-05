/**
 * Calculates total sum of prices of new order
 * @param {Array} products cart products: Array of objects
 * @returns {number} Total price 
 */

export const totalPrice = (products) => {
    let sum = 0;
    products.forEach(product => sum += product.price);
    return sum;
}