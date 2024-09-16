const imageTobase64 = async (image: File): Promise<string | ArrayBuffer | null> => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    return data;
};

export default imageTobase64;