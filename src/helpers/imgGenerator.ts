const downloadImg = (blob: Blob) => {
  const link = document.createElement('a')
  link.download = 'memeable.png'
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}




export const b64toBlob = (base64: string, type = 'application/octet-stream') =>
  fetch(base64)
    .then(res => res.blob())
    .then(downloadImg)