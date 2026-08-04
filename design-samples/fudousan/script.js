// ============================================
// 下部固定バー：1画面スクロール後に表示。
// お問い合わせ（#contact）が画面内に入ったら、同じ導線の重複を避けるため非表示にする。
// #contact が存在しないページでもエラーにならないようにガードする。
// ============================================
(function () {
  var bar = document.getElementById('fixed-bar');
  var contact = document.getElementById('contact');
  var vh = window.innerHeight;

  if (!bar) return;

  function onScroll() {
    var pastFirstScreen = window.scrollY > vh;
    var reachedContact = false;
    if (contact) {
      var contactTop = contact.getBoundingClientRect().top;
      reachedContact = contactTop < vh;
    }
    if (pastFirstScreen && !reachedContact) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { vh = window.innerHeight; }, { passive: true });
  onScroll();
})();

// ============================================
// IntersectionObserver: threshold 0 で発火する出現アニメ（2画面目以降）
// ============================================
(function () {
  var els = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });

  els.forEach(function (el) { obs.observe(el); });
})();
