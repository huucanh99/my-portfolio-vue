<!-- src/views/HomePage.vue -->
<template>
  <section class="content-wrapper">
    <!-- Avatar -->
    <div class="homepage-logo-container">
      <div
        ref="avatarBox"
        class="avatar sticky-avatar"
        :class="{ stuck: isStuck }"
      >
        <img class="logo" v-if="avatar" :src="avatar" alt="Avatar" />
      </div>
    </div>

    <!-- Hero -->
    <div class="homepage-container">
      <div class="homepage-first-area">
        <div class="homepage-first-area-left-side">
          <h1 class="title homepage-title">
            AIoT & Machine Vision Researcher specializing in Automated Optical Inspection (AOI).
          </h1>

          <p class="subtitle homepage-subtitle">
            I am a researcher at the Machine Vision Laboratory (STUST), focusing on automated optical inspection (AOI),
            digital image processing, and AIoT smart manufacturing systems. My work involves developing intelligent visual
            inspection solutions, integrating machine vision, opto-mechatronics, industrial IoT, and deep learning to
            improve production quality and efficiency. I also explore applications such as PCB inspection, optical
            metrology, digital-twin predictive maintenance, and biomedical imaging. I am passionate about building
            practical AI-driven systems that connect research with real-world smart factory applications.
          </p>
        </div>

        <!-- Right: hero image -->
        <div class="homepage-first-area-right-side">
          <div class="homepage-image-container">
            <div class="homepage-image-wrapper">
              <img v-if="hero" :src="hero" alt="Hero image" class="homepage-image" />
            </div>
          </div>
        </div>
      </div>

      <!-- Socials -->
      <div class="homepage-socials">
        <a
          v-for="icon in icons"
          :key="icon.label"
          :href="icon.href"
          target="_blank"
          rel="noreferrer"
          :aria-label="icon.label"
        >
          <font-awesome-icon :icon="icon.icon" class="homepage-social-icon" />
        </a>
      </div>
    </div>

    <!-- Projects -->
    <div class="homepage-projects">
      <div class="all-projects-container">
        <div
          class="all-projects-project"
          v-for="project in paginatedProjects"
          :key="project.id"
        >
          <div class="project">
            <a :href="project.href || '#'" target="_blank" rel="noreferrer">
              <div class="project-container">
                <div class="project-logo">
                  <img v-if="javaImg" :src="javaImg" alt="JavaScript" />
                </div>
                <div class="project-title">{{ project.title }}</div>
                <div class="project-description">
                  {{ project.description }}
                </div>
                <div class="project-link">
                  <div class="project-link-icon">
                    <font-awesome-icon :icon="['fas', 'link']" />
                  </div>
                  <div class="project-link-text">View Project</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Pagination: chỉ hiện khi có >= 6 project -->
      <div class="projects-pagination" v-if="projects.length > 6 && totalPages > 1">
        <button
          class="page-btn"
          type="button"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          Prev
        </button>

        <span class="page-info">
          Page {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          class="page-btn"
          type="button"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Articles + Works -->
    <div class="after-title">
      <div class="col-left">
        <ArticlesList :items="articles" />
      </div>
      <div class="col-right">
        <WorksCard :items="works" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ArticlesList from '@/components/home/ArticlesList.vue'
import WorksCard from '@/components/home/WorksCard.vue'
import heroImg from '@/assets/images/homepage.jpg'
import avatarImg from '@/assets/images/logoP.png'
import java from '@/assets/images/javascript.png'
import { useI18n } from 'vue-i18n'
import fbLogo from '@/assets/images/facebook.png'
import twLogo from '@/assets/images/twitter.png'

const { t } = useI18n()
const hero = heroImg
const avatar = avatarImg
const javaImg = java

// ==== Projects data (7 project để có phân trang) ====
const projects = ref([
  {
    id: 1,
    title: 'AOI Visual Defect Inspection',
    description:
      'Automated optical inspection system for detecting scratches, dents, and surface defects on industrial products...',
    href: '#'
  },
  {
    id: 2,
    title: 'PCB Inspection & OCR Checking',
    description:
      'Intelligent PCB inspection pipeline that performs component checking, line continuity verification, and OCR reading...',
    href: '#'
  },
  {
    id: 3,
    title: 'AIoT Smart Manufacturing Demo Line',
    description:
      'Modular smart factory line integrating transport, cobot control, 2D/3D vision, and real-time data visualization...',
    href: '#'
  },
  {
    id: 4,
    title: 'Digital Twin & Predictive Maintenance',
    description:
      'Digital twin of production equipment using IIoT data to monitor health status and predict failures before downtime...',
    href: '#'
  },
  {
    id: 5,
    title: 'Self-Supervised Anomaly Detection',
    description:
      'Few-shot anomaly detection framework that learns normal patterns and spots rare defects with minimal labeled data...',
    href: '#'
  },
  {
    id: 6,
    title: 'Biomedical Image Analysis Platform',
    description:
      'Image analysis tools for monitoring cell growth and drug-response effects using deep learning and time-series imaging...',
    href: '#'
  },
  {
    id: 7,
    title: 'ROS-based AMR/AGV Navigation System',
    description:
      'ROS-powered autonomous mobile robot and AGV control system for safe navigation and task execution in smart factories...',
    href: '#'
  }
])

const pageSize = ref(6) // số project mỗi trang (giữ layout cũ: 3 trên 2 dưới)
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.ceil(projects.value.length / pageSize.value)
)

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return projects.value.slice(start, start + pageSize.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// ---- Sticky → Fixed avatar logic ----
const isStuck = ref(false)
const avatarBox = ref(null)
const initialTop = ref(0)

const NAV_TOP = 16
const NAV_HEIGHT = 40
const NAV_GAP = 12
const STICKY_TOP = NAV_TOP + NAV_HEIGHT + NAV_GAP

const onScroll = () => {
  isStuck.value = window.scrollY + STICKY_TOP >= initialTop.value - 1
}

onMounted(() => {
  if (avatarBox.value) {
    const rect = avatarBox.value.getBoundingClientRect()
    initialTop.value = rect.top + window.scrollY
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const articles = [
  {
    date: '7 May 2023',
    title: 'The Benefits of Cloud Computing',
    desc: 'Cloud computing offers a range of benefits, including cost savings and increased flexibility.',
    href: '#'
  },
  {
    date: '7 May 2023',
    title: 'Artificial Intelligence in Healthcare',
    desc: 'AI is transforming the healthcare industry, from improving patient outcomes to streamlining operations.',
    href: '#'
  }
]

const works = [
  { company: 'Facebook', role: 'Software Engineer', time: '2019 - Present', logo: fbLogo },
  { company: 'Twitter',  role: 'Software Engineer', time: '2019 - Present', logo: twLogo }
]

const icons = [
  { label: 'Twitter', href: 'https://twitter.com', icon: ['fab', 'twitter'] },
  { label: 'Github', href: 'https://github.com', icon: ['fab', 'github'] },
  { label: 'StackOverflow', href: 'https://stackoverflow.com', icon: ['fab', 'stack-overflow'] },
  { label: 'Instagram', href: 'https://instagram.com', icon: ['fab', 'instagram'] },
  { label: 'Mail', href: 'mailto:you@example.com', icon: ['fas', 'mail-bulk'] }
]
</script>

<style scoped>
.after-title{
  display:grid;
  grid-template-columns: minmax(0, 1fr) 520px;
  gap: 36px;
  margin-top: 24px;
}
@media (max-width: 1024px){
  .after-title{ grid-template-columns: 1fr; }
}

.content-wrapper{
  margin: 0 auto;
  max-width: 1000px;
}

/* ========== AVATAR ========== */
.homepage-logo-container{
  display: flex;
  align-items: center;
  justify-content: left;
  padding-top: 130px;
}

/* Khối bọc avatar (div) – chỉ thay đổi position khi stuck */
.sticky-avatar{
  position: relative;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: position .2s ease;
}

/* Khi stuck: dính cố định */
.sticky-avatar.stuck{
  position: fixed;
  top: 4vh;
  left: 18.5%;
  transform: translateX(-50%);
}

/* Ảnh logo: chính nó đổi kích thước */
.logo{
  width: 60px;
  height: 80px;
  border-radius: 50%;
  display: block;
  transition:
    width .18s ease,
    height .18s ease,
    box-shadow .18s ease,
    border-color .18s ease;
  border: none;
  box-shadow: none;
}

/* Khi stuck → img nhỏ lại 40.4px + border + shadow */
.sticky-avatar.stuck .logo{
  width: 40.4px;
  height: 40.4px;
  border: 1px solid #fff;
  box-shadow: 0 6px 18px rgba(0,0,0,.12);
}

/* ========== HERO ========== */
.homepage-container { margin-top: -20px; }
.homepage-first-area { display:flex; justify-content:space-between; align-items:center; }
.homepage-first-area-left-side{ display:flex; flex-direction:column; align-items:flex-start; }

.title{
  color: var(--primary-color);
  font-family: var(--secondary-font);
  font-size: 45px; font-weight: 700; width: 70%;
}
.subtitle{
  color: var(--secondary-color);
  font-size: 16px; line-height: 28px;
  margin-top: 25px; padding-top: 10px; width: 70%;
}
.homepage-title, .homepage-subtitle{ width: 85% !important; }

.homepage-first-area-right-side{ display:flex; align-items:center; }
.homepage-image-container{ width:370px; height:370px; }
.homepage-image-wrapper{ overflow:hidden; border-radius:10%; transform: rotate(3deg); }
.homepage-image{ width:100%; display:block; }

/* ========== SOCIALS ========== */
.homepage-socials{ display:flex; justify-content:left; align-items:center; padding-top:30px; }
.homepage-social-icon{ font-size:25px; color:var(--secondary-color); margin-right:10px; transition:color .2s; }
.homepage-social-icon:hover{ color: var(--primary-color); }

/* ========== PROJECTS ========== */
.homepage-projects{ padding-top:30px; }
.all-projects-container{
  display:flex; flex-wrap:wrap; align-items:stretch;
  margin-left:-35px; margin-right:-35px; padding:30px 0;
}
.all-projects-project{ box-sizing:border-box; overflow:hidden; padding:10px; width:33.3333%; }
.project{
  height:100%; border-radius:20px; mix-blend-mode:normal; opacity:.8;
  transition: background-color .3s ease-in-out, opacity .2s ease-in-out;
}
.project:hover .project-link { color: #10b981; }
.project:hover{ background:#fafafa; opacity:1; }
.project a{ text-decoration:none; color:inherit; }
.project-container{ padding:30px; }
.project-logo{ width:30px; }
.project-logo img{ width:100%; display:block; }
.project-title{
  color: var(--primary-color);
  font-family: var(--secondary-font);
  font-size:16px; font-weight:700; padding-top:15px; margin-bottom:1em;
}
.project-description, .project-link{ color: var(--secondary-color); }
.project-link{ display:flex; align-items:center; font-size:12px; padding-top:20px; gap:8px; }

/* Pagination */
.projects-pagination{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 0 10px 20px;
  font-size: 14px;
}
.page-btn{
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 4px 12px;
  background: #ffffff;
  cursor: pointer;
  font-size: 13px;
}
.page-btn:disabled{
  opacity: 0.5;
  cursor: default;
}
.page-info{
  color: var(--secondary-color);
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1024px){
  .homepage-first-area{ flex-direction:column; }
  .homepage-first-area-right-side{ width:100%; order:2; }
  .homepage-first-area-left-side{ width:100%; order:1; }
  .homepage-image-container{ margin-top:24px; }
  .all-projects-project{ width:50%; }
}
@media (max-width: 640px){
  .title, .subtitle{ width:100%; }
  .all-projects-project{ width:100%; }
}
</style>
