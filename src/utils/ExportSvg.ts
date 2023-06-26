export const ExportSvg = () => {
  const divElement = document.querySelector('#blueprint')!;
  const svgComponent = divElement.innerHTML;
  const blob = new Blob([svgComponent], { type: 'image/svg+xml' });
  const downloadLink = document.createElement('a');
  downloadLink.download = 'blueprint.svg';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.click();
};
