import React, { useState, useRef, useEffect } from 'react';

interface BodyModelProps {
  onBodyPartSelect: (bodyPart: string) => void;
}

const BodyModel3D: React.FC<BodyModelProps> = ({ onBodyPartSelect }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse/touch movement for rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPosition.x;
    const deltaY = e.clientY - startPosition.y;

    setRotateY(rotateY + deltaX * 0.5); // For horizontal rotation
    setRotateX(rotateX - deltaY * 0.5); // For vertical rotation

    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - startPosition.x;
    const deltaY = e.touches[0].clientY - startPosition.y;

    setRotateY(rotateY + deltaX * 0.5);
    setRotateX(rotateX - deltaY * 0.5);

    setStartPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleBodyPartClick = (bodyPart: string) => {
    onBodyPartSelect(bodyPart);
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startPosition, rotateX, rotateY]);

  // Prevent dragging from causing page scroll on touch devices
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isDragging]);

  const resetRotation = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
      {/* Instructions */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
        <div className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
          Drag to rotate the body model
        </div>
        <button
          onClick={resetRotation}
          className="text-xs bg-white/80 px-2 py-1 rounded text-blue-600 hover:text-blue-800"
        >
          Reset View
        </button>
      </div>

      {/* 3D Scene container */}
      <div
        ref={containerRef}
        className="w-full h-full perspective-1000 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* 3D body model */}
        <div
          className="w-full h-full transform-style-3d relative transition-transform duration-100"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          {/* Front side */}
          <div className="absolute inset-0 backface-hidden transform-style-3d flex justify-center items-center">
            <div className="relative h-full max-h-80">
              {/* Human body outline - front view */}
              <svg
                width="240"
                height="320"
                viewBox="0 0 240 320"
                className="human-body-outline"
              >
                {/* Head */}
                <circle
                  cx="120" cy="40" r="30"
                  className={`body-part ${hoveredPart === 'head' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('head')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('head')}
                  data-part="head"
                />

                {/* Neck */}
                <rect
                  x="110" y="70" width="20" height="20"
                  className={`body-part ${hoveredPart === 'neck' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('neck')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('neck')}
                  data-part="neck"
                />

                {/* Torso */}
                <rect
                  x="90" y="90" width="60" height="80"
                  className={`body-part ${hoveredPart === 'chest' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('chest')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('chest')}
                  data-part="chest"
                />

                {/* Upper abdomen */}
                <rect
                  x="90" y="170" width="60" height="30"
                  className={`body-part ${hoveredPart === 'upperAbdomen' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('upperAbdomen')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('upperAbdomen')}
                  data-part="upperAbdomen"
                />

                {/* Lower abdomen */}
                <rect
                  x="90" y="200" width="60" height="30"
                  className={`body-part ${hoveredPart === 'lowerAbdomen' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('lowerAbdomen')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('lowerAbdomen')}
                  data-part="lowerAbdomen"
                />

                {/* Left arm */}
                <rect
                  x="50" y="90" width="40" height="100"
                  className={`body-part ${hoveredPart === 'leftArm' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('leftArm')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('leftArm')}
                  data-part="leftArm"
                />

                {/* Right arm */}
                <rect
                  x="150" y="90" width="40" height="100"
                  className={`body-part ${hoveredPart === 'rightArm' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('rightArm')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('rightArm')}
                  data-part="rightArm"
                />

                {/* Left leg */}
                <rect
                  x="90" y="230" width="30" height="90"
                  className={`body-part ${hoveredPart === 'leftLeg' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('leftLeg')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('leftLeg')}
                  data-part="leftLeg"
                />

                {/* Right leg */}
                <rect
                  x="120" y="230" width="30" height="90"
                  className={`body-part ${hoveredPart === 'rightLeg' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('rightLeg')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('rightLeg')}
                  data-part="rightLeg"
                />

                {/* Front label */}
                <text x="120" y="20" textAnchor="middle" className="text-xs fill-gray-500">Front View</text>
              </svg>
            </div>
          </div>

          {/* Back side */}
          <div
            className="absolute inset-0 backface-hidden transform-style-3d flex justify-center items-center"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="relative h-full max-h-80">
              {/* Human body outline - back view */}
              <svg
                width="240"
                height="320"
                viewBox="0 0 240 320"
                className="human-body-outline"
              >
                {/* Head */}
                <circle
                  cx="120" cy="40" r="30"
                  className={`body-part ${hoveredPart === 'head_back' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('head_back')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('head')}
                  data-part="head_back"
                />

                {/* Neck */}
                <rect
                  x="110" y="70" width="20" height="20"
                  className={`body-part ${hoveredPart === 'neck_back' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('neck_back')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('neck')}
                  data-part="neck_back"
                />

                {/* Upper back */}
                <rect
                  x="90" y="90" width="60" height="55"
                  className={`body-part ${hoveredPart === 'upperBack' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('upperBack')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('upperBack')}
                  data-part="upperBack"
                />

                {/* Lower back */}
                <rect
                  x="90" y="145" width="60" height="55"
                  className={`body-part ${hoveredPart === 'lowerBack' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('lowerBack')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('lowerBack')}
                  data-part="lowerBack"
                />

                {/* Hips */}
                <rect
                  x="90" y="200" width="60" height="30"
                  className={`body-part ${hoveredPart === 'hips' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('hips')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('lowerBack')}
                  data-part="hips"
                />

                {/* Left arm */}
                <rect
                  x="50" y="90" width="40" height="100"
                  className={`body-part ${hoveredPart === 'leftArm_back' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('leftArm_back')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('leftArm')}
                  data-part="leftArm_back"
                />

                {/* Right arm */}
                <rect
                  x="150" y="90" width="40" height="100"
                  className={`body-part ${hoveredPart === 'rightArm_back' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('rightArm_back')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('rightArm')}
                  data-part="rightArm_back"
                />

                {/* Left leg */}
                <rect
                  x="90" y="230" width="30" height="90"
                  className={`body-part ${hoveredPart === 'leftLeg_back' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('leftLeg_back')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('leftLeg')}
                  data-part="leftLeg_back"
                />

                {/* Right leg */}
                <rect
                  x="120" y="230" width="30" height="90"
                  className={`body-part ${hoveredPart === 'rightLeg_back' ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredPart('rightLeg_back')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleBodyPartClick('rightLeg')}
                  data-part="rightLeg_back"
                />

                {/* Back label */}
                <text x="120" y="20" textAnchor="middle" className="text-xs fill-gray-500">Back View</text>
              </svg>
            </div>
          </div>

          {/* Left side (additional face) */}
          <div
            className="absolute inset-0 backface-hidden transform-style-3d flex justify-center items-center"
            style={{ transform: 'rotateY(-90deg) translateX(-120px)' }}
          >
            <div className="bg-gray-200 w-1 h-1/2"></div>
          </div>

          {/* Right side (additional face) */}
          <div
            className="absolute inset-0 backface-hidden transform-style-3d flex justify-center items-center"
            style={{ transform: 'rotateY(90deg) translateX(120px)' }}
          >
            <div className="bg-gray-200 w-1 h-1/2"></div>
          </div>
        </div>
      </div>

      {/* Tooltip for hovered part */}
      {hoveredPart && (
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <div className="inline-block bg-gray-800 text-white px-3 py-1 rounded text-sm">
            {hoveredPart.replace('_back', '')}
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyModel3D;
