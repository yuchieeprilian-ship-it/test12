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
  src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&h=900&q=80",
  alt: "Forest path with light filtering through trees",
  title: "Into the Pines",
  description:
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at posuere magna. Nam eros purus, congue pulvinar turpis pretium, vulputate interdum turpis. Vivamus non arcu." },

{
  id: 2,
  src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&h=900&q=80",
  alt: "Rocky mountain peak against blue sky",
  title: "The High Country",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " },

{
  id: 3,
  src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&h=900&q=80",
  alt: "Ocean waves at sunset",
  title: "Last Light Offshore",
  description:
  "Praesent vel orci orci. Nam sed eleifend felis. Duis eget risus vel nisl feugiat semper eu ut ligula. Morbi eget lorem porttitor, gravida diam lobortis." },

{
  id: 4,
  src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&h=900&q=80",
  alt: "City skyline at night",
  title: "After Hours",
  description:
  "Ut pretium nibh vitae velit laoreet eleifend. Cras consectetur nisl elit, eu scelerisque ante placerat." },

{
  id: 5,
  src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&h=900&q=80",
  alt: "Desert sand dunes",
  title: "Sea of Sand",
  description:
  "Maecenas enim ex, pharetra ut efficitur accumsan, blandit in elit. Donec commodo sapien malesuada condimentum feugiat. Class aptent taciti sociosqu ad litora torquent per conubia." },

{
  id: 6,
  src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&h=900&q=80",
  alt: "Northern lights over snowy landscape",
  title: "Solar Winds",
  description:
  "Ut scelerisque non nulla ac scelerisque. Nulla sollicitudin suscipit dolor vitae lacinia. Quisque id dapibus est. Aenean eget magna id urna cursus congue." }];



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
          React.createElement("img", { src: item.src, alt: item.alt, className: "image" }),
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
    String(activeIndex + 1).padStart(2, "0"), " / ", String(TOTAL).padStart(2, "0")), /*#__PURE__*/

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
  name: "Yusiee",
  role: "Landscape Photographer",
  location: "Pacific Northwest",
  avatar:
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
  cover:
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&h=900&q=80",
  bio: "Capturing quiet light between forests, coastlines, and high country. This gallery collects frames from recent travels — each one meant to be seen large, then tucked back into the strip.",
  stats: [
  { label: "Works", value: String(TOTAL) },
  { label: "Exhibits", value: "12" },
  { label: "Years", value: "8" }]

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
  cover:
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&h=900&q=80",
  email: "hello@ariasolenne.studio",
  phone: "+1 (206) 555-0148",
  location: "Seattle, WA",
  note: "For commissions, print inquiries, or exhibition collaborations — send a short note and I’ll reply within a few days."
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
    React.createElement("p", { className: "contactKicker" }, "Get in touch"), /*#__PURE__*/
    React.createElement("h1", { className: "contactTitle" }, "Contact"), /*#__PURE__*/
    React.createElement("p", { className: "contactNote" }, CONTACT.note)), /*#__PURE__*/


    React.createElement("ul", { className: "contactDetails" }, /*#__PURE__*/
    React.createElement("li", null, /*#__PURE__*/
    React.createElement("span", { className: "contactDetailLabel" }, "Email"), /*#__PURE__*/
    React.createElement("a", { className: "contactDetailValue", href: `mailto:${CONTACT.email}` },
    CONTACT.email)), /*#__PURE__*/


    React.createElement("li", null, /*#__PURE__*/
    React.createElement("span", { className: "contactDetailLabel" }, "Phone"), /*#__PURE__*/
    React.createElement("a", { className: "contactDetailValue", href: "tel:+12065550148" },
    CONTACT.phone)), /*#__PURE__*/


    React.createElement("li", null, /*#__PURE__*/
    React.createElement("span", { className: "contactDetailLabel" }, "Studio"), /*#__PURE__*/
    React.createElement("span", { className: "contactDetailValue" }, CONTACT.location))),


    sent ? /*#__PURE__*/
    React.createElement("p", { className: "contactThanks", role: "status" }, "Thanks — your message is ready. I’ll be in touch soon.") : /*#__PURE__*/

    React.createElement("form", { className: "contactForm", onSubmit: handleSubmit }, /*#__PURE__*/
    React.createElement("label", { className: "contactField" }, /*#__PURE__*/
    React.createElement("span", null, "Name"), /*#__PURE__*/
    React.createElement("input", { type: "text", name: "name", required: true, autoComplete: "name" })), /*#__PURE__*/


    React.createElement("label", { className: "contactField" }, /*#__PURE__*/
    React.createElement("span", null, "Email"), /*#__PURE__*/
    React.createElement("input", { type: "email", name: "email", required: true, autoComplete: "email" })), /*#__PURE__*/


    React.createElement("label", { className: "contactField" }, /*#__PURE__*/
    React.createElement("span", null, "Message"), /*#__PURE__*/
    React.createElement("textarea", { name: "message", rows: "4", required: true })), /*#__PURE__*/


    React.createElement("button", { type: "submit", className: "contactSubmit" }, "Send message")))));




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