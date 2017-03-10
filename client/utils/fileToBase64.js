export default function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      resolve(fileReader.result);
    });

    fileReader.readAsDataURL(file);
  });
}
