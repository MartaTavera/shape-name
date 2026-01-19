import React, { useState } from 'react';

export default function ShapeRemovalGame() {
  const shapes = [
    // 3-sided
    { id: 1, name: 'Equilateral Triangle', svg: '<polygon points="50,10 90,80 10,80" stroke="black" stroke-width="2" fill="white"/>' },
    { id: 2, name: 'Isosceles Triangle', svg: '<polygon points="50,10 75,80 25,80" stroke="black" stroke-width="2" fill="white"/>' },
    { id: 3, name: 'Scalene Triangle', svg: '<polygon points="15,80 70,10 88,80" stroke="black" stroke-width="2" fill="white"/>' },
    { id: 4, name: 'Right Angle Triangle', svg: '<polygon points="20,70 20,20 70,70" stroke="black" stroke-width="2" fill="white"/><rect x="20" y="55" width="15" height="15" fill="none" stroke="black" stroke-width="1"/>' },
    // 4-sided
    { id: 5, name: 'Parallelogram', svg: '<polygon points="20,20 75,20 60,50 5,50" stroke="black" stroke-width="2" fill="white"/>' },
    { id: 6, name: 'Trapezium', svg: '<polygon points="40,20 60,20 75,50 10,50" stroke="black" stroke-width="2" fill="white"/>' },
    { id: 7, name: 'Square', svg: '<rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="2" fill="white"/>' },
    { id: 8, name: 'Rectangle', svg: '<rect x="15" y="15" width="70" height="40" stroke="black" stroke-width="2" fill="white"/>' },
    { id: 9, name: 'Kite', svg: '<polygon points="50,20 75,45 50,80 25,45" stroke="black" stroke-width="2" fill="white"/>' },
    { id: 10, name: 'Rhombus', svg: '<polygon points="50,15 85,50 50,85 15,50" stroke="black" stroke-width="2" fill="white"/>' },
    // 3D
    { id: 11, name: 'Cube', svg: '<rect x="20" y="40" width="50" height="50" stroke="black" stroke-width="2" fill="white"/><polygon points="20,40 35,25 85,25 70,40" stroke="black" stroke-width="2" fill="white"/><polygon points="70,40 85,25 85,75 70,90" stroke="black" stroke-width="2" fill="white"/><line x1="20" y1="40" x2="35" y2="25" stroke="black" stroke-width="2"/><line x1="70" y1="40" x2="85" y2="25" stroke="black" stroke-width="2"/><line x1="70" y1="90" x2="85" y2="75" stroke="black" stroke-width="2"/>' },
    { id: 12, name: 'Cuboid', svg: '<rect x="10" y="45" width="70" height="45" stroke="black" stroke-width="2" fill="white"/><polygon points="10,45 30,25 100,25 80,45" stroke="black" stroke-width="2" fill="white"/><polygon points="80,45 100,25 100,70 80,90" stroke="black" stroke-width="2" fill="white"/><line x1="10" y1="45" x2="30" y2="25" stroke="black" stroke-width="2"/><line x1="80" y1="45" x2="100" y2="25" stroke="black" stroke-width="2"/><line x1="80" y1="90" x2="100" y2="70" stroke="black" stroke-width="2"/>' },
    { id: 13, name: 'Sphere', svg: '<circle cx="50" cy="50" r="35" stroke="black" stroke-width="2" fill="white"/><ellipse cx="50" cy="50" rx="35" ry="12" stroke="black" stroke-width="1" fill="none"/>' },
    { id: 14, name: 'Cylinder', svg: '<ellipse cx="50" cy="25" rx="28" ry="12" stroke="black" stroke-width="2" fill="white"/><ellipse cx="50" cy="75" rx="28" ry="12" stroke="black" stroke-width="2" fill="white"/><line x1="22" y1="25" x2="22" y2="75" stroke="black" stroke-width="2"/><line x1="78" y1="25" x2="78" y2="75" stroke="black" stroke-width="2"/>' },
  ];

  const [visibleShapes, setVisibleShapes] = useState(new Set(shapes.map(s => s.id)));

  const removeShape = (id) => {
    const newVisible = new Set(visibleShapes);
    newVisible.delete(id);
    setVisibleShapes(newVisible);
  };

  const resetShapes = () => {
    setVisibleShapes(new Set(shapes.map(s => s.id)));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Shape Removal Game</h1>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>Click on a shape to remove it</p>
        
        <button 
          onClick={resetShapes}
          style={{
            display: 'block',
            margin: '0 auto 30px',
            padding: '10px 30px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reset All
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {shapes.map(shape => (
            <div
              key={shape.id}
              style={{
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {visibleShapes.has(shape.id) && (
                <div
                  onClick={() => removeShape(shape.id)}
                  style={{
                    border: '2px solid #333',
                    padding: '15px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    animation: 'fadeIn 0.3s ease',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                >
                  <svg 
                    viewBox="0 0 100 100" 
                    width="100" 
                    height="100" 
                    style={{ marginBottom: '10px' }}
                    xmlns="http://www.w3.org/2000/svg"
                    dangerouslySetInnerHTML={{ __html: shape.svg }}
                  />
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                    {shape.name}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {visibleShapes.size === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4CAF50'
          }}>
            🎉 All shapes removed! Click Reset to play again.
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}