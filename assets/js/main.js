// Main JS bootstrap: scroll reveal
document.addEventListener('DOMContentLoaded', function(){
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
            if(e.isIntersecting){
                e.target.classList.add('revealed');
                observer.unobserve(e.target);
            }
        })
    }, {threshold: 0.12});
    function rescanReveal(){
        document.querySelectorAll('.reveal, .fade-in').forEach(el=>{
            if(!el.__observed){ observer.observe(el); el.__observed = true; }
        });
    }
    rescanReveal();
    // expose for dynamic content
    window.rescanReveal = rescanReveal;

    // Scrollspy: highlight nav link matching current section
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    function setActive(){
        const y = window.scrollY + 120; // offset for header
        let current = sections[0]?.id;
        sections.forEach(s=>{ if (s.offsetTop <= y) current = s.id; });
        links.forEach(a=>{
            const hash = a.getAttribute('href').replace('#','');
            a.classList.toggle('active', hash === current);
        });
    }
    setActive();
    window.addEventListener('scroll', setActive, {passive:true});

    // Animated counters
    function initCounters(){
        const counters = document.querySelectorAll('.counter');
        const io = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    const el = entry.target;
                    const to = parseInt(el.getAttribute('data-to')||'0',10);
                    const dur = 1200;
                    const start = performance.now();
                    function tick(now){
                        const p = Math.min(1, (now - start) / dur);
                        el.textContent = Math.floor(to * (0.2 + 0.8 * p)).toString();
                        if(p < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                    io.unobserve(el);
                }
            });
        }, {threshold: 0.4});
        counters.forEach(c=>io.observe(c));
    }
    initCounters();
});