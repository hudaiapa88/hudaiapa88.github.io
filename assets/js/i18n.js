// This file handles internationalization, loading the appropriate content based on the selected language.

const i18n = {
    en: {
        about: {
            title: "About Me",
            content: "I am a versatile Software Developer specializing in backend technologies, particularly in Java and Spring Boot. With over 4 years of experience in developing scalable and robust solutions, I have proven my skills in both mobile (Flutter) and frontend (React) development through my own venture, the Lingol project."
        },
        experience: {
            title: "Experience",
            content: "Freelance Developer - Denizli, Turkey (Nov 2023 - Present)\nDeveloped custom solutions tailored to my clients' needs, including my own venture, Lingol.\n\nJava Backend Developer - Aselsis A.Ş. (On-site) (Jan 2021 - Nov 2023)\nActively participated in numerous large projects from inception to delivery."
        },
        projects: {
            title: "Selected Projects",
            lingol: "Lingol - Language Learning Application",
            erbakir: "Erbakır VR - Quality Control System",
            damlatur: "Damlatur - Tour Company Planning and Route Determination Application",
            lojister: "Lojister - Transportation Application"
        },
        skills: {
            title: "Technical Skills",
            content: "Programming Languages: Java, JavaScript, Dart, Python\nFrameworks: Spring Boot, JavaEE, JavaSE, Hibernate ORM, Flutter, React, JavaFX\nDatabases: PostgreSQL, MongoDB, Elasticsearch, MySQL"
        }
    },
    tr: {
        about: {
            title: "Hakkımda",
            content: "Ben, özellikle Java ve Spring Boot'ta uzmanlaşmış çok yönlü bir Yazılım Geliştiricisiyim. Ölçeklenebilir ve sağlam çözümler geliştirme konusunda 4 yılı aşkın deneyime sahibim. Kendi girişimim olan Lingol projesinde hem mobil (Flutter) hem de frontend (React) geliştirme becerilerimi kanıtladım."
        },
        experience: {
            title: "Deneyim",
            content: "Serbest Yazılımcı - Denizli, Türkiye (Kasım 2023 - Halen)\nMüşterilerimin ihtiyaçlarına özel çözümler geliştirdim, kendi girişimim olan Lingol dahil.\n\nJava Backend Geliştirici - Aselsis A.Ş. (Yerinde) (Ocak 2021 - Kasım 2023)\nBirçok büyük projede başlangıçtan teslimata kadar aktif rol aldım."
        },
        projects: {
            title: "Seçilmiş Projeler",
            lingol: "Lingol - Dil Öğrenme Uygulaması",
            erbakir: "Erbakır VR - Kalite Kontrol Sistemi",
            damlatur: "Damlatur - Tur Şirketi İçin Planlama ve Rota Belirleme Uygulaması",
            lojister: "Lojister - Nakliye Uygulaması"
        },
        skills: {
            title: "Teknik Yetenekler",
            content: "Programlama Dilleri: Java, JavaScript, Dart, Python\nFrameworkler: Spring Boot, JavaEE, JavaSE, Hibernate ORM, Flutter, React, JavaFX\nVeritabanları: PostgreSQL, MongoDB, Elasticsearch, MySQL"
        }
    }
};

function loadContent(language) {
    const content = i18n[language];
    document.getElementById('about-title').innerText = content.about.title;
    document.getElementById('about-content').innerText = content.about.content;
    document.getElementById('experience-title').innerText = content.experience.title;
    document.getElementById('experience-content').innerText = content.experience.content;
    document.getElementById('projects-title').innerText = content.projects.title;
    document.getElementById('projects-lingol').innerText = content.projects.lingol;
    document.getElementById('projects-erbakir').innerText = content.projects.erbakir;
    document.getElementById('projects-damlatur').innerText = content.projects.damlatur;
    document.getElementById('projects-lojister').innerText = content.projects.lojister;
    document.getElementById('skills-title').innerText = content.skills.title;
    document.getElementById('skills-content').innerText = content.skills.content;
}

// Example usage: loadContent('en'); or loadContent('tr');