export const ExportSvg = () => {
  const divElement = document.querySelector('#blueprint')!;
  const svgComponent = divElement.innerHTML;
  const blob = new Blob([svgComponent], { type: 'image/svg+xml' });
  const downloadLink = document.createElement('a');
  downloadLink.download = 'blueprint.svg';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.click();
};

export const getSvgBlob = () => {
  const divElement = document.querySelector('#blueprint')!;
  const svgComponent = divElement.innerHTML;
  const encodedSVG = `data:image/svg+xml;base64,${btoa(svgComponent)}`;
  return encodedSVG;
};
