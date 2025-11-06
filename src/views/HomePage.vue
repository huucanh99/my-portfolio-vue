  <!-- src/views/HomePage.vue -->
  <template>
    <section class="content-wrapper">
      <!-- Avatar nhỏ: sticky → fixed khi chạm nav -->
      <div
        ref="avatarBox"
        class="homepage-logo-container sticky-avatar"
        :class="{ stuck: isStuck }"
      >
        <div class="avatar">
          <img class="logo" v-if="avatar" :src="avatar" alt="Avatar" />
        </div>
      </div>

      <!-- Hero -->
      <div class="homepage-container">
        <div class="homepage-first-area">
          <div class="homepage-first-area-left-side">
            <h1 class="title homepage-title">
              Full-stack web and mobile
              app developer, and
              amateur astronaut.
            </h1>

            <p class="subtitle homepage-subtitle">
              I am a backend developer with expertise in Node.js. I have experience in
              building scalable, secure and reliable web applications using various
              frameworks and technologies. I enjoy solving complex problems and
              learning new skills. I am passionate about creating high-quality code
              that follows best practices and industry standards. I am always looking
              for new challenges and opportunities to grow as a developer.
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
          <div class="all-projects-project" v-for="i in 5" :key="i">
            <div class="project">
              <a href="#">
                <div class="project-container">
                  <div class="project-logo">
                    <img v-if="javaImg" :src="javaImg" alt="JavaScript" />
                  </div>
                  <div class="project-title">Project {{ i }}</div>
                  <div class="project-description">
                    Lorem ipsum dolor sit amet. Et incidunt voluptatem ex tempore repellendus qui dicta nemo sit deleniti minima.
                  </div>
                  <div class="project-link">
                    <div class="project-link-icon">
                      <font-awesome-icon :icon="['fas','link']" />
                    </div>
                    <div class="project-link-text">View Project</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
        <!-- === BLOCK BỊ THIẾU (thêm lại) === -->
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
  import { ref, onMounted, onUnmounted } from 'vue'
  import ArticlesList from '@/components/home/ArticlesList.vue'
  import WorksCard from '@/components/home/WorksCard.vue'
  import heroImg from '@/assets/images/homepage.jpg'
  import avatarImg from '@/assets/images/logo.png'
  import java from '@/assets/images/javascript.png'
  import { useI18n } from 'vue-i18n'
  import fbLogo from '@/assets/images/facebook.png'
  import twLogo from '@/assets/images/twitter.png'
  const { t } = useI18n()
  const hero = heroImg
  const avatar = avatarImg
  const javaImg = java

  // ---- Sticky → Fixed avatar logic ----
  const isStuck = ref(false)
  const avatarBox = ref(null)
  const initialTop = ref(0)

  // Tham số khớp với NavBar (đang fixed)
  // Nếu bạn đổi CSS NavBar (top/height), cập nhật 3 số này cho khớp
  const NAV_TOP = 16        // top của NavBar so với viewport
  const NAV_HEIGHT = 40     // chiều cao NavBar
  const NAV_GAP = 12        // khoảng cách giữa Nav và avatar khi dính

  const STICKY_TOP = NAV_TOP + NAV_HEIGHT + NAV_GAP

  const onScroll = () => {
    // bật 'stuck' khi mép trên viewport + stickyTop >= vị trí gốc của avatar
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
    desc: 'Cloud computing offers a range of benefits, including cost savings and increased flexibility. Find out why more businesses are turning to the cloud.',
    href: '#'
  },
  {
    date: '7 May 2023',
    title: 'Artificial Intelligence in Healthcare',
    desc: 'AI is transforming the healthcare industry, from improving patient outcomes to streamlining operations. Discover the latest applications of this game-changing technology.',
    href: '#'
  }
]

  const works = [
    { company: 'Facebook', role: 'Software Engineer', time: '2019 - Present', logo: fbLogo },
    { company: 'Twitter',  role: 'Software Engineer', time: '2019 - Present', logo: twLogo },
  ]
  // Social icons
  const icons = [
    { label: 'Twitter', href: 'https://twitter.com', icon: ['fab', 'twitter'] },
    { label: 'Github', href: 'https://github.com', icon: ['fab', 'github'] },
    { label: 'StackOverflow', href: 'https://stackoverflow.com', icon: ['fab', 'stack-overflow'] },
    { label: 'Instagram', href: 'https://instagram.com', icon: ['fab', 'instagram'] },
    { label: 'Mail', href: 'mailto:you@example.com', icon: ['fas', 'mail-bulk'] },
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
  /* ================== NAV-related variables (dễ chỉnh) ================== */
  :root{
    --nav-top: 16px;       /* giống NAV_TOP */
    --nav-h:   40px;       /* giống NAV_HEIGHT */
    --nav-gap: 12px;       /* giống NAV_GAP */
    --avatar-top: calc(var(--nav-top) + var(--nav-h) + var(--nav-gap));
  }

  /* ================== PAGE WRAP ================== */
  .content-wrapper{
    margin: 0 auto;
    max-width: 1000px;
    /* App.vue đã chừa top cho NavBar, không cần padding-top ở đây */
  }

  /* ================== AVATAR sticky → fixed ================== */
  /* Trạng thái bình thường: sticky trong flow, bám cột trái nội dung */
  .sticky-avatar{
    position: sticky;
    top: var(--avatar-top);
    z-index: 999;          /* thấp hơn NavBar (1000) */
    width: 100px; height: 100px;
  }

  .homepage-logo-container{
    display:flex; justify-content:left; align-items:center;
    margin-top:130px;      /* khoảng cách ban đầu */
  }

  .avatar{
    width: 100px; height: 100px; border-radius: 50%;
    display:flex; transform-origin: left top;
    transition: transform .18s ease, box-shadow .18s ease, width .18s ease, height .18s ease;
  }

  .logo{ width:100%; height:100%; border-radius:50%; display:block; }

  /* Khi CHƯA stuck: có thể thu nhẹ (tuỳ thích) */
  .sticky-avatar:not(.stuck) .avatar{
    transform: scale(.85);
  }

  /* Khi stuck: NHẢY ra giữa ngay dưới Nav và chạy theo Nav */
  .sticky-avatar.stuck{
    position: fixed;                 /* thoát flow để bám nav */
    top: var(--avatar-top);
  left: 290px;
      transform: translateX(-50%);
      width: auto;
      height: auto;
      top: -120px;
  }
  .sticky-avatar.stuck .avatar{
    transform: none;                 /* bỏ scale cũ */
    width: 56px; height: 56px;       /* kích thước khi dính */
    box-shadow: 0 6px 18px rgba(0,0,0,.12);
    border: 1px solid white
  }
  .sticky-avatar.stuck  .main{padding-top: 88px;}

  /* ================== HERO ================== */
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

  /* ================== SOCIALS ================== */
  .homepage-socials{ display:flex; justify-content:left; align-items:center; padding-top:30px; }
  .homepage-social-icon{ font-size:25px; color:var(--secondary-color); margin-right:10px; transition:color .2s; }
  .homepage-social-icon:hover{ color: var(--primary-color); }

  /* ================== PROJECTS ================== */
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
  .project:hover .project-link {
    color: #10b981;
  }
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

  /* ================== RESPONSIVE ================== */
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
