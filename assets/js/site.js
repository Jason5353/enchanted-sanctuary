/* Enchanted Sanctuary - site behaviour (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var header = doc.getElementById('site-header'), toTop = doc.getElementById('to-top');
  function onScroll() {
    var y = window.pageYOffset || root.scrollTop;
    if (header) header.classList.toggle('stuck', y > 80);
    if (toTop) toTop.classList.toggle('show', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var burger = doc.getElementById('burger');
  if (burger && header) {
    burger.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.addEventListener('click', function (e) {
      if (e.target.closest('.main-nav a[href]:not([href="#"])')) header.classList.remove('nav-open');
    });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') header.classList.remove('nav-open'); });
  }
  Array.prototype.forEach.call(doc.querySelectorAll('a[href="#"]'), function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  var fx = doc.querySelectorAll('.fx');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(fx, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(fx, function (el) { el.classList.add('in'); });
  }

  var counters = doc.querySelectorAll('[data-to]');
  function fmt(n, d) { return d ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, d) : String(n); }
  function run(el) {
    var to = parseInt(el.getAttribute('data-to'), 10) || 0;
    var dur = parseInt(el.getAttribute('data-duration'), 10) || 2000;
    var d = el.getAttribute('data-delimiter') || '';
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(to, d); return; }
    var t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = fmt(Math.round(to * p), d);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(counters, function (el) { co.observe(el); });
  } else {
    Array.prototype.forEach.call(counters, run);
  }
})();
