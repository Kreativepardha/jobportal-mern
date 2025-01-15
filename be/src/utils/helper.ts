





export const generateFilePath = (file: Express.Multer.File | undefined): string | null => {
    return file ? `/uploads/${file.filename}` : null
}