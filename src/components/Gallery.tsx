import { useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import ArrowLeft from '../assets/common/Arrow-Left.webp';
import ArrowRight from '../assets/common/Arrow-Right.webp';

const Gallery = () => {
  const { activatedMenu, setActivatedMenu, perspectiveIndex } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);

  // Define the media files from the perspective folder
  const perspectiveFiles = [
    '250919_ROAM_Bandar Rimbayu.mp4',
    'KV2446_05_Streetview_HR.jpg',
    'KV2446_AerialView.jpg',
    'KV2446_IJM_ROAM_Centerpiece_HR.jpg',
    'KV2446_IJM_ROAM_Centerpiece_View_2_HR.jpg',
    'KV2446_IJM_ROAM_CornerLot_HR.jpg',
    'KV2446_NearHighway_HR.jpg',
    'KV2446_05_Facade_HR.jpg',
    'KV2446_Corridor_HR.jpg',
    'KV2446_Section_B_HR.jpg'
  ];

  useEffect(() => {
    setMediaFiles(perspectiveFiles);
  }, []);

  // Update currentIndex when perspectiveIndex changes
  useEffect(() => {
    if (perspectiveIndex !== null) {
      const index = parseInt(perspectiveIndex);
      if (!isNaN(index) && index >= 0 && index < mediaFiles.length) {
        setCurrentIndex(index);
        setActivatedMenu('gallery');
      }
    }
  }, [perspectiveIndex, mediaFiles.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaFiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaFiles.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const isVideo = (filename: string) => {
    return filename.toLowerCase().endsWith('.mp4');
  };

  const handleClose = () => {
    setActivatedMenu('');
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activatedMenu !== 'gallery') return;

      switch (event.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          handleClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activatedMenu]);

  if (activatedMenu !== 'gallery' || mediaFiles.length === 0) return null;

  return (
    <div className="gallery" onClick={handleClose}>
      <div className="gallery__container" onClick={(e) => e.stopPropagation()}>
        {/* Left Arrow */}
        <button className="gallery__arrow gallery__arrow--left" onClick={goToPrevious}>
          <img src={ArrowLeft} alt="Previous" />
        </button>

        {/* Content Area */}
        <div className="gallery__content">
          {isVideo(mediaFiles[currentIndex]) ? (
            <video
              src={`./perspective/${mediaFiles[currentIndex]}`}
              controls
              className="gallery__video"
              key={currentIndex}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={`./perspective/${mediaFiles[currentIndex]}`}
              alt={`Gallery item ${currentIndex + 1}`}
              className="gallery__image"
            />
          )}
        </div>

        {/* Right Arrow */}
        <button className="gallery__arrow gallery__arrow--right" onClick={goToNext}>
          <img src={ArrowRight} alt="Next" />
        </button>

        {/* Close Button */}
        <button className="gallery__close" onClick={handleClose}>
          ×
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="gallery__dots">
        {mediaFiles.map((_, index) => (
          <button
            key={index}
            className={`gallery__dot ${index === currentIndex ? 'gallery__dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;