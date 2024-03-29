import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ModalGaleria = ({ openGallery, setOpenGallery, galleryImages, setGalleryImages }) => {

    // ====== Cerrar modal =====
    const closeModal = () => {
        setOpenGallery(false)
        setGalleryImages([])
    }

    return (
      <>
        <Lightbox
          open={openGallery}
          close={() =>  closeModal()}
          slides={galleryImages}
        />
      </>
    );
}

export default ModalGaleria