import React, { useState } from "react";
import styles from "./ui/mainPage.module.css";
function MainPage() {
  const [hasEdits, setHasEdits] = useState(null);

  const checkForEdits = async (file) => {
    try {
      const buffer = await readFile(file);
      const hasPhotoshopMarker = checkForPhotoshopMarker(buffer);
      const hasPixelChanges = await analyzePixelChanges(buffer);

      const isEdited = hasPhotoshopMarker || hasPixelChanges;
      return isEdited;
    } catch (error) {
      console.error("Error checking photo:", error);
      return null;
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const checkForPhotoshopMarker = (buffer) => {
    const view = new DataView(buffer);
    const photoshopMarker = "8BIM";
    for (let i = 0; i < buffer.byteLength - 4; i++) {
      const marker =
        String.fromCharCode(view.getUint8(i)) +
        String.fromCharCode(view.getUint8(i + 1)) +
        String.fromCharCode(view.getUint8(i + 2)) +
        String.fromCharCode(view.getUint8(i + 3));
      if (marker === photoshopMarker) {
        return true; 
      }
    }
    return false; 
  };

  const analyzePixelChanges = async (buffer) => {

    const view = new Uint8Array(buffer);
    const originalPixelValue = view[0]; 
    view[0] = 255;
    const modifiedPixelValue = view[0];
    return originalPixelValue !== modifiedPixelValue;
  };
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const hasEdits = await checkForEdits(file);
    setHasEdits(hasEdits);

    const file1 = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    if (file1) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.container}>
        <div className={styles.title}>PhotoAuthenticityChecker</div>
        <div className={styles.Showwindow}>
          <div className={styles.image_container}>
            {imageSrc ? (
              <img className={styles.image} src={imageSrc} alt="Selected" />
            ) : (
              <div className={styles.text}>Ваше фото</div>
            )}
          </div>
          <label for="file-upload" className={styles.file_upload_button}>
            Choose File
          </label>
          <input
            id="file-upload"
            className={styles.input_main}
            type="file"
            onChange={handleFileInputChange}
            accept="image/*"
          />
          {hasEdits === null ? (
            <p>Выберите фото для проверки</p>
          ) : hasEdits ? (
            <p>Ваше фото содержит элементы фотошопа</p>
          ) : (
            <p>Ваше фото не содержит элементы фотошопа</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
