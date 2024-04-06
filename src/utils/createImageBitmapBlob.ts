export const createImageBitmapBlob = (imageBitmap: ImageBitmap, width: number, height: number) => {
    const canvasNormal = document.createElement('canvas')
    const ctxNormal = canvasNormal.getContext('2d')
    canvasNormal.width = width
    canvasNormal.height = height
    ctxNormal?.drawImage(imageBitmap, 0, 0, canvasNormal.width, canvasNormal.height)
    return canvasNormal.toDataURL()
}