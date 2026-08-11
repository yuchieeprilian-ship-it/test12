import React, { useState, useRef, useCallback, useEffect } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
import {
Gallery,
GalleryMain,
GalleryItem,
GalleryNav,
GalleryPagination,
GalleryPaginationItem,
useGallery } from
"https://esm.sh/@wethegit/react-gallery@4.0.2";
console.clear();

const ITEMS = [
{
  id: 1,
  category: "Preventif Maintenance Panel",
  src: "./images/01-preventif-maintenance-1.png",
  alt: "Tim teknisi melakukan preventive maintenance pada panel listrik",
  title: "Preventif Maintenance Panel",
  description:
  "Perawatan berkala panel listrik oleh tim teknisi untuk menjaga keandalan sistem dan mencegah gangguan operasional." },

{
  id: 2,
  category: "Preventif Maintenance Panel",
  src: "./images/02-preventif-maintenance-2.png",
  alt: "Teknisi memeriksa komponen dalam panel listrik",
  title: "Inspeksi Komponen Panel",
  description:
  "Pemeriksaan detail di dalam panel untuk memastikan kondisi mekanik dan elektrik tetap aman serta siap operasi." },

{
  id: 3,
  category: "Preventif Maintenance Panel",
  src: "./images/03-preventif-maintenance-3.png",
  alt: "Teknisi mengatur komponen di dalam panel kontrol",
  title: "Perawatan Panel Kontrol",
  description:
  "Penyesuaian dan perawatan komponen panel kontrol agar performa sistem distribusi listrik tetap optimal." },

{
  id: 4,
  category: "Thermograph Panel",
  src: "./images/04-thermograph-panel.png",
  alt: "Pemeriksaan suhu panel listrik menggunakan kamera thermal",
  title: "Thermograph Panel",
  description:
  "Pemindaian suhu panel dengan kamera thermal untuk mendeteksi titik panas, beban berlebih, dan potensi kerusakan dini." },

{
  id: 5,
  category: "Terminasi dan Tightening",
  src: "./images/05-terminasi-tightening.png",
  alt: "Teknisi melakukan terminasi dan pengencangan koneksi panel",
  title: "Terminasi dan Tightening",
  description:
  "Pemeriksaan terminasi serta pengencangan koneksi kabel dan busbar agar kontak listrik tetap aman dan stabil." },

{
  id: 6,
  category: "Sound System & Paging",
  src: "./images/06-sound-paging-1.png",
  alt: "Perbaikan unit amplifier sound system di workshop",
  title: "Perawatan Sound System",
  description:
  "Perawatan dan perbaikan perangkat sound system serta paging untuk menjaga kualitas audio dan keandalan perangkat." },

{
  id: 7,
  category: "Sound System & Paging",
  src: "./images/07-sound-paging-2.png",
  alt: "Teknisi membersihkan komponen internal amplifier",
  title: "Perbaikan Paging System",
  description:
  "Pembersihan dan perbaikan internal amplifier/paging agar sistem pengeras suara tetap berfungsi optimal.",
  objectPosition: "50% 65%" },

{
  id: 8,
  category: "Alarm Suhu Server Room",
  src: "./images/08-alarm-suhu-1.png",
  alt: "Instalasi alarm suhu ruangan di dekat pintu server room",
  title: "Alarm Suhu Ruangan",
  description:
  "Instalasi alarm suhu ruangan untuk server room agar suhu kritis dapat terdeteksi dan ditindaklanjuti segera.",
  objectPosition: "50% 10%" },

{
  id: 9,
  category: "Alarm Suhu Server Room",
  src: "./images/09-alarm-suhu-2.png",
  alt: "Panel alarm suhu Durabox dengan sirine dan lampu strobo",
  title: "Monitoring Suhu Server Room",
  description:
  "Sistem monitoring suhu dengan indikator digital, sirine, dan strobo untuk proteksi lingkungan server room." }];



const TOTAL = ITEMS.length;

const indexOfId = id => ITEMS.findIndex(item => item.id === id);

function Slides({ thumbOrder }) {
  const { goToIndex } = useGallery();

  return /*#__PURE__*/(
    React.createElement(GalleryMain, {
      className: "track",
      renderGalleryItem: ({ item, index, active }) => {
        // Strip slot comes from the queue, centered around the middle of the
        // screen. The active item isn't in the queue (indexOf -1), but its
        // offset is unused while the full-screen transform applies.
        const offset = thumbOrder.indexOf(item.id) - (thumbOrder.length - 1) / 2;

        return /*#__PURE__*/(
          React.createElement(GalleryItem, {
            key: item.id,
            index: index,
            active: active,
            className: "item",
            "data-active": String(active) }, /*#__PURE__*/

          React.createElement("div", { className: "slide", style: { "--offset": offset } }, /*#__PURE__*/
          React.createElement("img", { src: item.src, alt: item.alt, className: "image", style: item.objectPosition ? { objectPosition: item.objectPosition } : undefined }),
          !active && /*#__PURE__*/
          React.createElement("button", {
            type: "button",
            className: "thumbButton",
            tabIndex: -1,
            onClick: () => goToIndex(index) }, /*#__PURE__*/

          React.createElement("span", { className: "visuallyHidden" }, "Show ", item.title)))));





      } }));


}

function ActiveContent({ thumbOrder }) {
  const { activeIndex, goToIndex } = useGallery();
  const item = ITEMS[activeIndex];

  return /*#__PURE__*/(
    React.createElement("div", { className: "rail" }, /*#__PURE__*/
    React.createElement("div", { className: "content", key: item.id }, /*#__PURE__*/
    React.createElement("p", { className: "kicker" },
    item.category, " · ", String(activeIndex + 1).padStart(2, "0"), " / ", String(TOTAL).padStart(2, "0")), /*#__PURE__*/

    React.createElement("h2", { className: "title" }, item.title), /*#__PURE__*/
    React.createElement("p", { className: "description" }, item.description)), /*#__PURE__*/








    React.createElement("div", { className: "controls" }, /*#__PURE__*/
    React.createElement("button", {
      type: "button",
      className: "navBtn",
      onClick: () => goToIndex(indexOfId(thumbOrder[thumbOrder.length - 1])) }, /*#__PURE__*/

    React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true" }, /*#__PURE__*/

    React.createElement("polyline", { points: "15 18 9 12 15 6" })), /*#__PURE__*/

    React.createElement("span", { className: "visuallyHidden" }, "Previous")), /*#__PURE__*/

    React.createElement("button", {
      type: "button",
      className: "navBtn",
      onClick: () => goToIndex(indexOfId(thumbOrder[0])) }, /*#__PURE__*/

    React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true" }, /*#__PURE__*/

    React.createElement("polyline", { points: "9 18 15 12 9 6" })), /*#__PURE__*/

    React.createElement("span", { className: "visuallyHidden" }, "Next")))));




}

function SiteNav({ page, onNavigate }) {
  return /*#__PURE__*/(
    React.createElement("nav", { className: "siteNav", "aria-label": "Main" }, /*#__PURE__*/
    React.createElement("button", {
      type: "button",
      className: "siteNavLink",
      "data-active": String(page === "gallery"),
      onClick: () => onNavigate("gallery") }, "Gallery"), /*#__PURE__*/


    React.createElement("button", {
      type: "button",
      className: "siteNavLink",
      "data-active": String(page === "profile"),
      onClick: () => onNavigate("profile") }, "Profile"), /*#__PURE__*/


    React.createElement("button", {
      type: "button",
      className: "siteNavLink",
      "data-active": String(page === "contact"),
      onClick: () => onNavigate("contact") }, "Contact")));



}

function EnlargeGallery() {
  // The thumbnail strip as a queue of item ids, left to right; the active
  // item is excluded. Every change removes the incoming item from the queue
  // and pushes the outgoing item onto the end.
  const [thumbOrder, setThumbOrder] = useState(() =>
  ITEMS.slice(1).map(item => item.id));


  const handleChange = useCallback(({ oldIndex, newIndex }) => {
    setThumbOrder(order => [
    ...order.filter(id => id !== ITEMS[newIndex].id),
    ITEMS[oldIndex].id]);

  }, []);

  return /*#__PURE__*/(
    React.createElement("div", { className: "root" }, /*#__PURE__*/
    React.createElement(Gallery, {
      items: ITEMS,
      draggable: false,
      className: "gallery",
      onChange: handleChange }, /*#__PURE__*/

    React.createElement(Slides, { thumbOrder: thumbOrder }), /*#__PURE__*/
    React.createElement(ActiveContent, { thumbOrder: thumbOrder }))));



}

const PROFILE = {
  name: "PT. Zifa Karya Utama",
  role: "Electrical & Facility Services",
  location: "Jakarta Timur",
  avatar: "./images/01-preventif-maintenance-1.png",
  cover: "./images/02-preventif-maintenance-2.png",
  bio: "Melayani preventive maintenance panel, thermograph, terminasi, perawatan sound/paging system, serta alarm suhu server room untuk menjaga keandalan fasilitas Anda.",
  stats: [
  { label: "Layanan", value: "5" },
  { label: "Dokumentasi", value: String(TOTAL) },
  { label: "Area", value: "JKT" }]

};

function ProfilePage({ onOpenGallery }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "profile" }, /*#__PURE__*/
    React.createElement("div", { className: "profileBackdrop", "aria-hidden": "true" }, /*#__PURE__*/
    React.createElement("img", { src: PROFILE.cover, alt: "", className: "profileCover" }), /*#__PURE__*/
    React.createElement("div", { className: "profileScrim" })), /*#__PURE__*/


    React.createElement("div", { className: "profileInner" }, /*#__PURE__*/
    React.createElement("div", { className: "profileHero" }, /*#__PURE__*/
    React.createElement("img", {
      src: PROFILE.avatar,
      alt: PROFILE.name,
      className: "profileAvatar" }), /*#__PURE__*/


    React.createElement("div", { className: "profileIntro" }, /*#__PURE__*/
    React.createElement("p", { className: "profileKicker" }, PROFILE.role), /*#__PURE__*/
    React.createElement("h1", { className: "profileName" }, PROFILE.name), /*#__PURE__*/
    React.createElement("p", { className: "profileLocation" }, PROFILE.location))), /*#__PURE__*/



    React.createElement("p", { className: "profileBio" }, PROFILE.bio), /*#__PURE__*/

    React.createElement("ul", { className: "profileStats" },
    PROFILE.stats.map(stat => /*#__PURE__*/
    React.createElement("li", { key: stat.label, className: "profileStat" }, /*#__PURE__*/
    React.createElement("span", { className: "profileStatValue" }, stat.value), /*#__PURE__*/
    React.createElement("span", { className: "profileStatLabel" }, stat.label)))), /*#__PURE__*/




    React.createElement("button", { type: "button", className: "profileCta", onClick: onOpenGallery }, "View gallery"))));




}

const CONTACT = {
  cover: "./images/04-thermograph-panel.png",
  email: "Admin@zifakaryautama.com",
  phone: "0813-3337-0743",
  phoneHref: "tel:+6281333370743",
  location:
  "Jl. Kiwi No.10, RT.13/RW.9, Klp. Dua Wetan, Kec. Ciracas, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13730",
  note: "Untuk kerja sama, pertanyaan, atau kunjungan studio — kirim pesan singkat dan kami akan membalas secepatnya."
};

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSent(true);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "contact" }, /*#__PURE__*/
    React.createElement("div", { className: "contactBackdrop", "aria-hidden": "true" }, /*#__PURE__*/
    React.createElement("img", { src: CONTACT.cover, alt: "", className: "contactCover" }), /*#__PURE__*/
    React.createElement("div", { className: "contactScrim" })), /*#__PURE__*/


    React.createElement("div", { className: "contactInner" }, /*#__PURE__*/
    React.createElement("div", { className: "contactIntro" }, /*#__PURE__*/
    React.createElement("p", { className: "contactKicker" }, "Hubungi kami"), /*#__PURE__*/
    React.createElement("h1", { className: "contactTitle" }, "Contact"), /*#__PURE__*/
    React.createElement("p", { className: "contactNote" }, CONTACT.note)), /*#__PURE__*/


    React.createElement("ul", { className: "contactDetails" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/
    React.createElement("span", { className: "contactDetailLabel" }, "Alamat"), /*#__PURE__*/
    React.createElement("span", { className: "contactDetailValue" }, CONTACT.location)), /*#__PURE__*/


    React.createElement("li", null, /*#__PURE__*/
    React.createElement("span", { className: "contactDetailLabel" }, "Email"), /*#__PURE__*/
    React.createElement("a", { className: "contactDetailValue", href: `mailto:${CONTACT.email}` },
    CONTACT.email)), /*#__PURE__*/


    React.createElement("li", null, /*#__PURE__*/
    React.createElement("span", { className: "contactDetailLabel" }, "Telepon"), /*#__PURE__*/
    React.createElement("a", { className: "contactDetailValue", href: CONTACT.phoneHref },
    CONTACT.phone))),


    sent ? /*#__PURE__*/
    React.createElement("p", { className: "contactThanks", role: "status" }, "Terima kasih — pesan Anda sudah siap. Kami akan segera menghubungi Anda.") : /*#__PURE__*/

    React.createElement("form", { className: "contactForm", onSubmit: handleSubmit }, /*#__PURE__*/
    React.createElement("label", { className: "contactField" }, /*#__PURE__*/
    React.createElement("span", null, "Nama"), /*#__PURE__*/
    React.createElement("input", { type: "text", name: "name", required: true, autoComplete: "name" })), /*#__PURE__*/


    React.createElement("label", { className: "contactField" }, /*#__PURE__*/
    React.createElement("span", null, "Email"), /*#__PURE__*/
    React.createElement("input", { type: "email", name: "email", required: true, autoComplete: "email" })), /*#__PURE__*/


    React.createElement("label", { className: "contactField" }, /*#__PURE__*/
    React.createElement("span", null, "Pesan"), /*#__PURE__*/
    React.createElement("textarea", { name: "message", rows: "4", required: true })), /*#__PURE__*/


    React.createElement("button", { type: "submit", className: "contactSubmit" }, "Kirim pesan")))));




}

function getPageFromHash() {
  const hash = window.location.hash;
  if (hash === "#/profile") return "profile";
  if (hash === "#/contact") return "contact";
  return "gallery";
}

const HASH_BY_PAGE = {
  gallery: "#/",
  profile: "#/profile",
  contact: "#/contact"
};

const App = () => {
  const [page, setPage] = useState(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback(next => {
    window.location.hash = HASH_BY_PAGE[next] || "#/";
    setPage(next);
  }, []);

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(SiteNav, { page: page, onNavigate: navigate }),
    page === "profile" ? /*#__PURE__*/
    React.createElement(ProfilePage, { onOpenGallery: () => navigate("gallery") }) :
    page === "contact" ? /*#__PURE__*/
    React.createElement(ContactPage, null) : /*#__PURE__*/

    React.createElement(EnlargeGallery, null)));


};

const container = document.getElementById("root");
const root = createRoot(container);
root.render( /*#__PURE__*/React.createElement(App, null));