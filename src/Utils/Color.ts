export const getColor = (id: number) => {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF5733", "#5733FF", "#FF33FF", "#33FF33",
        "#FF3333", "#33A1FF", "#A1FF33", "#FF5733", "#33FF57",
        "#3357FF", "#FF33A1", "#A133FF", "#33FFA1", "#FF5733"
    ];
    return colors[id % colors.length];
}