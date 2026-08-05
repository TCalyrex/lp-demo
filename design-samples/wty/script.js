/* ============================================================
   wty コーポレートサイト script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     ハンバーガーメニュー
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('js-hamburger');
  const mobileNav = document.getElementById('js-mobile-nav');
  const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function openMenu() {
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      if (hamburger.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // リンクをクリックしたら閉じる
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  /* ----------------------------------------------------------
     IntersectionObserver（2画面目以降のアニメーション）
  ---------------------------------------------------------- */
  const targets = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && targets.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });

    targets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // フォールバック：全部表示
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

});
