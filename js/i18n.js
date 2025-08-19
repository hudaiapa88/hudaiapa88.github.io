// i18n.js - Internationalization system

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'tr';
    this.translations = {};
  // init translations synchronously
  this.readyPromise = this.loadTranslations().then(() => this.init());
  }

  async loadTranslations() {
    this.translations = {
      tr: {
        nav: {
          home: "Ana Sayfa",
          about: "Hakkımda",
          experience: "Deneyim",
          projects: "Projeler",
          skills: "Yetenekler",
          contact: "İletişim",
          cv: "CV"
        },
        cv: {
          nav: { back: "← Geri", ats: "PDF (ATS)", print: "PDF (Stil)", cityLabel: "Hedef Şehir:", current: "Mevcut ({city})" },
          header: { role: "Yazılım Geliştirici" },
          sections: { summary: "Profesyonel Özet", tech: "Teknik Yetenekler", experience: "Profesyonel Deneyim", projects: "Öne Çıkan Projeler", education: "Eğitim", languages: "Diller" },
          summaryText: "Backend teknolojilerinde, özellikle Java ve Spring Boot'ta uzmanlaşmış, çok yönlü bir Yazılım Geliştiricisiyim. Ölçeklenebilir ve sağlam çözümler geliştirme konusunda 4+ yıllık deneyime sahibim. Kendi girişimim Lingol projesinde tüm süreci baştan sona tek başıma yürüterek hem mobil (Flutter) hem de frontend (React) geliştirme becerilerimi kanıtladım. Görüntü işleme ve makine öğrenimi alanındaki tecrübemle, karmaşık problemleri çözmek için yenilikçi yaklaşımlar sergiliyorum.",
          education: { degreeLine: "Necmettin Erbakan Üniversitesi — YBS", degreeBadge: "2017 — 2021", degreeNote: "Lisans" },
          langs: { turkish: "Türkçe", native: "Ana Dil", english: "İngilizce", level: "Orta Seviye (B1)" },
          cities: { istanbul: "İstanbul, Türkiye", ankara: "Ankara, Türkiye", izmir: "İzmir, Türkiye", denizli: "Denizli, Türkiye" }
        },
        hero: {
          title: "Yazılım Geliştirici",
          subtitle: "Backend · Java/Spring Boot · React/Tailwind · Flutter",
          cta1: "Projelerimi İncele",
          cta2: "Benimle İletişime Geç",
          stats: { experience: "Yıl Deneyim", projects: "Proje", passion: "Tutku" }
        },
        about: {
          title: "Hakkımda",
          subtitle: "Modern teknolojilerde uzman tutkulu yazılım geliştiricisi",
          who: {
              title: "Ben Kimim?",
              p1: "4+ yıldır backend odaklı, Java/Spring Boot ile REST API’ler geliştiren; React/Tailwind ile modern arayüzler ve Flutter ile mobil uygulamalar oluşturan bir geliştiriciyim.",
              p2: "Mikroservis, mesajlaşma (RabbitMQ/Kafka), cache (Redis), konteynerizasyon (Docker/K8s) ve Clean Architecture/DDD üzerine çalışıyorum.",
              p3: "Sürdürülebilir, test edilebilir ve ölçeklenebilir sistemler kurmaya odaklanıyorum."
          },
          skills: {
            backend: { title: "Backend Geliştirme", desc: "Java, Spring Boot, RESTful API'ler, Mikroservis Mimarisi" },
            mobile: { title: "Mobil Geliştirme", desc: "Flutter, Dart, Cross-platform Uygulamalar" },
            ai: { title: "AI & ML", desc: "Makine Öğrenmesi, Görüntü İşleme, Veri Analizi" }
          }
        },
        experience: {
          title: "Deneyim",
          subtitle: "Profesyonel yolculuğum ve başarılarım",
            freelance: {
              title: "Serbest Yazılımcı (Full‑Stack)",
              period: "Kasım 2023 — Halen",
              d1: "• Kendi girişimim Lingol dahil ihtiyaçlara özel çözümler",
              d2: "• Java/Spring Boot ile ölçeklenebilir REST API’ler ve sağlam mimariler",
              d3: "• PostgreSQL/MongoDB modelleme ve performans; Redis ile önbellekleme",
              d4: "• React/Tailwind ile modern arayüzler; Flutter ile mobil uygulamalar"
            },
            aselsis: {
              title: "Java Backend Geliştirici — Aselsis",
              period: "Ocak 2021 — Kasım 2023",
              d1: "• Spring Boot ile mikroservis temelli kurumsal uygulamalar",
              d2: "• JWT/Keycloak kimlik doğrulama ve yetkilendirme",
              d3: "• RabbitMQ ile asenkron akışlar; Redis ile caching/rate limiting",
              d4: "• PostgreSQL, Oracle, MongoDB üzerinde performans çalışmaları"
            }
        },
        projects: {
          title: "Projeler",
          subtitle: "Geliştirdiğim başlıca projeler",
            lingol: { title: "Lingol — Kendi Girişimim Olan Dil Öğrenme Uygulaması", desc: "Flutter mobil uygulama; Spring Boot backend ve React admin paneli; i18n ve gerçek zamanlı özellikler." },
            erbakir: { title: "Erbakır VR — Kalite Kontrol Sistemi", desc: "Java SE tabanlı gerçek zamanlı görüntü işleme ve VR tabanlı kalite kontrol çözümleri." },
            damlatur: { title: "Damlatur — Tur Şirketi için Planlama ve Rota Uygulaması", desc: "Planlama ve rota yönetimi; güvenli Spring Boot backend, Caffeine Cache ve JMeter performans testleri." },
            lojister: { title: "Lojister — Nakliye Uygulaması", desc: "Sevkiyat planlama, araç/rota yönetimi ve takip; ödeme/integrasyon süreçleri." },
            bullets: {
              lingol: {
                b1: "Flutter (Nylo) mobil ve Spring Boot backend sahibi; React admin paneli ve i18n mimarisi.",
                b2: "RSocket tabanlı gerçek zamanlı oyun modu; özel auth ve OpenAI destekli istatistik/analiz.",
                b3: "PostgreSQL üzerinde şema ve performans odaklı mimari."
              },
              erbakir: {
                b1: "Java SE ile gerçek zamanlı görüntü işleme, model servis entegrasyonu.",
                b2: "Python/OpenCV ile YOLOv4 eğitim ve değerlendirme süreçleri."
              },
              damlatur: {
                b1: "Spring Security, JPA/Hibernate ile sağlam backend; Caffeine Cache ile hızlandırma.",
                b2: "JMeter ile performans testleri ve dar boğaz analizi."
              },
              lojister: {
                b1: "Sorgu ve performans optimizasyonları; çoklu dil desteği.",
                b2: "iyzico, Halkbank, TEB gibi ödeme/entegrasyon süreçleri."
              }
            },
            links: { web: "Web ->", play: "Google Play ->" },
            builtAt: "Aselsis A.Ş. bünyesinde"
        },
        skills: {
          title: "Yetenekler",
          subtitle: "Uzmanlaştığım teknolojiler ve araçlar",
          backend: { title: "Backend" },
          mobile: { title: "Mobil" },
          frontend: { title: "Frontend" },
          ai: { title: "AI & ML" },
          soft: { title: "Kişisel Yetenekler", problemSolving: "Problem Çözme", teamwork: "Takım Çalışması", fastLearning: "Hızlı Öğrenme", creativity: "Yaratıcılık" }
        },
        skillsCats: {
          languages: "Diller",
          frameworks: "Frameworkler",
          architectures: "Mimariler",
          databases: "Veritabanları",
          webservices: "Web Servisleri",
          testing: "Test",
          messaging: "Mesajlaşma",
          caching: "Önbellek",
          libraries: "Kütüphaneler",
          tools: "Araçlar"
        },
  skillsList: {
          languages: { java: "Java", javascript: "JavaScript", dart: "Dart", python: "Python" },
          frameworks: { springBoot: "Spring Boot", javaEE: "JavaEE", javaSE: "JavaSE", hibernateORM: "Hibernate ORM", flutter: "Flutter", react: "React", javaFX: "JavaFX" },
          architectures: { designPatterns: "Design Patterns", layered: "Layered Architecture", microservice: "Microservice" },
          databases: { postgresql: "PostgreSQL", mongodb: "MongoDB", elasticsearch: "Elasticsearch", mysql: "MySQL" },
          webservices: { rest: "REST", rsocket: "RSocket" },
          testing: { junit: "JUnit", mockito: "Mockito", restAssured: "Rest Assured", jmeter: "JMeter" },
          messaging: { kafka: "Kafka", rabbitmq: "RabbitMQ" },
          caching: { redis: "Redis", caffeine: "Caffeine" },
          libraries: { lombok: "Lombok", mapstruct: "MapStruct", springdoc: "springdoc-openapi", thymeleaf: "Thymeleaf", apacheCommons: "Apache Commons", mqtt: "MQTT", opencv: "OpenCV", zxing: "ZXing" },
          tools: { git: "Git", maven: "Maven", jira: "Jira", docker: "Docker", observability: "Gözlemlenebilirlik (Grafana, Loki, Tempo, Prometheus)" }
        },
        
        contact: {
          title: "İletişim",
          subtitle: "Benimle iletişime geçin",
          infoTitle: "İletişim Bilgileri",
          labels: { location: "Konum", mobile: "Mobil", email: "E-posta", linkedin: "LinkedIn", github: "GitHub" },
          values: { location: "İstanbul, Türkiye" },
          quick: { title: "Hızlı Bilgiler", open: "Yeni projelere açık", remote: "Remote çalışma imkanı", bilingual: "İki dilli iletişim (TR/EN)" },
          form: { title: "Mesaj Gönder", name: "İsim", email: "Email", subject: "Konu", message: "Mesaj", send: "Mesaj Gönder" }
        },
        footer: {
          desc: "Modern teknolojilerde uzman tutkulu yazılım geliştirici",
          links: { title: "Hızlı Bağlantılar" },
          tech: { title: "Teknolojiler", javaSpring: "Java & Spring Boot", flutter: "Flutter & Dart", react: "React & JavaScript", ml: "Makine Öğrenmesi", cv: "Görüntü İşleme" },
          rights: "Tüm hakları saklıdır",
          switch: "English"
        },
        meta: {
          title: "Hüdai APA - Yazılım Geliştirici Portföyü",
            description: "Hüdai APA - Backend odaklı yazılım geliştirici. Java/Spring Boot, React/Tailwind, Flutter. 4+ yıl deneyim.",
          og: {
            title: "Hüdai APA - Yazılım Geliştirici",
              description: "Backend · Java/Spring Boot · React/Tailwind · Flutter"
          }
        }
      },
      en: {
        nav: {
          home: "Home",
          about: "About",
          experience: "Experience",
          projects: "Projects",
          skills: "Skills",
          contact: "Contact",
          cv: "CV"
        },
        cv: {
          nav: { back: "← Back", ats: "PDF (ATS)", print: "PDF (Styled)", cityLabel: "Target City:", current: "Current ({city})" },
          header: { role: "Software Developer" },
          sections: { summary: "Professional Summary", tech: "Technical Skills", experience: "Experience", projects: "Projects", education: "Education", languages: "Languages" },
          summaryText: "Backend-focused developer with 4+ years of experience building robust REST APIs with Java/Spring Boot, modern UIs with React/Tailwind, and mobile apps with Flutter. Experienced with microservices, messaging (RabbitMQ/Kafka), caching (Redis), and containerization/orchestration (Docker/Kubernetes). I value Clean Architecture, SOLID, and DDD to design testable, maintainable, and scalable systems.",
          education: { degreeLine: "Necmettin Erbakan University — Management Information Systems", degreeBadge: "2017 — 2021", degreeNote: "Bachelor" },
          langs: { turkish: "Turkish", native: "Native", english: "English", level: "Intermediate (B1)" },
          cities: { istanbul: "Istanbul, Turkey", ankara: "Ankara, Turkey", izmir: "Izmir, Turkey", denizli: "Denizli, Turkey" }
        },
        hero: {
          title: "Software Developer",
          subtitle: "Backend · Java/Spring Boot · React/Tailwind · Flutter",
          cta1: "View My Projects",
          cta2: "Get In Touch",
          stats: { experience: "Years Experience", projects: "Projects", passion: "Passion" }
        },
        about: {
          title: "About Me",
          subtitle: "Passionate software developer with expertise in modern technologies",
          who: {
            title: "Who Am I?",
              p1: "Backend-focused developer with 4+ years building REST APIs in Java/Spring Boot, modern UIs with React/Tailwind, and mobile apps with Flutter.",
              p2: "Experienced with microservices, messaging (RabbitMQ/Kafka), caching (Redis), containers and orchestration (Docker/K8s).",
              p3: "I care about Clean Architecture, SOLID, DDD and building testable, maintainable, scalable systems."
          },
          skills: {
            backend: { title: "Backend Development", desc: "Java, Spring Boot, RESTful APIs, Microservices" },
            mobile: { title: "Mobile Development", desc: "Flutter, Dart, Cross-platform Applications" },
            ai: { title: "AI & ML", desc: "Machine Learning, Image Processing, Data Analysis" }
          }
        },
        experience: {
          title: "Experience",
          subtitle: "Professional journey and achievements",
            freelance: {
              title: "Freelance Software Developer (Full‑Stack)",
              period: "Nov 2023 — Present",
              d1: "• Delivered custom solutions incl. my own startup Lingol",
              d2: "• Scalable REST APIs and robust architectures with Java/Spring Boot",
              d3: "• Data modeling and performance on PostgreSQL/MongoDB; caching with Redis",
              d4: "• Modern UIs with React/Tailwind; mobile apps with Flutter"
            },
            aselsis: {
              title: "Java Backend Developer — Aselsis",
              period: "Jan 2021 — Nov 2023",
              d1: "• Built microservice-based enterprise applications with Spring Boot",
              d2: "• Implemented JWT/Keycloak authentication and authorization",
              d3: "• Event-driven flows with RabbitMQ; caching/rate limiting with Redis",
              d4: "• Schema design, indexing and performance tuning on PostgreSQL, Oracle, MongoDB"
            }
        },
        projects: {
          title: "Projects",
          subtitle: "Highlighted work I've built",
            lingol: { title: "Lingol — My Startup Language Learning App", desc: "Flutter app with Spring Boot backend and React admin; i18n and real-time features." },
            erbakir: { title: "Erbakır VR — Quality Control System", desc: "Real-time image processing with Java SE and VR-based quality control." },
            damlatur: { title: "Damlatur — Tour Planning & Routing App", desc: "Planning and routing for a tour company; secure Spring Boot backend, Caffeine Cache, JMeter tests." },
            lojister: { title: "Lojister — Shipping App", desc: "Shipment planning, vehicle/route management and tracking; payment integrations." },
            bullets: {
              lingol: {
                b1: "Owner of Flutter (Nylo) mobile and Spring Boot backend; React admin and i18n architecture.",
                b2: "Real-time game mode over RSocket; custom auth and OpenAI-powered stats/analysis.",
                b3: "Schema and performance focused architecture on PostgreSQL."
              },
              erbakir: {
                b1: "Real-time image processing in Java SE; model service integration.",
                b2: "YOLOv4 training and evaluation with Python/OpenCV."
              },
              damlatur: {
                b1: "Robust backend with Spring Security and JPA/Hibernate; accelerated via Caffeine Cache.",
                b2: "Performance testing and bottleneck analysis with JMeter."
              },
              lojister: {
                b1: "Query and performance optimizations; multi-language support.",
                b2: "Payment/integration flows incl. iyzico, Halkbank, TEB."
              }
            },
            links: { web: "Website ->", play: "Google Play ->" },
            builtAt: "Built at Aselsis A.Ş."
        },
        skills: {
          title: "Skills",
          subtitle: "Technologies and tools I specialize in",
          backend: { title: "Backend" },
          mobile: { title: "Mobile" },
          frontend: { title: "Frontend" },
          ai: { title: "AI & ML" },
          soft: { title: "Soft Skills", problemSolving: "Problem Solving", teamwork: "Teamwork", fastLearning: "Fast Learning", creativity: "Creativity" }
        },
        skillsCats: {
          languages: "Languages",
          frameworks: "Frameworks",
          architectures: "Architectures",
          databases: "Databases",
          webservices: "Web Services",
          testing: "Testing",
          messaging: "Message Queue",
          caching: "Cache",
          libraries: "Libraries",
          tools: "Tools"
        },
  skillsList: {
          languages: { java: "Java", javascript: "JavaScript", dart: "Dart", python: "Python" },
          frameworks: { springBoot: "Spring Boot", javaEE: "JavaEE", javaSE: "JavaSE", hibernateORM: "Hibernate ORM", flutter: "Flutter", react: "React", javaFX: "JavaFX" },
          architectures: { designPatterns: "Design Patterns", layered: "Layered Architecture", microservice: "Microservice" },
          databases: { postgresql: "PostgreSQL", mongodb: "MongoDB", elasticsearch: "Elasticsearch", mysql: "MySQL" },
          webservices: { rest: "REST", rsocket: "RSocket" },
          testing: { junit: "JUnit", mockito: "Mockito", restAssured: "Rest Assured", jmeter: "JMeter" },
          messaging: { kafka: "Kafka", rabbitmq: "RabbitMQ" },
          caching: { redis: "Redis", caffeine: "Caffeine" },
          libraries: { lombok: "Lombok", mapstruct: "MapStruct", springdoc: "springdoc-openapi", thymeleaf: "Thymeleaf", apacheCommons: "Apache Commons", mqtt: "MQTT", opencv: "OpenCV", zxing: "ZXing" },
          tools: { git: "Git", maven: "Maven", jira: "Jira", docker: "Docker", observability: "Observability (Grafana, Loki, Tempo, Prometheus)" }
        },
        
        contact: {
          title: "Contact",
          subtitle: "Get in touch with me",
          infoTitle: "Contact Information",
          labels: { location: "Location", mobile: "Mobile", email: "Email", linkedin: "LinkedIn", github: "GitHub" },
          values: { location: "Istanbul, Turkey" },
          quick: { title: "Quick Facts", open: "Open to new projects", remote: "Remote-friendly", bilingual: "Bilingual (TR/EN)" },
          form: { title: "Send a Message", name: "Name", email: "Email", subject: "Subject", message: "Message", send: "Send Message" }
        },
        footer: {
          desc: "Passionate software developer expert in modern technologies",
          links: { title: "Quick Links" },
          tech: { title: "Technologies", javaSpring: "Java & Spring Boot", flutter: "Flutter & Dart", react: "React & JavaScript", ml: "Machine Learning", cv: "Computer Vision" },
          rights: "All rights reserved",
          switch: "Türkçe"
        },
        meta: {
          title: "Hüdai APA - Software Developer Portfolio",
            description: "Hüdai APA - Backend-focused developer. Java/Spring Boot, React/Tailwind, Flutter. 4+ years experience.",
          og: {
            title: "Hüdai APA - Software Developer",
              description: "Backend · Java/Spring Boot · React/Tailwind · Flutter"
          }
        }
      }
    };
    return Promise.resolve();
  }

  init() {
    this.setupLanguageSwitchers();
    // allow ?lang=tr|en in URL
    try {
      const url = new URL(window.location.href);
      const qp = url.searchParams.get('lang');
      if (qp && (qp === 'tr' || qp === 'en')) {
        this.currentLang = qp;
      }
    } catch {}
    // guard default
    if (!this.translations[this.currentLang]) {
      this.currentLang = 'tr';
    }
    this.setLanguage(this.currentLang);
  }

  setupLanguageSwitchers() {
    const langTR = document.getElementById('langTR');
    const langEN = document.getElementById('langEN');

    if (langTR) {
      langTR.addEventListener('click', () => this.setLanguage('tr'));
    }
    
    if (langEN) {
      langEN.addEventListener('click', () => this.setLanguage('en'));
    }
  }

  setLanguage(lang) {
    if (!this.translations[lang]) {
      lang = 'tr';
    }
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update language buttons
    this.updateLanguageButtons();
    
  // Update all text content (guard to avoid errors)
  try { this.updateContent(); } catch (e) { /* noop */ }
    
  // Update meta tags
  try { this.updateMetaTags(); } catch (e) { /* noop */ }

    // Update CV link to language-specific page
    const cvLink = document.getElementById('cvLink');
    if (cvLink) {
  cvLink.href = '/cv.html?lang=' + (lang === 'en' ? 'en' : 'tr');
    }
    // Update footer language switch destination and label
    const footerSwitch = document.getElementById('footerLangSwitch');
    const footerSwitchLabel = document.querySelector('#footerLangSwitch span[data-i18n="footer.switch"]');
    if (footerSwitch) {
      footerSwitch.href = lang === 'en' ? '/index.html?lang=tr' : '/index.html?lang=en';
    }
    
    // Add fade effect
    document.body.classList.add('fade-transition');
    setTimeout(() => {
      document.body.classList.remove('fade-transition');
  // re-run reveal for any new text layout
  if (window.rescanReveal) window.rescanReveal();
    }, 300);
  }

  updateLanguageButtons() {
    const langTR = document.getElementById('langTR');
    const langEN = document.getElementById('langEN');
    
    if (langTR && langEN) {
      if (this.currentLang === 'tr') {
        langTR.className = 'px-3 py-1 text-sm rounded-lg bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300 transition-colors';
        langEN.className = 'px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-brand-100 dark:hover:bg-brand-900 transition-colors';
      } else {
        langTR.className = 'px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-brand-100 dark:hover:bg-brand-900 transition-colors';
        langEN.className = 'px-3 py-1 text-sm rounded-lg bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300 transition-colors';
      }
    }
  }

  updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getNestedTranslation(this.translations[this.currentLang], key);
      
      if (translation) {
        element.textContent = translation;
      }
    });
  }

  updateMetaTags() {
    const translations = this.translations[this.currentLang];
    
    // Update title
    document.title = translations.meta.title;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', translations.meta.description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', translations.meta.og.title);
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', translations.meta.og.description);
    }
  }

  getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, i) => o && o[i], obj);
  }

  t(key) {
    return this.getNestedTranslation(this.translations[this.currentLang], key) || key;
  }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const i = new I18n();
  window.i18n = i;
});
