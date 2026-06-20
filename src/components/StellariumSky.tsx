import React, { useState, useEffect, useRef } from 'react';
import { 
  brightStars, 
  westernConstellations, 
  vietnameseConstellations, 
  deepSkyObjects, 
  planets, 
  Star, 
  Constellation, 
  DSO, 
  Planet 
} from '../data/stellariumData';

// Keplerian Planet position calculator
const computePlanetPosition = (planetId: string, d: number): { ra: number; dec: number } => {
  // Sun
  if (planetId === 'sun') {
    const M = (357.5291 + 0.98560028 * d) * Math.PI / 180;
    const lambda = (280.4665 + 0.98564736 * d + 1.9146 * Math.sin(M) + 0.02 * Math.sin(2 * M)) * Math.PI / 180;
    const obliq = 23.439 * Math.PI / 180;
    const alpha = Math.atan2(Math.cos(obliq) * Math.sin(lambda), Math.cos(lambda));
    const delta = Math.asin(Math.sin(obliq) * Math.sin(lambda));
    let ra = alpha * 12 / Math.PI;
    if (ra < 0) ra += 24;
    return { ra, dec: delta * 180 / Math.PI };
  }
  
  // Moon
  if (planetId === 'moon') {
    const L = (218.316 + 13.176396 * d) * Math.PI / 180;
    const M = (134.963 + 13.064993 * d) * Math.PI / 180;
    const F = (93.272 + 13.229350 * d) * Math.PI / 180;
    const lambda = L + 0.1098 * Math.sin(M) + 0.0222 * Math.sin(2 * L - M) + 0.0115 * Math.sin(2 * L);
    const beta = 0.0898 * Math.sin(F);
    const obliq = 23.439 * Math.PI / 180;
    const x = Math.cos(beta) * Math.cos(lambda);
    const y = Math.cos(obliq) * Math.cos(beta) * Math.sin(lambda) - Math.sin(obliq) * Math.sin(beta);
    const z = Math.sin(obliq) * Math.cos(beta) * Math.sin(lambda) + Math.cos(obliq) * Math.sin(beta);
    let ra = Math.atan2(y, x) * 12 / Math.PI;
    if (ra < 0) ra += 24;
    const dec = Math.asin(z) * 180 / Math.PI;
    return { ra, dec };
  }

  // Planets (relative to sun positions for simplified orbits near ecliptic)
  const sunPos = computePlanetPosition('sun', d);
  const rates: Record<string, { period: number; phase: number; incl: number }> = {
    mercury: { period: 88, phase: 0.1, incl: 7.0 },
    venus: { period: 224.7, phase: 0.4, incl: 3.4 },
    mars: { period: 687, phase: 0.9, incl: 1.85 },
    jupiter: { period: 4331, phase: 0.5, incl: 1.3 },
    saturn: { period: 10747, phase: 0.8, incl: 2.49 }
  };
  
  const data = rates[planetId];
  if (data) {
    const angle = (d / data.period) * 2 * Math.PI + data.phase;
    const r = 0.4 + 0.15 * Math.sin(angle);
    const raOffset = Math.sin(angle) * (1.8 + r);
    const decOffset = Math.cos(angle) * data.incl;
    let ra = sunPos.ra + raOffset;
    while (ra < 0) ra += 24;
    while (ra >= 24) ra -= 24;
    return { ra, dec: sunPos.dec + decOffset };
  }
  return sunPos;
};

// Julian date calculations
const getJulianDate = (date: Date): number => {
  const time = date.getTime();
  return (time / 86400000) + 2440587.5;
};

const getDaysSinceJ2000 = (date: Date): number => {
  return getJulianDate(date) - 2451545.0;
};

// Calculate Local Sidereal Time (GMST + Longitude)
const getLST = (date: Date, longitude: number): number => {
  const jd = getJulianDate(date);
  const d = jd - 2451545.0;
  const T = d / 36525.0;
  let gmst = 280.46061837 + 360.98564736629 * d + 0.000387933 * T * T - T * T * T / 38710000.0;
  gmst = gmst % 360;
  if (gmst < 0) gmst += 360;
  let lst = gmst + longitude;
  lst = lst % 360;
  if (lst < 0) lst += 360;
  return lst;
};

// Convert Equatorial Coordinates (RA/Dec) to Horizontal (Azimuth/Altitude)
const eqToHoriz = (raHours: number, decDegrees: number, lstDegrees: number, latDegrees: number): { az: number; alt: number } => {
  const ra = raHours * 15 * Math.PI / 180;
  const dec = decDegrees * Math.PI / 180;
  const lst = lstDegrees * Math.PI / 180;
  const lat = latDegrees * Math.PI / 180;

  const ha = lst - ra;

  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
  const alt = Math.asin(sinAlt);

  const y = -Math.sin(ha) * Math.cos(dec);
  const x = Math.sin(dec) * Math.cos(lat) - Math.cos(dec) * Math.sin(lat) * Math.cos(ha);
  let az = Math.atan2(y, x);
  
  // Convert to degrees and map Azimuth from North (0) Eastward (90)
  let azDeg = az * 180 / Math.PI;
  if (azDeg < 0) azDeg += 360;
  const altDeg = alt * 180 / Math.PI;

  return { az: azDeg, alt: altDeg };
};

interface StellariumSkyProps {
  onClose: () => void;
  onSelectObject?: (name: string, type: string, details: string) => void;
}

export const StellariumSky: React.FC<StellariumSkyProps> = ({ onClose, onSelectObject }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Observation settings
  const [date, setDate] = useState<Date>(new Date());
  const [isTimeRunning, setIsTimeRunning] = useState<boolean>(true);
  const [timeSpeed, setTimeSpeed] = useState<number>(1); // multiplier
  const [lat, setLat] = useState<number>(21.0285); // Hanoi
  const [lng, setLng] = useState<number>(105.8542);
  const [locationName, setLocationName] = useState<string>("Hà Nội, Việt Nam");

  // Camera Settings
  const [lookYaw, setLookYaw] = useState<number>(180); // Look South by default
  const [lookPitch, setLookPitch] = useState<number>(30); // Look slightly up
  const [fov, setFov] = useState<number>(80); // degrees (horizontal)

  // Toggle Features
  const [showWesternLines, setShowWesternLines] = useState<boolean>(true);
  const [showWesternNames, setShowWesternNames] = useState<boolean>(true);
  const [showVnLines, setShowVnLines] = useState<boolean>(false);
  const [showAtmosphere, setShowAtmosphere] = useState<boolean>(true);
  const [showEquatorGrid, setShowEquatorGrid] = useState<boolean>(false);
  const [showAzimutGrid, setShowAzimutGrid] = useState<boolean>(true);
  const [showMilkyWay, setShowMilkyWay] = useState<boolean>(true);
  const [showStars, setShowStars] = useState<boolean>(true);
  const [showPlanets, setShowPlanets] = useState<boolean>(true);
  const [showDSOs, setShowDSOs] = useState<boolean>(true);
  const [showCompass, setShowCompass] = useState<boolean>(true);
  const [skyCulture, setSkyCulture] = useState<'western' | 'vietnamese'>('western');

  // Selected state
  const [selectedObj, setSelectedObj] = useState<{
    id: string | number;
    name: string;
    type: 'star' | 'planet' | 'dso';
    ra: number;
    dec: number;
    az: number;
    alt: number;
    mag?: number;
    dist?: number;
    desc?: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trackingSelected, setTrackingSelected] = useState<boolean>(false);

  // Animation values for smooth movement
  const targetYawRef = useRef<number>(lookYaw);
  const targetPitchRef = useRef<number>(lookPitch);
  const targetFovRef = useRef<number>(fov);

  // Mouse interaction state
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update date/time
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const update = (time: number) => {
      if (isTimeRunning) {
        const delta = (time - lastTime) / 1000;
        setDate(prev => new Date(prev.getTime() + delta * 1000 * timeSpeed));
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isTimeRunning, timeSpeed]);

  // Smooth camera movements interpolation
  useEffect(() => {
    let animFrame: number;
    const lerp = (start: number, end: number, amt: number) => {
      // Handle degree wrap-around for Yaw
      let diff = end - start;
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;
      return start + diff * amt;
    };

    const updateCamera = () => {
      setLookYaw(prev => {
        const val = lerp(prev, targetYawRef.current, 0.1);
        return (val + 360) % 360;
      });
      setLookPitch(prev => {
        const target = Math.max(-85, Math.min(85, targetPitchRef.current));
        return prev + (target - prev) * 0.1;
      });
      setFov(prev => prev + (targetFovRef.current - prev) * 0.1);
      
      animFrame = requestAnimationFrame(updateCamera);
    };
    
    animFrame = requestAnimationFrame(updateCamera);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Update target tracking
  useEffect(() => {
    if (trackingSelected && selectedObj) {
      // Recompute its current Az/Alt based on current date
      const lst = getLST(date, lng);
      const { az, alt } = eqToHoriz(selectedObj.ra, selectedObj.dec, lst, lat);
      targetYawRef.current = az;
      targetPitchRef.current = alt;
    }
  }, [date, trackingSelected, selectedObj, lat, lng]);

  // Geolocation trigger
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setLocationName("Vị trí của bạn");
        },
        (error) => {
          alert("Không thể lấy vị trí GPS. Đang đặt vị trí mặc định tại Hà Nội.");
        }
      );
    }
  };

  // Change location preset
  const handleLocationPreset = (preset: string) => {
    if (preset === 'hanoi') {
      setLat(21.0285); setLng(105.8542); setLocationName("Hà Nội, VN");
    } else if (preset === 'hcm') {
      setLat(10.8231); setLng(106.6297); setLocationName("TP. Hồ Chí Minh, VN");
    } else if (preset === 'danang') {
      setLat(16.0544); setLng(108.2022); setLocationName("Đà Nẵng, VN");
    } else if (preset === 'london') {
      setLat(51.5074); setLng(-0.1278); setLocationName("London, UK");
    } else if (preset === 'tokyo') {
      setLat(35.6762); setLng(139.6503); setLocationName("Tokyo, JP");
    } else if (preset === 'sydney') {
      setLat(-33.8688); setLng(151.2093); setLocationName("Sydney, AU");
    }
  };

  // Canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas if needed
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    
    // Scale factor: how many pixels per degree of FOV
    const minDim = Math.min(width, height);
    const scale = (minDim / 2) / Math.tan((fov / 2) * Math.PI / 180);

    // Dynamic calculations
    const lst = getLST(date, lng);
    const d = getDaysSinceJ2000(date);

    // Compute Sun position to determine sky colors
    const sunCoords = computePlanetPosition('sun', d);
    const sunHoriz = eqToHoriz(sunCoords.ra, sunCoords.dec, lst, lat);

    // 1. CLEAR & SKY BACKGROUND
    ctx.clearRect(0, 0, width, height);

    // Sky colors based on Sun altitude
    const sunAlt = sunHoriz.alt;
    let skyGradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, minDim);

    if (showAtmosphere) {
      if (sunAlt > 5) {
        // Daytime sky
        skyGradient.addColorStop(0, '#38bdf8'); // sky blue
        skyGradient.addColorStop(1, '#0284c7');
      } else if (sunAlt > -18) {
        // Twilight / Sunset
        const factor = (sunAlt + 18) / 23; // 0 to 1
        const r1 = Math.round(2 + factor * 50);
        const g1 = Math.round(15 + factor * 120);
        const b1 = Math.round(40 + factor * 200);
        const r2 = Math.round(1 + factor * 2);
        const g2 = Math.round(4 + factor * 30);
        const b2 = Math.round(15 + factor * 70);
        skyGradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`);
        skyGradient.addColorStop(1, `rgb(${r2}, ${g2}, ${b2})`);
      } else {
        // Night sky
        skyGradient.addColorStop(0, '#020617');
        skyGradient.addColorStop(1, '#090d16');
      }
    } else {
      // Space mode (atmosphere off)
      skyGradient.addColorStop(0, '#030712');
      skyGradient.addColorStop(1, '#000000');
    }
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // 3D Celestial to Camera projection helper
    const project = (az: number, alt: number): { x: number; y: number; visible: boolean } => {
      const azRad = az * Math.PI / 180;
      const altRad = alt * Math.PI / 180;
      const yawRad = lookYaw * Math.PI / 180;
      const pitchRad = lookPitch * Math.PI / 180;

      // 3D vector in horizontal frame
      // X = North, Y = East, Z = Zenith
      const vx = Math.cos(altRad) * Math.cos(azRad);
      const vy = Math.cos(altRad) * Math.sin(azRad);
      const vz = Math.sin(altRad);

      // Rotate around Z axis by -lookYaw
      const x1 = vx * Math.cos(-yawRad) - vy * Math.sin(-yawRad);
      const y1 = vx * Math.sin(-yawRad) + vy * Math.cos(-yawRad);
      const z1 = vz;

      // Rotate around Y axis by -lookPitch
      // Camera coordinates: Zc points in look direction, Xc right, Yc up
      const xc = x1 * Math.cos(pitchRad) + z1 * Math.sin(pitchRad);
      const yc = y1;
      const zc = -x1 * Math.sin(pitchRad) + z1 * Math.cos(pitchRad);

      // Visible if in front of the camera (zc > 0)
      if (zc > 0) {
        const px = cx + (yc / zc) * scale;
        const py = cy - (xc / zc) * scale;
        return { x: px, y: py, visible: (px >= -100 && px <= width + 100 && py >= -100 && py <= height + 100) };
      }
      return { x: 0, y: 0, visible: false };
    };

    // 2. RENDER AZIMUTHAL GRID (Emerald)
    if (showAzimutGrid) {
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.lineWidth = 1;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.font = '10px monospace';

      // Altitude concentric circles
      const alts = [15, 30, 45, 60, 75];
      alts.forEach(a => {
        ctx.beginPath();
        for (let az = 0; az <= 360; az += 5) {
          const pt = project(az, a);
          if (pt.visible) {
            if (az === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();

        // Label altitude
        const lblPt = project(lookYaw, a);
        if (lblPt.visible) {
          ctx.fillText(`Alt ${a}°`, lblPt.x + 5, lblPt.y - 2);
        }
      });

      // Azimuth spokes
      const azs = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
      azs.forEach(a => {
        ctx.beginPath();
        let started = false;
        for (let alt = 0; alt <= 85; alt += 5) {
          const pt = project(a, alt);
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        }
        ctx.stroke();

        // Labels
        const lblPt = project(a, 10);
        if (lblPt.visible) {
          ctx.fillText(`${a}°`, lblPt.x, lblPt.y + 12);
        }
      });
    }

    // 3. RENDER EQUATORIAL GRID (Cyan)
    if (showEquatorGrid) {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.font = '9px monospace';

      // Declination lines
      const decs = [-60, -30, 0, 30, 60];
      decs.forEach(d => {
        ctx.beginPath();
        let first = true;
        for (let ra = 0; ra <= 24; ra += 0.5) {
          const horiz = eqToHoriz(ra, d, lst, lat);
          const pt = project(horiz.az, horiz.alt);
          if (pt.visible) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        }
        ctx.stroke();
      });

      // RA lines
      for (let ra = 0; ra < 24; ra += 2) {
        ctx.beginPath();
        let started = false;
        for (let dec = -80; dec <= 80; dec += 5) {
          const horiz = eqToHoriz(ra, dec, lst, lat);
          const pt = project(horiz.az, horiz.alt);
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        }
        ctx.stroke();
      }
    }

    // 4. RENDER MILKY WAY GLOW
    if (showMilkyWay) {
      ctx.save();
      const milkyWayPoints = [
        { ra: 0, dec: 60 }, { ra: 2, dec: 62 }, { ra: 4, dec: 55 }, { ra: 6, dec: 25 },
        { ra: 8, dec: -20 }, { ra: 10, dec: -50 }, { ra: 12, dec: -62 }, { ra: 14, dec: -60 },
        { ra: 16, dec: -45 }, { ra: 18, dec: -20 }, { ra: 20, dec: 30 }, { ra: 22, dec: 50 },
        { ra: 24, dec: 60 }
      ];

      ctx.beginPath();
      let started = false;
      milkyWayPoints.forEach(pt => {
        const horiz = eqToHoriz(pt.ra, pt.dec, lst, lat);
        const scr = project(horiz.az, horiz.alt);
        if (scr.visible) {
          if (!started) {
            ctx.moveTo(scr.x, scr.y);
            started = true;
          } else {
            ctx.lineTo(scr.x, scr.y);
          }
        }
      });

      ctx.shadowColor = 'rgba(219, 234, 254, 0.08)';
      ctx.shadowBlur = 80;
      ctx.lineWidth = minDim * 0.15;
      ctx.strokeStyle = 'rgba(219, 234, 254, 0.035)';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.restore();
    }

    // Convert all stars to current Az/Alt horizontal coordinates
    const calculatedStars = brightStars.map(star => {
      const { az, alt } = eqToHoriz(star.ra, star.dec, lst, lat);
      const scr = project(az, alt);
      return { ...star, az, alt, scr };
    });

    // 5. RENDER CONSTELLATION LINES
    const selectedCultureConsts = skyCulture === 'western' ? westernConstellations : vietnameseConstellations;
    if ((skyCulture === 'western' && showWesternLines) || (skyCulture === 'vietnamese' && showVnLines) || skyCulture === 'vietnamese') {
      ctx.strokeStyle = skyCulture === 'vietnamese' ? 'rgba(244, 63, 94, 0.35)' : 'rgba(96, 165, 250, 0.25)'; // Rose for VN, Blue for Western
      ctx.lineWidth = 1.2;
      
      selectedCultureConsts.forEach(constellation => {
        constellation.lines.forEach(pair => {
          const star1 = calculatedStars.find(s => s.id === pair[0]);
          const star2 = calculatedStars.find(s => s.id === pair[1]);

          if (star1 && star2 && star1.scr.visible && star2.scr.visible) {
            // Cutoff if below horizon and atmosphere on
            if (showAtmosphere && (star1.alt < 0 || star2.alt < 0)) return;

            ctx.beginPath();
            ctx.moveTo(star1.scr.x, star1.scr.y);
            ctx.lineTo(star2.scr.x, star2.scr.y);
            ctx.stroke();
          }
        });
      });
    }

    // 6. RENDER CONSTELLATION NAMES
    if (showWesternNames) {
      ctx.fillStyle = skyCulture === 'vietnamese' ? 'rgba(251, 113, 133, 0.7)' : 'rgba(147, 197, 253, 0.6)';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';

      selectedCultureConsts.forEach(constellation => {
        // Average coordinates of constellation stars
        let sumX = 0, sumY = 0, count = 0;
        constellation.lines.forEach(pair => {
          const star1 = calculatedStars.find(s => s.id === pair[0]);
          if (star1 && star1.scr.visible) {
            if (showAtmosphere && star1.alt < 0) return;
            sumX += star1.scr.x;
            sumY += star1.scr.y;
            count++;
          }
        });

        if (count > 0) {
          const cx = sumX / count;
          const cy = sumY / count;
          ctx.fillText(skyCulture === 'vietnamese' ? constellation.vnName : constellation.name, cx, cy);
        }
      });
    }

    // 7. RENDER STARS
    if (showStars) {
      calculatedStars.forEach(star => {
        if (!star.scr.visible) return;
        if (showAtmosphere && star.alt < 0) return; // Horizon cutoff

        // Size proportional to brightness (smaller magnitude = brighter)
        const rad = Math.max(0.6, (4.5 - star.mag) * 0.7);
        
        ctx.beginPath();
        ctx.arc(star.scr.x, star.scr.y, rad, 0, 2 * Math.PI);
        ctx.fillStyle = star.color;

        // Bright stars get a halo glow
        if (star.mag < 1.6) {
          ctx.save();
          ctx.shadowColor = star.color;
          ctx.shadowBlur = rad * 4;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fill();
        }

        // Draw name for bright stars if zoomed in
        if (star.mag < 2.0 || fov < 45) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
          ctx.font = '9px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(star.name, star.scr.x + rad + 3, star.scr.y + 3);
        }
      });
    }

    // 8. RENDER DEEP SKY OBJECTS (DSOs)
    if (showDSOs) {
      deepSkyObjects.forEach(dso => {
        const { az, alt } = eqToHoriz(dso.ra, dso.dec, lst, lat);
        const scr = project(az, alt);
        if (!scr.visible) return;
        if (showAtmosphere && alt < 0) return;

        // DSO Symbol Drawing
        ctx.strokeStyle = 'rgba(232, 121, 249, 0.7)'; // Magenta
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba(232, 121, 249, 0.8)';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';

        if (dso.type === 'galaxy') {
          // Oval representation
          ctx.beginPath();
          ctx.ellipse(scr.x, scr.y, 8, 4, Math.PI / 4, 0, 2 * Math.PI);
          ctx.stroke();
        } else if (dso.type === 'nebula') {
          // Square representation
          ctx.strokeRect(scr.x - 5, scr.y - 5, 10, 10);
        } else {
          // Cluster: Dotted circle
          ctx.beginPath();
          ctx.arc(scr.x, scr.y, 6, 0, 2 * Math.PI);
          ctx.setLineDash([2, 2]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.fillText(dso.name, scr.x, scr.y - 9);
      });
    }

    // 9. RENDER PLANETS (Sun, Moon & Planets)
    if (showPlanets) {
      planets.forEach(p => {
        const pos = computePlanetPosition(p.id, d);
        const { az, alt } = eqToHoriz(pos.ra, pos.dec, lst, lat);
        const scr = project(az, alt);
        if (!scr.visible) return;
        
        // Sun cutoff atmosphere logic
        if (showAtmosphere && alt < -1 && p.id !== 'sun') return;
        if (showAtmosphere && p.id === 'sun' && alt < -2) return;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        
        if (p.id === 'sun') {
          // Draw sun with massive solar glow
          ctx.save();
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 30;
          ctx.arc(scr.x, scr.y, p.size, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        } else if (p.id === 'moon') {
          // Calculate moon phase (simplified)
          const sunPos = computePlanetPosition('sun', d);
          const moonElongation = (pos.ra - sunPos.ra) * 15; // approximate angle in degrees
          
          ctx.save();
          ctx.arc(scr.x, scr.y, p.size, 0, 2 * Math.PI);
          ctx.fillStyle = '#f1f5f9';
          ctx.fill();
          
          // Draw crescent shadow overlay
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = '#0f172a'; // dark shadow color
          
          const phase = Math.cos(moonElongation * Math.PI / 180); // -1 (new), 0 (half), 1 (full)
          if (phase < 0) {
            // Draw crescent shadow
            ctx.beginPath();
            ctx.arc(scr.x + p.size * (phase + 1), scr.y, p.size * 1.1, 0, 2 * Math.PI);
            ctx.fill();
          } else if (phase < 0.95) {
            // Draw gibbous shadow
            ctx.beginPath();
            ctx.arc(scr.x - p.size * (1 - phase), scr.y, p.size * 1.1, 0, 2 * Math.PI);
            ctx.fill();
          }
          ctx.restore();
        } else {
          // Draw small planetary circle
          ctx.arc(scr.x, scr.y, p.size, 0, 2 * Math.PI);
          ctx.fill();
        }

        // Draw ring symbol for Saturn
        if (p.id === 'saturn') {
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(scr.x, scr.y, p.size * 1.6, p.size * 0.4, -Math.PI / 6, 0, 2 * Math.PI);
          ctx.stroke();
        }

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.vnName, scr.x, scr.y + p.size + 10);
      });
    }

    // 10. HORIZON LAND & CARDINAL DIRECTIONS (Compass)
    if (showCompass) {
      // Draw horizon line separating ground from sky dome
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)'; // Red horizon line
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      let horizonStarted = false;
      for (let az = 0; az <= 360; az += 2) {
        const pt = project(az, 0); // Alt = 0
        if (pt.visible) {
          if (!horizonStarted) {
            ctx.moveTo(pt.x, pt.y);
            horizonStarted = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
      }
      ctx.stroke();

      // Render ground overlay if atmosphere is on
      if (showAtmosphere) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)'; // Solid dark ground
        ctx.beginPath();
        // Custom simple terrain boundary below alt=0
        let polyStarted = false;
        for (let az = lookYaw - fov; az <= lookYaw + fov; az += 2) {
          const pt = project(az, 0);
          if (pt.visible) {
            if (!polyStarted) {
              ctx.moveTo(pt.x, pt.y);
              polyStarted = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Cardinal direction letters
      const cardinalPoints = [
        { label: 'BẮC (N)', az: 0 },
        { label: 'ĐÔNG (E)', az: 90 },
        { label: 'NAM (S)', az: 180 },
        { label: 'TÂY (W)', az: 270 }
      ];

      ctx.fillStyle = '#f87171';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      
      cardinalPoints.forEach(cp => {
        const pt = project(cp.az, 0);
        if (pt.visible) {
          ctx.fillText(cp.label, pt.x, pt.y - 8);
        }
      });
    }

    // 11. RENDER RETICLE TARGET OVER SELECTED OBJECT
    if (selectedObj) {
      let objAz = selectedObj.az;
      let objAlt = selectedObj.alt;

      if (selectedObj.type === 'planet') {
        const pos = computePlanetPosition(selectedObj.id as string, d);
        const horiz = eqToHoriz(pos.ra, pos.dec, lst, lat);
        objAz = horiz.az;
        objAlt = horiz.alt;
      }

      const scr = project(objAz, objAlt);
      if (scr.visible && (!showAtmosphere || objAlt >= 0)) {
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)'; // Sky blue bracket
        ctx.lineWidth = 1.5;
        const size = 15;
        
        // Draw brackets
        ctx.beginPath();
        // Top Left
        ctx.moveTo(scr.x - size, scr.y - size + 5);
        ctx.lineTo(scr.x - size, scr.y - size);
        ctx.lineTo(scr.x - size + 5, scr.y - size);
        // Top Right
        ctx.moveTo(scr.x + size, scr.y - size + 5);
        ctx.lineTo(scr.x + size, scr.y - size);
        ctx.lineTo(scr.x + size - 5, scr.y - size);
        // Bottom Left
        ctx.moveTo(scr.x - size, scr.y + size - 5);
        ctx.lineTo(scr.x - size, scr.y + size);
        ctx.lineTo(scr.x - size + 5, scr.y + size);
        // Bottom Right
        ctx.moveTo(scr.x + size, scr.y + size - 5);
        ctx.lineTo(scr.x + size, scr.y + size);
        ctx.lineTo(scr.x + size - 5, scr.y + size);
        
        ctx.stroke();

        // Selected label
        ctx.fillStyle = '#60a5fa';
        ctx.font = '10px monospace';
        ctx.fillText(selectedObj.name, scr.x, scr.y + size + 12);
      }
    }
  }, [
    date,
    lat,
    lng,
    lookYaw,
    lookPitch,
    fov,
    showWesternLines,
    showWesternNames,
    showVnLines,
    showAtmosphere,
    showEquatorGrid,
    showAzimutGrid,
    showMilkyWay,
    showStars,
    showPlanets,
    showDSOs,
    showCompass,
    skyCulture,
    selectedObj
  ]);

  // Object Selection Handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const minDim = Math.min(width, height);
    const scale = (minDim / 2) / Math.tan((fov / 2) * Math.PI / 180);

    const lst = getLST(date, lng);
    const d = getDaysSinceJ2000(date);

    // Look through all objects and find closest within range (25px)
    let closestObj: any = null;
    let minDist = 25; // selection radius in pixels

    // 3D projection conversion logic inside click
    const getScreenCoords = (az: number, alt: number) => {
      const azRad = az * Math.PI / 180;
      const altRad = alt * Math.PI / 180;
      const yawRad = lookYaw * Math.PI / 180;
      const pitchRad = lookPitch * Math.PI / 180;

      const vx = Math.cos(altRad) * Math.cos(azRad);
      const vy = Math.cos(altRad) * Math.sin(azRad);
      const vz = Math.sin(altRad);

      const x1 = vx * Math.cos(-yawRad) - vy * Math.sin(-yawRad);
      const y1 = vx * Math.sin(-yawRad) + vy * Math.cos(-yawRad);
      const z1 = vz;

      const xc = x1 * Math.cos(pitchRad) + z1 * Math.sin(pitchRad);
      const yc = y1;
      const zc = -x1 * Math.sin(pitchRad) + z1 * Math.cos(pitchRad);

      if (zc > 0) {
        return { x: cx + (yc / zc) * scale, y: cy - (xc / zc) * scale, visible: true };
      }
      return { x: 0, y: 0, visible: false };
    };

    // Check Planets
    if (showPlanets) {
      planets.forEach(p => {
        const pos = computePlanetPosition(p.id, d);
        const horiz = eqToHoriz(pos.ra, pos.dec, lst, lat);
        const scr = getScreenCoords(horiz.az, horiz.alt);
        if (scr.visible && (!showAtmosphere || horiz.alt >= 0)) {
          const dist = Math.hypot(mouseX - scr.x, mouseY - scr.y);
          if (dist < minDist) {
            minDist = dist;
            closestObj = {
              id: p.id,
              name: `${p.vnName} (${p.name})`,
              type: 'planet',
              ra: pos.ra,
              dec: pos.dec,
              az: horiz.az,
              alt: horiz.alt,
              desc: p.desc
            };
          }
        }
      });
    }

    // Check DSOs
    if (showDSOs && !closestObj) {
      deepSkyObjects.forEach(dso => {
        const horiz = eqToHoriz(dso.ra, dso.dec, lst, lat);
        const scr = getScreenCoords(horiz.az, horiz.alt);
        if (scr.visible && (!showAtmosphere || horiz.alt >= 0)) {
          const dist = Math.hypot(mouseX - scr.x, mouseY - scr.y);
          if (dist < minDist) {
            minDist = dist;
            closestObj = {
              id: dso.id,
              name: dso.name,
              type: 'dso',
              ra: dso.ra,
              dec: dso.dec,
              az: horiz.az,
              alt: horiz.alt,
              mag: dso.mag,
              dist: dso.dist,
              desc: dso.desc
            };
          }
        }
      });
    }

    // Check Stars
    if (showStars && !closestObj) {
      brightStars.forEach(star => {
        const horiz = eqToHoriz(star.ra, star.dec, lst, lat);
        const scr = getScreenCoords(horiz.az, horiz.alt);
        if (scr.visible && (!showAtmosphere || horiz.alt >= 0)) {
          const dist = Math.hypot(mouseX - scr.x, mouseY - scr.y);
          if (dist < minDist) {
            minDist = dist;
            closestObj = {
              id: star.id,
              name: star.name,
              type: 'star',
              ra: star.ra,
              dec: star.dec,
              az: horiz.az,
              alt: horiz.alt,
              mag: star.mag,
              dist: star.dist,
              desc: star.desc
            };
          }
        }
      });
    }

    if (closestObj) {
      setSelectedObj(closestObj);
      if (onSelectObject) {
        onSelectObject(
          closestObj.name,
          closestObj.type,
          `Tọa độ Xích đạo: RA ${closestObj.ra.toFixed(2)}h, Dec ${closestObj.dec.toFixed(1)}° | Tọa độ Chân trời: Az ${closestObj.az.toFixed(1)}°, Alt ${closestObj.alt.toFixed(1)}° | Cấp sao: ${closestObj.mag ?? 'N/A'} | Khoảng cách: ${closestObj.dist ? (closestObj.dist.toLocaleString() + ' năm ánh sáng') : 'N/A'}`
        );
      }
    } else {
      setSelectedObj(null);
    }
  };

  // Search Execute
  const executeSearch = (q: string) => {
    if (q.trim() === '') return;
    const cleanQ = q.trim().toLowerCase();

    const lst = getLST(date, lng);
    const d = getDaysSinceJ2000(date);

    // Search planets
    const foundPlanet = planets.find(p => p.name.toLowerCase().includes(cleanQ) || p.vnName.toLowerCase().includes(cleanQ));
    if (foundPlanet) {
      const pos = computePlanetPosition(foundPlanet.id, d);
      const horiz = eqToHoriz(pos.ra, pos.dec, lst, lat);
      setSelectedObj({
        id: foundPlanet.id,
        name: `${foundPlanet.vnName} (${foundPlanet.name})`,
        type: 'planet',
        ra: pos.ra,
        dec: pos.dec,
        az: horiz.az,
        alt: horiz.alt,
        desc: foundPlanet.desc
      });
      targetYawRef.current = horiz.az;
      targetPitchRef.current = horiz.alt;
      targetFovRef.current = 20; // Zoom in
      return;
    }

    // Search DSOs
    const foundDSO = deepSkyObjects.find(dso => dso.name.toLowerCase().includes(cleanQ) || dso.id.toLowerCase().includes(cleanQ));
    if (foundDSO) {
      const horiz = eqToHoriz(foundDSO.ra, foundDSO.dec, lst, lat);
      setSelectedObj({
        id: foundDSO.id,
        name: foundDSO.name,
        type: 'dso',
        ra: foundDSO.ra,
        dec: foundDSO.dec,
        az: horiz.az,
        alt: horiz.alt,
        mag: foundDSO.mag,
        dist: foundDSO.dist,
        desc: foundDSO.desc
      });
      targetYawRef.current = horiz.az;
      targetPitchRef.current = horiz.alt;
      targetFovRef.current = 15; // Zoom in
      return;
    }

    // Search Stars
    const foundStar = brightStars.find(star => star.name.toLowerCase().includes(cleanQ) || star.designation.toLowerCase().includes(cleanQ));
    if (foundStar) {
      const horiz = eqToHoriz(foundStar.ra, foundStar.dec, lst, lat);
      setSelectedObj({
        id: foundStar.id,
        name: foundStar.name,
        type: 'star',
        ra: foundStar.ra,
        dec: foundStar.dec,
        az: horiz.az,
        alt: horiz.alt,
        mag: foundStar.mag,
        dist: foundStar.dist,
        desc: foundStar.desc
      });
      targetYawRef.current = horiz.az;
      targetPitchRef.current = horiz.alt;
      targetFovRef.current = 10; // Zoom in
      return;
    }

    alert(`Không tìm thấy thiên thể "${q}" trên bản đồ.`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  // Mouse Dragging for Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    // Adjust panning speed based on FOV (zoomed-in camera pans slower)
    const factor = fov / 600;

    targetYawRef.current = (targetYawRef.current - deltaX * factor + 360) % 360;
    targetPitchRef.current = Math.max(-85, Math.min(85, targetPitchRef.current + deltaY * factor));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    if (trackingSelected) setTrackingSelected(false); // break tracking on manual movement
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Wheel Zooming
  const handleWheel = (e: React.WheelEvent) => {
    targetFovRef.current = Math.max(5, Math.min(120, targetFovRef.current + e.deltaY * 0.05));
  };

  return (
    <div className="absolute inset-0 bg-slate-950 flex flex-col z-40 overflow-hidden font-sans text-slate-200">
      {/* Header Controls */}
      <header className="flex items-center justify-between p-3 bg-slate-900/90 backdrop-blur border-b border-slate-800 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors" title="Quay lại">
            ✕
          </button>
          <h1 className="text-lg font-bold text-sky-400 tracking-wider flex items-center gap-2">
            <span>🌌</span> KÍNH THIÊN VĂN STELLARIUM WEB
          </h1>
        </div>

        {/* Global Presets / Quick Search */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative flex">
            <input 
              type="text" 
              placeholder="Tìm hành tinh, sao, tinh vân... (VD: Sirius, Mars, M31)" 
              className="w-72 bg-slate-950 border border-slate-700 px-3 py-1 rounded-l text-xs focus:outline-none focus:border-sky-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 rounded-r text-xs font-semibold transition-colors">
              Tìm
            </button>
          </form>

          {/* Time & Play Controls */}
          <div className="flex items-center bg-slate-950 rounded border border-slate-700 px-2 py-0.5 text-xs gap-1.5 font-mono">
            <span className="text-sky-300">{date.toLocaleTimeString('vi-VN')}</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400">{date.toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </header>

      {/* Main Workspace layout */}
      <div className="flex-1 flex relative">
        {/* Left Side Panel (Controls) */}
        <div className="w-80 bg-slate-900/80 backdrop-blur border-r border-slate-800 flex flex-col z-30 p-4 gap-4 overflow-y-auto">
          {/* Observation Coordinates */}
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">📍 Địa Điểm & Vĩ Độ</h3>
            <div className="text-xs flex flex-col gap-1.5">
              <div className="flex justify-between"><span className="text-slate-400">Vị trí:</span> <span className="font-semibold">{locationName}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Vĩ độ:</span> <span className="font-mono">{lat.toFixed(4)}° N</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Kinh độ:</span> <span className="font-mono">{lng.toFixed(4)}° E</span></div>
            </div>
            
            <div className="grid grid-cols-3 gap-1 mt-3">
              <button onClick={() => handleLocationPreset('hanoi')} className="bg-slate-800 hover:bg-slate-700 text-[10px] py-1 rounded transition-colors">Hà Nội</button>
              <button onClick={() => handleLocationPreset('hcm')} className="bg-slate-800 hover:bg-slate-700 text-[10px] py-1 rounded transition-colors">TP HCM</button>
              <button onClick={() => handleLocationPreset('danang')} className="bg-slate-800 hover:bg-slate-700 text-[10px] py-1 rounded transition-colors">Đà Nẵng</button>
            </div>
            
            <div className="grid grid-cols-2 gap-1 mt-1">
              <button onClick={handleGeolocation} className="bg-sky-950/50 border border-sky-800 text-sky-300 hover:bg-sky-900/50 text-[10px] py-1 rounded transition-colors flex items-center justify-center gap-1">
                📡 GPS Tự Động
              </button>
              <button onClick={() => handleLocationPreset('london')} className="bg-slate-800 hover:bg-slate-700 text-[10px] py-1 rounded transition-colors">Ngoại Quốc</button>
            </div>
          </div>

          {/* Sky Culture */}
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
            <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">🌸 Văn Hóa Bầu Trời</h3>
            <div className="flex bg-slate-900 rounded p-0.5 border border-slate-800">
              <button 
                onClick={() => { setSkyCulture('western'); setShowWesternLines(true); setShowVnLines(false); }}
                className={`flex-1 text-center py-1 text-xs rounded transition-all ${skyCulture === 'western' ? 'bg-sky-600 font-bold text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Tây Phương (IAU)
              </button>
              <button 
                onClick={() => { setSkyCulture('vietnamese'); setShowWesternLines(false); setShowVnLines(true); }}
                className={`flex-1 text-center py-1 text-xs rounded transition-all ${skyCulture === 'vietnamese' ? 'bg-rose-600 font-bold text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Việt Nam (Cổ)
              </button>
            </div>
            <p className="text-[10px] text-slate-400 italic mt-2">
              {skyCulture === 'western' 
                ? "Bộ chòm sao quốc tế chuẩn IAU với 88 chòm sao thiên văn hiện đại." 
                : "Hệ chòm sao Nhị Thập Bát Tú và Tam Viên truyền thống theo Thiên văn học Việt Nam và Đông Á cổ đại."
              }
            </p>
          </div>

          {/* Time Machine controls */}
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">⏱️ Cỗ Máy Thời Gian</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center gap-1">
                <button onClick={() => setTimeSpeed(-1000)} className="bg-slate-800 hover:bg-slate-700 text-xs px-2 py-1 rounded" title="Tua nhanh về quá khứ">⏪</button>
                <button onClick={() => setTimeSpeed(prev => Math.max(1, prev / 2))} className="bg-slate-800 hover:bg-slate-700 text-xs px-2 py-1 rounded" title="Giảm tốc">➖</button>
                <button onClick={() => setIsTimeRunning(!isTimeRunning)} className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1 rounded font-bold">
                  {isTimeRunning ? '⏸ Tạm dừng' : '▶ Chạy'}
                </button>
                <button onClick={() => setTimeSpeed(prev => prev * 2)} className="bg-slate-800 hover:bg-slate-700 text-xs px-2 py-1 rounded" title="Tăng tốc">➕</button>
                <button onClick={() => setTimeSpeed(1000)} className="bg-slate-800 hover:bg-slate-700 text-xs px-2 py-1 rounded" title="Tua nhanh tới tương lai">⏩</button>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 px-1 mt-1">
                <span>Tốc độ: {timeSpeed}x</span>
                <button onClick={() => { setDate(new Date()); setTimeSpeed(1); setIsTimeRunning(true); }} className="text-emerald-400 hover:underline">
                  Reset Hiện Tại
                </button>
              </div>
            </div>
          </div>

          {/* Layers and Settings */}
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">🛠️ Tùy Chọn Lớp Hiển Thị</h3>
            <div className="flex flex-col gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input type="checkbox" checked={showAtmosphere} onChange={e => setShowAtmosphere(e.target.checked)} className="rounded text-sky-600 focus:ring-0" />
                <span>Bầu khí quyển (Khúc xạ ngày/đêm)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input type="checkbox" checked={skyCulture === 'western' ? showWesternLines : showVnLines} onChange={e => skyCulture === 'western' ? setShowWesternLines(e.target.checked) : setShowVnLines(e.target.checked)} className="rounded text-sky-600" />
                <span>Vẽ đường nối chòm sao</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input type="checkbox" checked={showWesternNames} onChange={e => setShowWesternNames(e.target.checked)} className="rounded text-sky-600" />
                <span>Hiển thị tên chòm sao</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input type="checkbox" checked={showEquatorGrid} onChange={e => setShowEquatorGrid(e.target.checked)} className="rounded text-sky-600" />
                <span>Lưới tọa độ Xích Đạo (Equatorial)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input type="checkbox" checked={showAzimutGrid} onChange={e => setShowAzimutGrid(e.target.checked)} className="rounded text-sky-600" />
                <span>Lưới tọa độ Chân Trời (Azimuthal)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input type="checkbox" checked={showMilkyWay} onChange={e => setShowMilkyWay(e.target.checked)} className="rounded text-sky-600" />
                <span>Hiển thị Dải Ngân Hà (Milky Way)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input type="checkbox" checked={showCompass} onChange={e => setShowCompass(e.target.checked)} className="rounded text-sky-600" />
                <span>Đường chân trời & Đông Tây Nam Bắc</span>
              </label>
            </div>
          </div>
        </div>

        {/* Center Planetarium Viewport */}
        <div className="flex-1 relative bg-black select-none">
          <canvas 
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          />

          {/* Compass Rose Mini Widget */}
          <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-700 rounded-lg p-2 flex flex-col gap-1 items-center z-20 pointer-events-none w-28 text-center text-[10px] font-mono shadow-2xl">
            <span className="text-slate-400">Góc nhìn</span>
            <div className="text-emerald-400 font-bold">Yaw: {lookYaw.toFixed(0)}°</div>
            <div className="text-emerald-400 font-bold">Pitch: {lookPitch.toFixed(0)}°</div>
            <div className="text-sky-400">Trường nhìn: {fov.toFixed(0)}°</div>
          </div>

          {/* Help overlay */}
          <div className="absolute top-4 right-4 bg-slate-900/75 border border-slate-800 rounded p-2 text-[10px] text-slate-400 pointer-events-none z-10">
            🖱️ Kéo chuột để xoay camera | 📜 Cuộn chuột để Phóng to/Thu nhỏ | 🔘 Click để chọn
          </div>
        </div>

        {/* Right Info Panel (Star details & AI Analysis) */}
        {selectedObj && (
          <aside className="w-80 bg-slate-900/90 backdrop-blur border-l border-slate-800 flex flex-col z-30 p-4 gap-4 overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider">📡 Thông Tin Thiên Thể</h2>
              <button 
                onClick={() => setSelectedObj(null)}
                className="text-xs text-slate-500 hover:text-slate-200"
              >
                Đóng ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <h3 className="text-base font-bold text-white mb-1">{selectedObj.name}</h3>
                <span className="inline-block px-1.5 py-0.5 bg-sky-900/50 border border-sky-600 rounded text-[9px] uppercase font-semibold text-sky-300 tracking-wider">
                  {selectedObj.type === 'star' ? 'Hằng Tinh (Star)' : selectedObj.type === 'planet' ? 'Hành Tinh' : 'Thiên thể Sâu (DSO)'}
                </span>

                <div className="mt-3 flex flex-col gap-1.5 text-xs font-mono border-t border-slate-800 pt-3">
                  <div className="flex justify-between"><span className="text-slate-400">RA (Xích kinh):</span> <span>{selectedObj.ra.toFixed(2)}h</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Dec (Xích vĩ):</span> <span>{selectedObj.dec.toFixed(1)}°</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Az (Phương vị):</span> <span>{selectedObj.az.toFixed(1)}°</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Alt (Độ cao):</span> <span className={selectedObj.alt >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{selectedObj.alt.toFixed(1)}° {selectedObj.alt < 0 && '(Dưới chân trời)'}</span></div>
                  {selectedObj.mag !== undefined && <div className="flex justify-between"><span className="text-slate-400">Cấp sao (Mag):</span> <span className="text-amber-400">{selectedObj.mag.toFixed(2)}</span></div>}
                  {selectedObj.dist !== undefined && <div className="flex justify-between"><span className="text-slate-400">Khoảng cách:</span> <span>{selectedObj.dist >= 10000 ? `${(selectedObj.dist/1000000).toFixed(2)}M ly` : `${selectedObj.dist.toLocaleString()} ly`}</span></div>}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => {
                    targetYawRef.current = selectedObj.az;
                    targetPitchRef.current = selectedObj.alt;
                    targetFovRef.current = selectedObj.type === 'star' ? 10 : 25;
                  }}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-1 shadow-lg shadow-sky-950"
                >
                  🚀 Hướng Kính
                </button>
                <button 
                  onClick={() => setTrackingSelected(!trackingSelected)}
                  className={`font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-1 border ${
                    trackingSelected 
                      ? 'bg-emerald-600 border-emerald-400 text-white animate-pulse' 
                      : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  🎯 {trackingSelected ? 'Đang Khóa' : 'Khóa Bám Nét'}
                </button>
              </div>

              {selectedObj.desc && (
                <div className="bg-slate-950/40 p-3 rounded border border-slate-800 text-xs leading-relaxed text-slate-300">
                  <h4 className="font-bold text-slate-200 mb-1">Chi tiết & Lịch sử:</h4>
                  <p>{selectedObj.desc}</p>
                </div>
              )}

              {/* VIFOTEC AI Ask button */}
              <div className="bg-indigo-950/40 border border-indigo-900 p-3 rounded mt-2">
                <h4 className="text-xs font-bold text-indigo-300 uppercase mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></span> Trợ lý Nghiên Cứu Gemini
                </h4>
                <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">Gửi yêu cầu phân tích chuyên sâu về thiên thể này vào giao diện Chat của hệ thống.</p>
                <button
                  onClick={() => {
                    if (onSelectObject) {
                      onSelectObject(
                        selectedObj.name,
                        selectedObj.type,
                        `Hãy kể chi tiết cho tôi về hằng tinh/hành tinh/chòm sao có tên là ${selectedObj.name}. Giải thích đầy đủ về vị trí thiên văn học, các phát hiện khoa học gần đây cũng như truyền thuyết dân gian, lịch sử văn hóa gắn liền với nó trong lịch sử nhân loại.`
                      );
                    }
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 rounded text-[10px] transition-colors"
                >
                  🧬 Phân Tích Khoa Học & Văn Hóa
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
