// إعداد المشهد 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// إعداد المحرك (Renderer)
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// تحديد خلفية السماء
scene.background = new THREE.Color(0x1e2a47);  // السماء الزرقاء

// إضافة النجوم
const starGeometry = new THREE.BufferGeometry();
const starCount = 3000; // عدد النجوم
const starVertices = [];

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 500;
  const y = (Math.random() - 0.5) * 500;
  const z = (Math.random() - 0.5) * 500;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, sizeAttenuation: true });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// إضافة الشهب
const meteorGeometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 4);
const meteorMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const meteors = [];

for (let i = 0; i < 400; i++) {
  const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
  meteor.position.set(
    (Math.random() - 0.5) * 1000,
    Math.random() * 500 + 500,
    (Math.random() - 0.5) * 1000
  );
  scene.add(meteor);
  meteors.push(meteor);
}

// دالة التحريك
function animate() {
  requestAnimationFrame(animate);

  stars.rotation.x += 0.001;  // حركة النجوم
  stars.rotation.y += 0.001;

  meteors.forEach(meteor => {
    meteor.position.y -= 2;  // تحريك الشهب للأسفل
    if (meteor.position.y < -500) {
      meteor.position.y = Math.random() * 500 + 500;
      meteor.position.x = (Math.random() - 0.5) * 1000;
      meteor.position.z = (Math.random() - 0.5) * 1000;
    }
  });

  renderer.render(scene, camera);
}
animate();

// تحديث حجم النافذة
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// مراقبة ظهور البطاقات عند التمرير
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;

      if (entry.isIntersecting) {
        card.classList.add("show");
      } else {
        card.classList.remove("show"); // إزالة الكلاس لإعادة تشغيل الأنيميشن لاحقاً
      }
    });
  }, {
    threshold: 0.1 // التفعيل عندما يظهر 40% من البطاقة
  });

  cards.forEach(card => observer.observe(card));
});

(function () {
  emailjs.init("VY9_5DOedqph4ffu0");
})();

const promoCodes = [
  "12389", "190876", "560943", "539088", "439081"
];

function toggleForm() {
  const formBox = document.getElementById("formBox");
  formBox.style.display = formBox.style.display === "flex" ? "none" : "flex";
}

function submitForm() {
  const email = document.getElementById("email").value.trim();
  const promo = document.getElementById("promo").value.trim();

  clearMessages();

  if (!validateEmail(email)) {
    showMessage("Email not accepted", "error", "email");
    return;
  }

  if (!promoCodes.includes(promo)) {
    showMessage("Error code", "error", "promo");
    return;
  }

  const templateParams = {
    user_email: email,
    promo_code: promo
  };

  emailjs.send("service_avr4gxo", "template_w27eyqq", templateParams)
    .then(() => {
      showMessage("Order Accepted", "success", "email");
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      showMessage("Something went wrong", "error", "email");
    });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(message, type, target) {
  const input = document.getElementById(target);
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = message;
  input.parentNode.insertBefore(msg, input);
}

function clearMessages() {
  const messages = document.querySelectorAll(".message");
  messages.forEach(msg => msg.remove());
}
function createRollingMoon() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

}
function createRollingMoon() {
  const scene = new THREE.Scene();

  // إعداد الكاميرا
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // إعداد المُنشئ (renderer) مع الشفافية في الخلفية
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('moonCanvas'),
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // خلفية شفافة

  // إضافة إضاءة للمشهد
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x888888)); // إضاءة محيطية

  // إنشاء الكرة (القمر) باستخدام خامة مادية لجعلها شبيهة بالقمر
  const geometry = new THREE.SphereGeometry(1, 64, 64); // دقة عالية
  const material = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,  // اللون الرمادي القريب من لون القمر
    roughness: 0.7,
    metalness: 0.1
  });
  const moon = new THREE.Mesh(geometry, material);
  scene.add(moon);

  // إضافة عينين (كرات صغيرة) على القمر
  const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32); // كرة صغيرة للعين
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // اللون الأسود للعين

  // العين اليسرى
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.3, 0.3, 0.9); // موقع العين اليسرى على القمر
  moon.add(leftEye);

  // العين اليمنى
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.3, 0.3, 0.9); // موقع العين اليمنى على القمر
  moon.add(rightEye);

  // إضافة الابتسامة باستخدام منحنى (ArcCurve)
  const smileCurve = new THREE.ArcCurve(0, 0, 0.6, Math.PI / 4, Math.PI * 3 / 4); // منحنى الابتسامة
  const smilePoints = smileCurve.getPoints(50); // تحديد عدد النقاط لرسم الابتسامة

  const smileGeometry = new THREE.BufferGeometry().setFromPoints(smilePoints);
  const smileMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }); // لون الابتسامة أسود

  const smileLine = new THREE.Line(smileGeometry, smileMaterial);
  smileLine.position.set(0, -0.4, 1); // تحديد موقع الابتسامة على القمر
  moon.add(smileLine);

  // متغيرات حركة العين والابتسامة
  let leftEyeDirection = 1;
  let rightEyeDirection = -1;
  let smileCurveOffset = 0;

  let direction = 1;

  // دالة الأنيميشن لتحريك الكرة والملامح
  function animate() {
    requestAnimationFrame(animate);
    
    // حركة الكرة
    moon.rotation.y += 0.070; // دوران الكرة
    moon.position.x += 0.040 * direction; // تحريك الكرة إلى اليسار واليمين
    if (moon.position.x > 3 || moon.position.x < -3) direction *= -1;

    // حركة العينين (تحريك العينين بشكل خفيف)
    leftEye.position.y += 0.01 * leftEyeDirection;
    rightEye.position.y += 0.01 * rightEyeDirection;

    // تغيير اتجاه حركة العينين عندما تصل إلى الحد الأعلى أو الأدنى
    if (leftEye.position.y > 0.4 || leftEye.position.y < 0.2) leftEyeDirection *= -1;
    if (rightEye.position.y > 0.4 || rightEye.position.y < 0.2) rightEyeDirection *= -1;

    // تعديل الابتسامة بشكل ديناميكي (تغيير قليلاً كل مرة)
    smileCurveOffset += 0.02;
    const dynamicSmileCurve = new THREE.ArcCurve(0, 0, 0.6, Math.PI / 4 + Math.sin(smileCurveOffset) * 0.1, Math.PI * 3 / 4 + Math.cos(smileCurveOffset) * 0.1);
    const dynamicSmilePoints = dynamicSmileCurve.getPoints(50);
    smileGeometry.setFromPoints(dynamicSmilePoints);

    renderer.render(scene, camera);
  }

  animate();

  // التفاعل مع تغيير حجم الشاشة
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

window.addEventListener('DOMContentLoaded', createRollingMoon);
