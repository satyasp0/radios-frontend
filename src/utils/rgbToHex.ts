export const getRGBValues = (color: RGBAColor = { r: 241, g: 245, b: 249, a: 0.2 }) => {
    const { r, g, b, a } = color;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};
