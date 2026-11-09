import React, { useState } from 'react';

// One colour family per group; each shape gets its own shade.
const FAMILIES = {
  triangle: { card: '#FFF3E0', accent: '#E65100' }, // warm oranges
  quad:     { card: '#E3F2FD', accent: '#0D47A1' }, // blues / teals
  solid:    { card: '#F3E5F5', accent: '#4A148C' }, // purples
};

const S = 'stroke="black" stroke-width="2"';

const shapes = [
  // 3-sided
  { id: 1, family: 'triangle', name: 'Equilateral Triangle', svg: `<polygon points="50,10 90,80 10,80" ${S} fill="#FF8A65"/>` },
  { id: 2, family: 'triangle', name: 'Isosceles Triangle', svg: `<polygon points="50,10 75,80 25,80" ${S} fill="#FFB74D"/>` },
  { id: 3, family: 'triangle', name: 'Scalene Triangle', svg: `<polygon points="15,80 70,10 88,80" ${S} fill="#FFD54F"/>` },
  { id: 4, family: 'triangle', name: 'Right Angle Triangle', svg: `<polygon points="20,75 20,30 85,75" ${S} fill="#F48FB1"/><rect x="20" y="63" width="12" height="12" fill="none" stroke="black" stroke-width="1"/>` },
  // 4-sided
  { id: 5, family: 'quad', name: 'Parallelogram', svg: `<polygon points="20,20 75,20 60,50 5,50" ${S} fill="#64B5F6"/>` },
  { id: 6, family: 'quad', name: 'Trapezium', svg: `<polygon points="40,20 60,20 75,50 10,50" ${S} fill="#4DD0E1"/>` },
  { id: 7, family: 'quad', name: 'Square', svg: `<rect x="20" y="20" width="60" height="60" ${S} fill="#4DB6AC"/>` },
  { id: 8, family: 'quad', name: 'Rectangle', svg: `<rect x="15" y="15" width="70" height="40" ${S} fill="#90CAF9"/>` },
  { id: 9, family: 'quad', name: 'Kite', svg: `<polygon points="50,20 75,45 50,80 25,45" ${S} fill="#81D4FA"/>` },
  { id: 10, family: 'quad', name: 'Rhombus', svg: `<polygon points="50,22 88,50 50,78 12,50" ${S} fill="#7986CB"/>` },
  // 3D: front face mid shade, top lighter, side darker, so they look solid
  { id: 11, family: 'solid', name: 'Cube', svg:
    `<rect x="20" y="40" width="50" height="50" ${S} fill="#CE93D8"/>` +
    `<polygon points="20,40 35,25 85,25 70,40" ${S} fill="#E1BEE7"/>` +
    `<polygon points="70,40 85,25 85,75 70,90" ${S} fill="#AB47BC"/>` },
  { id: 12, family: 'solid', name: 'Cuboid', svg:
    `<rect x="10" y="45" width="70" height="45" ${S} fill="#B39DDB"/>` +
    `<polygon points="10,45 30,25 100,25 80,45" ${S} fill="#D1C4E9"/>` +
    `<polygon points="80,45 100,25 100,70 80,90" ${S} fill="#7E57C2"/>` },
  { id: 13, family: 'solid', name: 'Sphere', svg:
    `<circle cx="50" cy="50" r="35" ${S} fill="#F06292"/>` +
    `<ellipse cx="50" cy="50" rx="35" ry="12" stroke="black" stroke-width="1" fill="none"/>` },
  { id: 14, family: 'solid', name: 'Cylinder', svg:
    // bottom ellipse, then the body hides its back half, then the sides and a lighter top
    `<ellipse cx="50" cy="75" rx="28" ry="12" ${S} fill="#9575CD"/>` +
    `<rect x="22" y="25" width="56" height="50" fill="#9575CD"/>` +
    `<line x1="22" y1="25" x2="22" y2="75" ${S}/><line x1="78" y1="25" x2="78" y2="75" ${S}/>` +
    `<ellipse cx="50" cy="25" rx="28" ry="12" ${S} fill="#D1C4E9"/>` },
];

export default function ShapeRemovalGame() {
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
    <div style={{ padding: '20px 40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>Guess the Shape Game</h1>
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
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {shapes.map(shape => {
            const family = FAMILIES[shape.family];
            return (
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
                      backgroundColor: family.card,
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
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: family.accent }}>
                      {shape.name}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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