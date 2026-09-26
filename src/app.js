import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import moonCatalog from './moons.json';

const bodies = [
  {name:'ดวงอาทิตย์',kind:'ดาวฤกษ์',color:0xffbd5a,radius:3.1,orbit:0,period:0,desc:'ดวงอาทิตย์เป็นดาวฤกษ์ที่ให้แสงและความร้อนแก่โลก ดาวเคราะห์ทั้งแปดโคจรรอบดวงอาทิตย์',fact:'แสงจากดวงอาทิตย์ใช้เวลาประมาณ 8 นาทีจึงเดินทางถึงโลก',prompt:'หมุนมุมมองแล้วสังเกตว่าดาวเคราะห์อยู่รอบดวงอาทิตย์'},
  {name:'ดาวพุธ',kind:'ดาวเคราะห์ลำดับที่ 1',color:0xaaa9a5,radius:.42,orbit:6,period:6,desc:'ดาวพุธอยู่ใกล้ดวงอาทิตย์ที่สุด เป็นดาวเคราะห์หินขนาดเล็กและมีหลุมอุกกาบาตมาก',fact:'ดาวพุธไม่มีดวงจันทร์บริวาร',prompt:'มองหาดาวดวงเล็กบนวงโคจรชั้นในสุด'},
  {name:'ดาวศุกร์',kind:'ดาวเคราะห์ลำดับที่ 2',color:0xe8c49a,radius:.72,orbit:9,period:9,desc:'ดาวศุกร์มีเมฆหนาทึบปกคลุม และมีอุณหภูมิพื้นผิวสูงมาก',fact:'ดาวศุกร์เป็นดาวเคราะห์ที่ร้อนที่สุดในระบบสุริยะ',prompt:'เทียบตำแหน่งของดาวศุกร์กับโลก'},
  {name:'โลก',kind:'ดาวเคราะห์ลำดับที่ 3',color:0x3e8dcc,radius:.78,orbit:12.5,period:12,desc:'โลกเป็นบ้านของเรา มีน้ำในสถานะของเหลวและอากาศที่สิ่งมีชีวิตใช้หายใจ โลกโคจรรอบดวงอาทิตย์',fact:'มหาสมุทรปกคลุมพื้นผิวโลกส่วนใหญ่ และบริเวณขั้วโลกมีน้ำแข็ง',prompt:'ซูมดูทวีป ทะเล ขั้วโลก และดาวเทียมที่โคจรรอบโลก'},
  {name:'ดาวอังคาร',kind:'ดาวเคราะห์ลำดับที่ 4',color:0xc97854,radius:.6,orbit:16,period:18,desc:'ดาวอังคารมีสีออกแดงเพราะฝุ่นที่มีสารประกอบเหล็กอยู่บนพื้นผิว',fact:'ดาวอังคารมีดวงจันทร์ 2 ดวง',prompt:'มองหาดาวสีแดงถัดจากโลก'},
  {name:'ดาวพฤหัสบดี',kind:'ดาวเคราะห์ลำดับที่ 5',color:0xd3ad88,radius:1.85,orbit:22,period:30,desc:'ดาวพฤหัสบดีเป็นดาวเคราะห์ที่ใหญ่ที่สุด มีแถบเมฆและพายุขนาดใหญ่',fact:'จุดแดงใหญ่คือพายุที่เกิดขึ้นในบรรยากาศ',prompt:'หมุนมุมมองเพื่อดูแถบเมฆบนพื้นผิว'},
  {name:'ดาวเสาร์',kind:'ดาวเคราะห์ลำดับที่ 6',color:0xdac99a,radius:1.55,orbit:29,period:40,desc:'ดาวเสาร์เป็นดาวเคราะห์แก๊สที่มีวงแหวนเด่นชัด วงแหวนประกอบด้วยชิ้นน้ำแข็งและหิน',fact:'วงแหวนไม่ใช่แผ่นแข็งแผ่นเดียว',prompt:'หมุนมุมมองขึ้นลงเพื่อดูวงแหวนจากหลายมุม'},
  {name:'ดาวยูเรนัส',kind:'ดาวเคราะห์ลำดับที่ 7',color:0x8ad7dc,radius:1.13,orbit:36,period:52,desc:'ดาวยูเรนัสมีสีฟ้าเขียวและหมุนรอบตัวเองในลักษณะเอียงมาก',fact:'ชั้นบรรยากาศมีแก๊สมีเทนซึ่งช่วยให้เห็นสีฟ้าเขียว',prompt:'หาดาวสีฟ้าเขียวที่อยู่ถัดจากดาวเสาร์'},
  {name:'ดาวเนปจูน',kind:'ดาวเคราะห์ลำดับที่ 8',color:0x557bdb,radius:1.1,orbit:43,period:65,desc:'ดาวเนปจูนอยู่ไกลดวงอาทิตย์ที่สุดในกลุ่มดาวเคราะห์ทั้งแปด มีสีฟ้าเข้มและลมแรง',fact:'ดาวเนปจูนใช้เวลาประมาณ 165 ปีโลกในการโคจรรอบดวงอาทิตย์หนึ่งรอบ',prompt:'หมุนดูวงโคจรชั้นนอกสุด'}
];
const extras=[
  {name:'ดวงจันทร์',kind:'ดาวบริวารของโลก',color:0xbfc3ca,radius:.25,desc:'ดวงจันทร์เป็นดาวบริวารตามธรรมชาติของโลก มันโคจรรอบโลก และเราเห็นรูปร่างสว่างเปลี่ยนไปตามตำแหน่งที่แสงอาทิตย์ส่องถึง',fact:'ดวงจันทร์ไม่ได้เปล่งแสงเอง แต่สะท้อนแสงจากดวงอาทิตย์',prompt:'หมุนดูดวงจันทร์ที่อยู่ข้างโลก'},
  {name:'แถบดาวเคราะห์น้อย',kind:'วัตถุขนาดเล็กในระบบสุริยะ',color:0x9e9b96,radius:.35,desc:'ระหว่างวงโคจรของดาวอังคารกับดาวพฤหัสบดีมีดาวเคราะห์น้อยจำนวนมาก แต่ไม่ได้อยู่ชิดกันแน่นเหมือนกำแพงหิน',fact:'ดาวเคราะห์น้อยส่วนใหญ่ในระบบสุริยะอยู่บริเวณแถบหลักนี้',prompt:'ลองมองแถบจุดเล็ก ๆ ระหว่างดาวอังคารกับดาวพฤหัสบดี'},
  {name:'สะเก็ดดาวและอุกกาบาต',kind:'หินจากอวกาศ',color:0xaea8a0,radius:.22,desc:'เศษหินเล็ก ๆ ในอวกาศเรียกสะเก็ดดาว เมื่อเข้าสู่บรรยากาศและเห็นแสงเรียกดาวตก ถ้ามีชิ้นส่วนตกถึงพื้นโลกเรียกอุกกาบาต',fact:'ดาวตกไม่ใช่ดาวฤกษ์ที่ตกจากฟ้า',prompt:'ดูเศษหินใกล้โลก แล้วนึกถึงการเดินทางเข้าสู่บรรยากาศ'},
  {name:'ดาวหาง',kind:'วัตถุน้ำแข็งและฝุ่น',color:0xd0e9e8,radius:.46,desc:'ดาวหางประกอบด้วยน้ำแข็ง ฝุ่น และหิน เมื่อเข้าใกล้ดวงอาทิตย์จะเกิดกลุ่มก๊าซและฝุ่นที่มองเห็นเป็นหาง',fact:'หางของดาวหางมักชี้ออกจากดวงอาทิตย์',prompt:'มองหาหางสีฟ้าอ่อนที่ยื่นออกจากดวงอาทิตย์'},
  {name:'ดาวเทียม',kind:'วัตถุที่มนุษย์สร้าง',color:0x79b8e8,radius:.14,desc:'ดาวเทียมคือวัตถุที่มนุษย์ส่งขึ้นไปโคจรรอบโลก ใช้สื่อสาร สำรวจสภาพอากาศ และสังเกตโลก ภาพนี้เป็นดาวเทียมจำลอง ไม่ใช่ดาวเทียมดวงใดดวงหนึ่ง',fact:'ดาวเทียมวงโคจรต่ำเคลื่อนที่เร็วมาก ตัวอย่างสถานีอวกาศนานาชาติโคจรรอบโลกประมาณ 90 นาที',prompt:'ซูมเข้าไปที่โลกแล้วมองหาแผงสีน้ำเงินของดาวเทียม'},
  {name:'หลุมดำ',kind:'เรื่องน่ารู้นอกระบบสุริยะ',color:0x8f6bd0,radius:2,desc:'หลุมดำเป็นบริเวณในอวกาศที่แรงโน้มถ่วงสูงมากจนแสงจากภายในขอบเขตหนึ่งหนีออกมาไม่ได้ ภาพวงแสงนี้เป็นแบบจำลองเพื่ออธิบาย',fact:'ไม่มีหลุมดำอยู่ในระบบสุริยะของเรา วัตถุนี้แสดงในฉากแยกเพื่อการเรียนรู้',prompt:'สังเกตวงแสงรอบบริเวณมืด แล้วกลับไปดูระบบสุริยะ'}
];
const topics=[...bodies,...extras];
const planetMoonKeys=['Sun','Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'];
const moonPlanetLabels={Mercury:'ดาวพุธ',Venus:'ดาวศุกร์',Earth:'โลก',Mars:'ดาวอังคาร',Jupiter:'ดาวพฤหัสบดี',Saturn:'ดาวเสาร์',Uranus:'ดาวยูเรนัส',Neptune:'ดาวเนปจูน',Pluto:'พลูโต (ดาวเคราะห์แคระ)'};
const moonThai={Moon:'ดวงจันทร์',Phobos:'โฟบอส',Deimos:'ดีมอส',Io:'ไอโอ',Europa:'ยูโรปา',Ganymede:'แกนีมีด',Callisto:'คัลลิสโต',Titan:'ไททัน',Enceladus:'เอนเซลาดัส',Mimas:'ไมมัส',Rhea:'รีอา',Iapetus:'ไออาพิตัส',Titania:'ไททาเนีย',Oberon:'โอเบอรอน',Ariel:'แอเรียล',Umbriel:'อัมเบรียล',Miranda:'มิแรนดา',Triton:'ไทรทัน',Nereid:'เนรีด'};
const moonExamples={Earth:['Moon'],Mars:['Phobos','Deimos'],Jupiter:['Io','Europa','Ganymede','Callisto'],Saturn:['Titan','Enceladus','Rhea','Iapetus'],Uranus:['Miranda','Ariel','Titania','Oberon'],Neptune:['Triton','Nereid','Proteus']};
// NASA NSSDCA metric fact sheet: diameter (equatorial), mass, mean distance, orbital velocity, orbital and sidereal rotation periods.
const planetStats=[
  [['เส้นผ่านศูนย์กลาง','ประมาณ 1,391,400 กม.'],['มวล','1.9884 × 10³⁰ กก.'],['หมุนรอบตัวเอง','ประมาณ 25.4 วัน (ขึ้นกับละติจูด)'],['อุณหภูมิผิวที่มองเห็น','ประมาณ 5,500 °C']],
  [4879,.330,57.9,47.4,'88 วัน','58.6 วัน',3.7],
  [12104,4.87,108.2,35.0,'224.7 วัน','243 วัน (หมุนย้อนทิศ)',8.9],
  [12756,5.97,149.6,29.8,'365.2 วัน','23.9 ชั่วโมง',9.8],
  [6792,.642,228.0,24.1,'687 วัน','24.6 ชั่วโมง',3.7],
  [142984,1898,778.5,13.1,'11.86 ปี','9.9 ชั่วโมง',23.1],
  [120536,568,1432,9.7,'29.45 ปี','10.7 ชั่วโมง',9.0],
  [51118,86.8,2867,6.8,'84.02 ปี','17.2 ชั่วโมง (หมุนย้อนทิศ)',8.7],
  [49528,102,4515,5.4,'164.79 ปี','16.1 ชั่วโมง',11.0]
];
const nasaPlanet='https://nssdc.gsfc.nasa.gov/planetary/factsheet/';
function factsFor(i){if(i===0)return {rows:planetStats[0],url:'https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html'};
  if(i<9){const [diameter,mass,distance,speed,year,day,gravity]=planetStats[i];const key=planetMoonKeys[i],moons=moonCatalog.bodies[key]||[],examples=moonExamples[key]||[];const rows=[['เส้นผ่านศูนย์กลาง',diameter.toLocaleString('th-TH')+' กม.'],['มวล',mass.toLocaleString('th-TH')+' × 10²⁴ กก.'],['ระยะเฉลี่ยจากดวงอาทิตย์',distance.toLocaleString('th-TH')+' ล้าน กม.'],['ความเร็วโคจรเฉลี่ย',speed+' กม./วินาที'],['โคจรรอบดวงอาทิตย์',year],['หมุนรอบตัวเอง',day],['แรงโน้มถ่วง',gravity+' ม./วินาที²'],['ดวงจันทร์ที่รู้จัก',moons.length+' ดวง']];if(examples.length)rows.push(['ชื่อที่น่ารู้',examples.map(n=>moonThai[n]||n).join(', ')]);return {rows,url:nasaPlanet}}
  if(i===9)return {rows:[['เส้นผ่านศูนย์กลาง','3,475 กม.'],['มวล','0.073 × 10²⁴ กก.'],['ระยะเฉลี่ยจากโลก','384,000 กม.'],['ความเร็วโคจรรอบโลก','ประมาณ 1.0 กม./วินาที'],['โคจรรอบโลก','27.3 วัน'],['แรงโน้มถ่วง','1.6 ม./วินาที²']],url:nasaPlanet};
  const rows=[
    [['ตำแหน่ง','ระหว่างดาวอังคารกับดาวพฤหัสบดี'],['ขนาดและมวล','แตกต่างกันตามวัตถุแต่ละชิ้น']],
    [['ในอวกาศ','สะเก็ดดาว'],['เข้าสู่บรรยากาศและเห็นแสง','ดาวตก'],['ตกถึงพื้นโลก','อุกกาบาต']],
    [['องค์ประกอบ','น้ำแข็ง ฝุ่น และหิน'],['หาง','มักชี้ออกจากดวงอาทิตย์']],
    [['ประเภท','ดาวเทียมจำลองในวงโคจรต่ำ'],['ความสูงตัวอย่าง','ประมาณ 400 กม.'],['คาบโคจรตัวอย่าง','ประมาณ 90 นาที'],['ความเร็วตัวอย่าง','ประมาณ 7.7 กม./วินาที']],
    [['ตำแหน่ง','ไม่มีในระบบสุริยะของเรา'],['ขนาดและมวล','แตกต่างกันมากตามหลุมดำแต่ละแห่ง']]
  ];
  return {rows:rows[i-10],url:i===14?'https://science.nasa.gov/universe/black-holes/':i===13?'https://www.nasa.gov/missions/station/iss-research/observing-our-planet-from-low-earth-orbit/':'https://science.nasa.gov/asteroids-comets-meteors/'}
}
const $ = id => document.getElementById(id);
const host=$('space'),scene=new THREE.Scene();scene.background=null;
const camera=new THREE.PerspectiveCamera(55,1,.1,700);camera.position.set(0,55,83);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.8;
host.appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=1.1;controls.maxDistance=160;controls.maxPolarAngle=Math.PI-.08;controls.minPolarAngle=.08;
controls.enablePan=true;controls.screenSpacePanning=true;
scene.add(new THREE.AmbientLight(0xb5c7ea,.22));const sunLight=new THREE.PointLight(0xffe2aa,1000,170,1.5);scene.add(sunLight);
function rand(n){let x=Math.sin(n*127.1+78.233)*43758.5453;return x-Math.floor(x)}
function texture(index,b){const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');x.fillStyle='#'+b.color.toString(16).padStart(6,'0');x.fillRect(0,0,512,256);
  if(index===3){x.fillStyle='#14507e';x.fillRect(0,0,512,256);for(let n=0;n<28;n++){let px=rand(n+7)*512,py=rand(n+108)*256,r=10+rand(n+18)*38;x.fillStyle=n%4?'#488c59':'#bda47b';x.beginPath();x.ellipse(px,py,r,r*(.2+rand(n+58)*.4),rand(n+88)*3,0,Math.PI*2);x.fill()}for(let n=0;n<65;n++){x.fillStyle='#ffffff22';x.beginPath();x.ellipse(rand(n+401)*512,rand(n+601)*256,4+rand(n+501)*25,2+rand(n+301)*7,0,0,7);x.fill()}}
  else if(index===5||index===6||index===7||index===8){for(let y=0;y<256;y+=4){const v=Math.sin(y*.12)+Math.sin(y*.36)*.25;x.fillStyle=`rgba(${index===8?20:116},${index===8?48:76},${index===8?153:48},${.08+Math.abs(v)*.13})`;x.fillRect(0,y,512,2+Math.abs(v)*5)}if(index===5){x.fillStyle='#ac6655';x.beginPath();x.ellipse(340,152,30,12,-.15,0,7);x.fill()}}
  else{for(let n=0;n<1000;n++){let v=rand(n+index*139),px=rand(n*3+index)*512,py=rand(n*5+index)*256;x.fillStyle=v>.5?'#ffffff0d':'#20152c0b';x.beginPath();x.arc(px,py,.3+rand(n+90)*3,0,7);x.fill()}}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const objects=[],pickables=[];
bodies.forEach((b,i)=>{const pivot=new THREE.Group();scene.add(pivot);const holder=new THREE.Group();holder.position.x=b.orbit;pivot.add(holder);
  const material=i===0?new THREE.MeshBasicMaterial({map:texture(i,b),color:0xffbd72}):i===3?new THREE.MeshBasicMaterial({map:texture(i,b)}):new THREE.MeshStandardMaterial({map:texture(i,b),roughness:1,metalness:0});
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(b.radius,i===3?64:32,i===3?48:24),material);holder.add(mesh);mesh.userData.index=i;pickables.push(mesh);
  // Illuminate the sun directly without a rectangular billboard.
  if(i===0){material.color.setHex(0xffd484)}
  if(i===6){const ring=new THREE.Mesh(new THREE.RingGeometry(2.1,3.45,100),new THREE.MeshStandardMaterial({color:0xc9b88c,side:THREE.DoubleSide,transparent:true,opacity:.78,roughness:1}));ring.rotation.x=Math.PI/2-.18;holder.add(ring)}
  if(i===3){const moonOrbit=new THREE.Group();holder.add(moonOrbit);const moon=new THREE.Mesh(new THREE.SphereGeometry(.25,24,16),new THREE.MeshStandardMaterial({color:0xbfc3ca,roughness:1}));moon.position.set(1.65,.18,0);moonOrbit.add(moon);moon.userData.index=bodies.length;pickables.push(moon);holder.userData.moonOrbit=moonOrbit;holder.userData.moon=moon}
  if(i===3){const satOrbit=new THREE.Group();satOrbit.rotation.z=.32;holder.add(satOrbit);const satellite=new THREE.Group();satellite.position.x=1.18;satOrbit.add(satellite);const satBody=new THREE.Mesh(new THREE.BoxGeometry(.17,.13,.15),new THREE.MeshStandardMaterial({color:0xd5e4f2,metalness:.55,roughness:.4}));satellite.add(satBody);const panelMaterial=new THREE.MeshStandardMaterial({color:0x2764bb,metalness:.25,roughness:.48,side:THREE.DoubleSide});for(const side of [-1,1]){const panel=new THREE.Mesh(new THREE.BoxGeometry(.24,.015,.15),panelMaterial);panel.position.x=side*.25;satellite.add(panel);panel.userData.index=bodies.length+4;pickables.push(panel)}const antenna=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.18,6),new THREE.MeshStandardMaterial({color:0xe6e6e6}));antenna.position.y=.15;satellite.add(antenna);satBody.userData.index=bodies.length+4;pickables.push(satBody);holder.userData.satelliteOrbit=satOrbit;holder.userData.satellite=satellite;const satPath=new THREE.Mesh(new THREE.RingGeometry(1.175,1.18,96),new THREE.MeshBasicMaterial({color:0x73caff,transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}));satPath.rotation.x=Math.PI/2;satOrbit.add(satPath)}
  if(i>0){const points=[];for(let j=0;j<=150;j++){let a=j/150*Math.PI*2;points.push(new THREE.Vector3(Math.cos(a)*b.orbit,0,Math.sin(a)*b.orbit))}const path=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x385575,transparent:true,opacity:.55}));scene.add(path)}
  pivot.rotation.y=[0,1.4,3.3,5.3,2.4,4.2,1.1,3.9,5.9][i];objects.push({pivot,holder,mesh,b})});
// Representative moons are drawn larger and closer than scale so young learners can spot them.
const featuredMoonModels=[
  [4,'Phobos',.95,.085,0xb4aea2,.63],[4,'Deimos',1.2,.065,0xb9b5ab,.42],
  [5,'Io',2.45,.17,0xdac483,.32],[5,'Europa',2.8,.16,0xd8d2bb,.24],[5,'Ganymede',3.18,.2,0x9d9a91,.18],[5,'Callisto',3.55,.18,0x777976,.13],
  [6,'Mimas',3.7,.1,0xbdbbb1,.33],[6,'Enceladus',4.02,.12,0xe4e8e9,.29],[6,'Tethys',4.35,.12,0xd4d5d0,.24],[6,'Dione',4.65,.12,0xbebeb8,.21],[6,'Rhea',4.95,.14,0xc8c7bf,.17],[6,'Titan',5.3,.2,0xd7a86c,.12],[6,'Iapetus',5.62,.13,0x9c978b,.08],
  [7,'Miranda',1.72,.09,0xaeb7b8,.31],[7,'Ariel',1.94,.1,0xc8cfcb,.26],[7,'Umbriel',2.16,.1,0x909795,.21],[7,'Titania',2.43,.13,0xc0c5c0,.16],[7,'Oberon',2.7,.13,0xaaaead,.12],
  [8,'Triton',1.8,.16,0xd8d3c8,-.22],[8,'Nereid',2.2,.09,0xaebbc3,.14],[8,'Proteus',2.55,.09,0x848d92,.18]
];
const moonModels=featuredMoonModels.map(([parent,name,distance,radius,color,speed],n)=>{const orbit=new THREE.Group();orbit.rotation.y=n*2.399;orbit.rotation.z=(n%3-1)*.13;objects[parent].holder.add(orbit);const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius,18,12),new THREE.MeshStandardMaterial({color,roughness:1}));mesh.position.x=distance;mesh.userData.index=parent;orbit.add(mesh);pickables.push(mesh);return {parent,name,radius,speed,orbit,mesh}});
const solarMembers=scene.children.filter(o=>o!==sunLight&&o.type!=='AmbientLight');
const topicTargets=objects.map(o=>o.holder);
const earth=objects[3].holder;
new THREE.TextureLoader().load('./earth-blue-marble.jpg',map=>{map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=renderer.capabilities.getMaxAnisotropy();objects[3].mesh.material.map=map;objects[3].mesh.material.needsUpdate=true},undefined,()=>console.warn('Earth map unavailable; using fallback texture'));
function earthClouds(){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;
  const ctx=canvas.getContext('2d');
  // Soft cloud bands and a few spiral storm systems, drawn on a transparent globe.
  for(let i=0;i<145;i++){
    const x=rand(i*7+41)*1024,y=90+rand(i*11+13)*330;
    const width=18+rand(i*19+3)*100,height=3+rand(i*31+9)*13;
    const alpha=.025+rand(i*43+7)*.1;
    ctx.save();ctx.translate(x,y);ctx.rotate((rand(i*17+5)-.5)*.7);
    const glow=ctx.createRadialGradient(0,0,0,0,0,width);
    glow.addColorStop(0,`rgba(255,255,255,${alpha})`);glow.addColorStop(1,'rgba(255,255,255,0)');
    ctx.scale(1,height/width);ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,width,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  for(const [cx,cy,r,seed] of [[230,177,45,1],[680,264,53,2],[830,160,37,3],[450,325,34,4]]){
    for(let arm=0;arm<3;arm++){
      ctx.beginPath();
      for(let step=0;step<70;step++){
        const t=step/69,angle=arm*Math.PI*2/3+t*Math.PI*2.4+seed;
        const radius=r*(1-t),x=cx+Math.cos(angle)*radius*1.7,y=cy+Math.sin(angle)*radius*.75;
        if(step===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.strokeStyle='rgba(255,255,255,.10)';ctx.lineWidth=7;ctx.shadowColor='white';ctx.shadowBlur=16;ctx.stroke();ctx.shadowBlur=0;
    }
    ctx.fillStyle='rgba(220,239,255,.34)';ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();
  }
  const cloudTexture=new THREE.CanvasTexture(canvas);cloudTexture.colorSpace=THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.SphereGeometry(.794,64,48),new THREE.MeshBasicMaterial({map:cloudTexture,transparent:true,depthWrite:false,side:THREE.DoubleSide,opacity:.9}));
}
const cloudShell=earthClouds();earth.add(cloudShell);
topicTargets.push(earth.userData.moon);
const rocks=[];for(let i=0;i<650;i++){const a=rand(i+909)*Math.PI*2,r=18.3+rand(i+1909)*2.4;rocks.push(Math.cos(a)*r,(rand(i+2909)-.5)*.45,Math.sin(a)*r)}
const beltGeo=new THREE.BufferGeometry();beltGeo.setAttribute('position',new THREE.Float32BufferAttribute(rocks,3));const belt=new THREE.Points(beltGeo,new THREE.PointsMaterial({color:0xa9a8a0,size:.13,sizeAttenuation:true}));scene.add(belt);solarMembers.push(belt);
const beltMarker=new THREE.Mesh(new THREE.IcosahedronGeometry(.32,1),new THREE.MeshStandardMaterial({color:0xaaa7a1,roughness:1}));beltMarker.position.set(19.4,.15,0);scene.add(beltMarker);beltMarker.userData.index=bodies.length+1;pickables.push(beltMarker);solarMembers.push(beltMarker);topicTargets.push(beltMarker);
const fragment=new THREE.Mesh(new THREE.IcosahedronGeometry(.22,0),new THREE.MeshStandardMaterial({color:0xa9a6a0,roughness:1}));fragment.position.set(13.8,.4,1.6);scene.add(fragment);fragment.userData.index=bodies.length+2;pickables.push(fragment);solarMembers.push(fragment);topicTargets.push(fragment);
const comet=new THREE.Group();comet.position.set(-13,1,-13);const nucleus=new THREE.Mesh(new THREE.IcosahedronGeometry(.45,1),new THREE.MeshStandardMaterial({color:0xbad2d5,roughness:1}));comet.add(nucleus);nucleus.userData.index=bodies.length+3;pickables.push(nucleus);
const tail=new THREE.Mesh(new THREE.ConeGeometry(.65,5.5,24,1,true),new THREE.MeshBasicMaterial({color:0x78cfe5,transparent:true,opacity:.2,side:THREE.DoubleSide,depthWrite:false}));tail.rotation.z=-Math.PI/2;tail.position.x=-3;comet.add(tail);scene.add(comet);solarMembers.push(comet);topicTargets.push(comet);topicTargets.push(earth.userData.satellite);
const blackHole=new THREE.Group();const centerHole=new THREE.Mesh(new THREE.SphereGeometry(1.85,48,32),new THREE.MeshBasicMaterial({color:0x000000}));blackHole.add(centerHole);const disk=new THREE.Mesh(new THREE.RingGeometry(2.25,4.1,128),new THREE.MeshBasicMaterial({color:0xe9a651,side:THREE.DoubleSide,transparent:true,opacity:.85}));disk.rotation.x=Math.PI/2-.23;blackHole.add(disk);const innerRing=new THREE.Mesh(new THREE.TorusGeometry(2.05,.06,8,100),new THREE.MeshBasicMaterial({color:0xffdba1}));blackHole.add(innerRing);blackHole.visible=false;scene.add(blackHole);topicTargets.push(blackHole);
const stars=[];for(let i=0;i<1800;i++){const a=rand(i*3)*Math.PI*2,z=rand(i*3+1)*2-1,r=Math.sqrt(1-z*z),d=130+rand(i*3+2)*80;stars.push(Math.cos(a)*r*d,z*d,Math.sin(a)*r*d)}const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xcbdfff,size:.45,sizeAttenuation:true,transparent:true,opacity:.8})));
function resize(){let w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;if(window.innerWidth>900&&!document.querySelector('.layout').classList.contains('panel-collapsed'))camera.setViewOffset(w,h,Math.round(w*.13),0,w,h);else camera.clearViewOffset();camera.updateProjectionMatrix();renderer.setSize(w,h)}new ResizeObserver(resize).observe(host);window.addEventListener('solar-panel-toggle',resize);resize();
let selected=0,running=true,zoomLevel=1,baseDistance=100,follow=false;const raycaster=new THREE.Raycaster(),mouse=new THREE.Vector2();
let labelsVisible=true;const labels=topics.map((topic,i)=>{const el=document.createElement('span');el.className='space-label';el.textContent=topic.name;$('labels').append(el);return el});
const moonLabels=moonModels.map(m=>{const el=document.createElement('span');el.className='space-label moon-space-label';el.textContent=moonThai[m.name]?moonThai[m.name]+' ('+m.name+')':m.name;$('labels').append(el);return el});
function updateLabels(){const width=host.clientWidth,height=host.clientHeight;labels.forEach((el,i)=>{const show=labelsVisible&&(selected!==topics.length-1?i<topics.length-1:i===topics.length-1);if(!show){el.style.display='none';return}const target=topicTargets[i],point=target.getWorldPosition(new THREE.Vector3());point.y+=(topics[i].radius||.3)+.5;const inFront=point.clone().sub(camera.position).dot(camera.getWorldDirection(new THREE.Vector3()))>0;const projected=point.project(camera);const x=(projected.x*.5+.5)*width,y=(-projected.y*.5+.5)*height;el.style.display=inFront&&projected.z<1&&x>26&&x<width-26&&y>35&&y<height-55?'block':'none';el.style.left=x+'px';el.style.top=y+'px';el.classList.toggle('selected',selected===i)});moonModels.forEach((m,i)=>{const el=moonLabels[i];if(!labelsVisible||selected!==m.parent||camera.position.distanceTo(controls.target)>23){el.style.display='none';return}const point=m.mesh.getWorldPosition(new THREE.Vector3());point.y+=m.radius+.1;const projected=point.project(camera),x=(projected.x*.5+.5)*width,y=(-projected.y*.5+.5)*height;el.style.display=projected.z<1&&x>45&&x<width-45&&y>35&&y<height-65?'block':'none';el.style.left=x+'px';el.style.top=y+'px'})}
function choose(i,focus=false){selected=(i+topics.length)%topics.length;const b=topics[selected],isBlackHole=selected===topics.length-1;solarMembers.forEach(o=>o.visible=!isBlackHole);blackHole.visible=isBlackHole;$('name').textContent=b.name;$('kind').textContent=b.kind;$('desc').textContent=b.desc;$('fact').textContent=b.fact;$('heroName').textContent=selected===0?'แผนที่ระบบสุริยะ':b.name;$('heroKind').textContent=selected===0?'เลือกดาวเพื่อเริ่มสำรวจ':b.kind;$('prompt').textContent=b.prompt;$('thumb').style.background=selected===3?'url("./earth-blue-marble.jpg") center / auto 100% no-repeat':`radial-gradient(circle at 33% 28%,#ffffffaa,#${b.color.toString(16).padStart(6,'0')} 42%,#182846 90%)`;
  const data=factsFor(selected);$('stats').replaceChildren(...data.rows.map(([title,value])=>{const item=document.createElement('div');item.className='stat';const heading=document.createElement('strong'),content=document.createElement('span');heading.textContent=title;content.textContent=value;item.append(heading,content);return item}));$('source').href=data.url;
  document.querySelectorAll('#nav button, #extraNav button').forEach((el,n)=>{el.classList.toggle('active',n===selected);el.setAttribute('aria-current',n===selected?'true':'false')});if(focus){follow=!isBlackHole;let point=topicTargets[selected].getWorldPosition(new THREE.Vector3());controls.target.copy(point);let dist=isBlackHole?11:Math.max(selected===3||selected===13?2.5:3.8,b.radius*5.5);if(selected===3||selected===13){const earthPoint=earth.getWorldPosition(new THREE.Vector3());const sunlight=earthPoint.clone().multiplyScalar(-1).normalize();camera.position.copy(point).addScaledVector(sunlight,dist*1.35).add(new THREE.Vector3(0,dist*.35,0))}else camera.position.copy(point).add(new THREE.Vector3(dist*.8,dist*.55,dist));baseDistance=camera.position.distanceTo(point);zoomLevel=1;$('zoom').value=1;$('zoomText').textContent='100%';controls.update();$('viewName').textContent=isBlackHole?'นอกระบบสุริยะ: หลุมดำ':'กำลังดู'+b.name}render()}
topics.forEach((b,i)=>{const button=document.createElement('button');button.textContent=b.name;button.onclick=()=>choose(i,true);$(i<bodies.length?'nav':'extraNav').append(button)});
function zoom(v){zoomLevel=Math.min(5,Math.max(.5,+v));$('zoom').value=zoomLevel;$('zoomText').textContent=Math.round(zoomLevel*100)+'%';const direction=camera.position.clone().sub(controls.target).normalize();camera.position.copy(controls.target).addScaledVector(direction,Math.max(selected===3||selected===13?1.2:3,baseDistance/zoomLevel));controls.update();render()}
$('minus').onclick=()=>zoom(zoomLevel-.2);$('plus').onclick=()=>zoom(zoomLevel+.2);$('zoom').oninput=e=>zoom(e.target.value);
$('reset').onclick=()=>{follow=false;if(selected===topics.length-1)choose(0);controls.target.set(0,0,0);camera.position.set(0,55,83);baseDistance=100;zoomLevel=1;$('zoom').value=1;$('zoomText').textContent='100%';$('viewName').textContent='มุมมอง 3 มิติ';controls.update();render()};
$('focus').onclick=()=>choose(selected,true);$('prev').onclick=()=>choose(selected-1,true);$('next').onclick=()=>choose(selected+1,true);$('motion').onclick=()=>{running=!running;$('motion').textContent=running?'หยุดการโคจร':'เล่นการโคจร';$('motion').setAttribute('aria-pressed',String(running))};
$('toggleLabels').onclick=()=>{labelsVisible=!labelsVisible;$('toggleLabels').textContent=labelsVisible?'ซ่อนชื่อดาว':'แสดงชื่อดาว';$('toggleLabels').setAttribute('aria-pressed',String(labelsVisible));updateLabels()};
let down=null;renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY}});renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){down=null;return}down=null;const rect=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(mouse,camera);let hits=raycaster.intersectObjects(pickables);if(hits[0])choose(hits[0].object.userData.index,true)});
const moonKeys=['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
function renderMoonCatalog(){const query=$('moonSearch').value.trim().toLocaleLowerCase(),container=$('moonCatalogList');container.replaceChildren();let matches=0;for(const key of moonKeys){const all=moonCatalog.bodies[key],planet=moonPlanetLabels[key],planetMatch=planet.toLocaleLowerCase().includes(query)||key.toLowerCase().includes(query);const found=query&&!planetMatch?all.filter(m=>[m.name,moonThai[m.name]||''].some(t=>t.toLocaleLowerCase().includes(query))):all;if(query&&!planetMatch&&!found.length)continue;matches+=found.length;const detail=document.createElement('details');detail.className='moon-group';detail.open=!!query||key==='Earth'||key==='Mars';const summary=document.createElement('summary');summary.textContent=planet+' — '+all.length+' ดวง'+(query&&found.length!==all.length?' (ตรงคำค้น '+found.length+')':'');detail.append(summary);if(!all.length){const empty=document.createElement('p');empty.textContent='ไม่มีดวงจันทร์บริวารที่รู้จัก';detail.append(empty)}else{const list=document.createElement('ol');list.className='moon-names';for(const moon of found){const item=document.createElement('li');item.textContent=moonThai[moon.name]?moonThai[moon.name]+' ('+moon.name+')':moon.name;if(!moon.named)item.title='ยังไม่มีชื่อสามัญ ใช้รหัสชั่วคราว';list.append(item)}detail.append(list)}container.append(detail)}$('moonMatchCount').textContent=query?'พบ '+matches+' รายการ':'รวม '+moonKeys.reduce((total,key)=>total+moonCatalog.bodies[key].length,0)+' ดวง (รวมพลูโต)'}
$('moonSearch').addEventListener('input',renderMoonCatalog);renderMoonCatalog();
const answers=['ดาวอังคาร','โลก','ดาวเสาร์'];answers.forEach((answer,i)=>{let button=document.createElement('button');button.textContent=answer;button.onclick=()=>$('feedback').textContent=i===1?'ถูกต้อง! โลกเป็นบ้านของเรา 🌍':'ลองอีกครั้ง มองหาดาวเคราะห์ลำดับที่ 3';$('answers').append(button)});
const clock=new THREE.Clock();function render(){renderer.render(scene,camera);updateLabels()}function animate(){requestAnimationFrame(animate);const delta=Math.min(clock.getDelta(),.05);if(running){objects.forEach((o,i)=>{if(i>0)o.pivot.rotation.y+=delta*.21*12/o.b.period;o.mesh.rotation.y+=delta*(i===0?.12:.4)});cloudShell.rotation.y+=delta*.43;earth.userData.moonOrbit.rotation.y+=delta*.24;earth.userData.satelliteOrbit.rotation.y+=delta*.75;moonModels.forEach(m=>m.orbit.rotation.y+=delta*m.speed);disk.rotation.z+=delta*.08}if(follow){const newTarget=topicTargets[selected].getWorldPosition(new THREE.Vector3());camera.position.add(newTarget.clone().sub(controls.target));controls.target.copy(newTarget)}controls.update();render()}choose(0);animate();
