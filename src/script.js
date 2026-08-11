import React, { useState, useRef, useCallback, useEffect } from "https://esm.sh/react";
import { createRoot }from "https://esm.sh/react-dom/client";
import {
  Gallery,
  GalleryMain,
  GalleryItem,
  GalleryNav,
  GalleryPagination,
  GalleryPaginationItem,
  useGallery,
} from "https://esm.sh/@wethegit/react-gallery@4.0.2";
console.clear();

const ITEMS = [
  {
    id: 1,
    category: "Preventif Maintenance Panel",
    src: "./images/01-preventif-maintenance-1.png",
    alt: "Tim teknisi melakukan preventive maintenance pada panel listrik",
    title: "Preventif Maintenance Panel",
    description:
      "Perawatan berkala panel listrik oleh tim teknisi untuk menjaga keandalan sistem dan mencegah gangguan operasional.",
  },
  {
    id: 2,
    category: "Preventif Maintenance Panel",
    src: "./images/02-preventif-maintenance-2.png",
    alt: "Teknisi memeriksa komponen dalam panel listrik",
    title: "Inspeksi Komponen Panel",
    description:
      "Pemeriksaan detail di dalam panel untuk memastikan kondisi mekanik dan elektrik tetap aman serta siap operasi.",
  },
  {
    id: 3,
    category: "Preventif Maintenance Panel",
    src: "./images/03-preventif-maintenance-3.png",
    alt: "Teknisi mengatur komponen di dalam panel kontrol",
    title: "Perawatan Panel Kontrol",
    description:
      "Penyesuaian dan perawatan komponen panel kontrol agar performa sistem distribusi listrik tetap optimal.",
  },
  {
    id: 4,
    category: "Thermograph Panel",
    src: "./images/04-thermograph-panel.png",
    alt: "Pemeriksaan suhu panel listrik menggunakan kamera thermal",
    title: "Thermograph Panel",
    description:
      "Pemindaian suhu panel dengan kamera thermal untuk mendeteksi titik panas, beban berlebih, dan potensi kerusakan dini.",
  },
  {
    id: 5,
    category: "Terminasi dan Tightening",
    src: "./images/05-terminasi-tightening.png",
    alt: "Teknisi melakukan terminasi dan pengencangan koneksi panel",
    title: "Terminasi dan Tightening",
    description:
      "Pemeriksaan terminasi serta pengencangan koneksi kabel dan busbar agar kontak listrik tetap aman dan stabil.",
  },
  {
    id: 6,
    category: "Sound System & Paging",
    src: "./images/06-sound-paging-1.png",
    alt: "Perbaikan unit amplifier sound system di workshop",
    title: "Perawatan Sound System",
    description:
      "Perawatan dan perbaikan perangkat sound system serta paging untuk menjaga kualitas audio dan keandalan perangkat.",
  },
  {
    id: 7,
    category: "Sound System & Paging",
    src: "./images/07-sound-paging-2.png",
    alt: "Teknisi membersihkan komponen internal amplifier",
    title: "Perbaikan Paging System",
    description:
      "Pembersihan dan perbaikan internal amplifier/paging agar sistem pengeras suara tetap berfungsi optimal.",
  },
  {
    id: 8,
    category: "Alarm Suhu Server Room",
    src: "./images/08-alarm-suhu-1.png",
    alt: "Instalasi alarm suhu ruangan di dekat pintu server room",
    title: "Alarm Suhu Ruangan",
    description:
      "Instalasi alarm suhu ruangan untuk server room agar suhu kritis dapat terdeteksi dan ditindaklanjuti segera.",
    objectPosition: "50% 10%",
  },
  {
    id: 9,
    category: "Alarm Suhu Server Room",
    src: "./images/09-alarm-suhu-2.png",
    alt: "Panel alarm suhu Durabox dengan sirine dan lampu strobo",
    title: "Monitoring Suhu Server Room",
    description:
      "Sistem monitoring suhu dengan indikator digital, sirine, dan strobo untuk proteksi lingkungan server room.",
  },
]

const TOTAL = ITEMS.length

const indexOfId = (id) => ITEMS.findIndex((item) => item.id === id)

function Slides({ thumbOrder }) {
  const { goToIndex } = useGallery()

  return (
    <GalleryMain
      className="track"
      renderGalleryItem={({ item, index, active }) => {
        // Strip slot comes from the queue, centered around the middle of the
        // screen. The active item isn't in the queue (indexOf -1), but its
        // offset is unused while the full-screen transform applies.
        const offset = thumbOrder.indexOf(item.id) - (thumbOrder.length - 1) / 2

        return (
          <GalleryItem
            key={item.id}
            index={index}
            active={active}
            className="item"
            data-active={String(active)}
          >
            <div className="slide" style={{ "--offset": offset }}>
              <img
                src={item.src}
                alt={item.alt}
                className="image"
                style={
                  item.objectPosition
                    ? { objectPosition: item.objectPosition }
                    : undefined
                }
              />
              {!active && (
                <button
                  type="button"
                  className="thumbButton"
                  tabIndex={-1}
                  onClick={() => goToIndex(index)}
                >
                  <span className="visuallyHidden">Show {item.title}</span>
                </button>
              )}
            </div>
          </GalleryItem>
        )
      }}
    />
  )
}

function ActiveContent({ thumbOrder }) {
  const { activeIndex, goToIndex } = useGallery()
  const item = ITEMS[activeIndex]

  return (
    <div className="rail">
      <div className="content" key={item.id}>
        <p className="kicker">
          {item.category} · {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(TOTAL).padStart(2, "0")}
        </p>
        <h2 className="title">{item.title}</h2>
        <p className="description">{item.description}</p>
      </div>

      {/*
       * Deck-rotation nav: next pulls up the leftmost thumbnail, previous the
       * rightmost — which is the most recently viewed, since every change
       * pushes the outgoing item to the end of the strip. The queue never
       * empties, so neither direction ever disables.
       */}
      <div className="controls">
        <button
          type="button"
          className="navBtn"
          onClick={() => goToIndex(indexOfId(thumbOrder[thumbOrder.length - 1]))}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="visuallyHidden">Previous</span>
        </button>
        <button
          type="button"
          className="navBtn"
          onClick={() => goToIndex(indexOfId(thumbOrder[0]))}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="visuallyHidden">Next</span>
        </button>
      </div>
    </div>
  )
}

function SiteNav({ page, onNavigate }) {
  return (
    <nav className="siteNav" aria-label="Main">
      <button
        type="button"
        className="siteNavLink"
        data-active={String(page === "gallery")}
        onClick={() => onNavigate("gallery")}
      >
        Gallery
      </button>
      <button
        type="button"
        className="siteNavLink"
        data-active={String(page === "profile")}
        onClick={() => onNavigate("profile")}
      >
        Profile
      </button>
      <button
        type="button"
        className="siteNavLink"
        data-active={String(page === "contact")}
        onClick={() => onNavigate("contact")}
      >
        Contact
      </button>
    </nav>
  )
}

function EnlargeGallery() {
  // The thumbnail strip as a queue of item ids, left to right; the active
  // item is excluded. Every change removes the incoming item from the queue
  // and pushes the outgoing item onto the end.
  const [thumbOrder, setThumbOrder] = useState(() =>
    ITEMS.slice(1).map((item) => item.id)
  )

  const handleChange = useCallback(({ oldIndex, newIndex }) => {
    setThumbOrder((order) => [
      ...order.filter((id) => id !== ITEMS[newIndex].id),
      ITEMS[oldIndex].id,
    ])
  }, [])

  return (
    <div className="root">
      <Gallery
        items={ITEMS}
        draggable={false}
        className="gallery"
        onChange={handleChange}
      >
        <Slides thumbOrder={thumbOrder} />
        <ActiveContent thumbOrder={thumbOrder} />
      </Gallery>
    </div>
  )
}

const PROFILE = {
  name: "Zifa Karya Utama",
  role: "Electrical & Facility Services",
  location: "Jakarta Timur",
  avatar: "./images/01-preventif-maintenance-1.png",
  cover: "./images/02-preventif-maintenance-2.png",
  bio: "Melayani preventive maintenance panel, thermograph, terminasi, perawatan sound/paging system, serta alarm suhu server room untuk menjaga keandalan fasilitas Anda.",
  stats: [
    { label: "Layanan", value: "5" },
    { label: "Dokumentasi", value: String(TOTAL) },
    { label: "Area", value: "JKT" },
  ],
}

function ProfilePage({ onOpenGallery }) {
  return (
    <div className="profile">
      <div className="profileBackdrop" aria-hidden="true">
        <img src={PROFILE.cover} alt="" className="profileCover" />
        <div className="profileScrim" />
      </div>

      <div className="profileInner">
        <div className="profileHero">
          <img
            src={PROFILE.avatar}
            alt={PROFILE.name}
            className="profileAvatar"
          />
          <div className="profileIntro">
            <p className="profileKicker">{PROFILE.role}</p>
            <h1 className="profileName">{PROFILE.name}</h1>
            <p className="profileLocation">{PROFILE.location}</p>
          </div>
        </div>

        <p className="profileBio">{PROFILE.bio}</p>

        <ul className="profileStats">
          {PROFILE.stats.map((stat) => (
            <li key={stat.label} className="profileStat">
              <span className="profileStatValue">{stat.value}</span>
              <span className="profileStatLabel">{stat.label}</span>
            </li>
          ))}
        </ul>

        <button type="button" className="profileCta" onClick={onOpenGallery}>
          View gallery
        </button>
      </div>
    </div>
  )
}

const CONTACT = {
  cover: "./images/04-thermograph-panel.png",
  email: "Admin@zifakaryautama.com",
  phone: "0813-3337-0743",
  phoneHref: "tel:+6281333370743",
  location:
    "Jl. Kiwi No.10, RT.13/RW.9, Klp. Dua Wetan, Kec. Ciracas, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13730",
  note: "Untuk kerja sama, pertanyaan, atau kunjungan studio — kirim pesan singkat dan kami akan membalas secepatnya.",
}

function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="contact">
      <div className="contactBackdrop" aria-hidden="true">
        <img src={CONTACT.cover} alt="" className="contactCover" />
        <div className="contactScrim" />
      </div>

      <div className="contactInner">
        <div className="contactIntro">
          <p className="contactKicker">Hubungi kami</p>
          <h1 className="contactTitle">Contact</h1>
          <p className="contactNote">{CONTACT.note}</p>
        </div>

        <ul className="contactDetails">
          <li>
            <span className="contactDetailLabel">Alamat</span>
            <span className="contactDetailValue">{CONTACT.location}</span>
          </li>
          <li>
            <span className="contactDetailLabel">Email</span>
            <a className="contactDetailValue" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </li>
          <li>
            <span className="contactDetailLabel">Telepon</span>
            <a className="contactDetailValue" href={CONTACT.phoneHref}>
              {CONTACT.phone}
            </a>
          </li>
        </ul>

        {sent ? (
          <p className="contactThanks" role="status">
            Terima kasih — pesan Anda sudah siap. Kami akan segera menghubungi Anda.
          </p>
        ) : (
          <form className="contactForm" onSubmit={handleSubmit}>
            <label className="contactField">
              <span>Nama</span>
              <input type="text" name="name" required autoComplete="name" />
            </label>
            <label className="contactField">
              <span>Email</span>
              <input type="email" name="email" required autoComplete="email" />
            </label>
            <label className="contactField">
              <span>Pesan</span>
              <textarea name="message" rows="4" required />
            </label>
            <button type="submit" className="contactSubmit">
              Kirim pesan
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function getPageFromHash() {
  const hash = window.location.hash
  if (hash === "#/profile") return "profile"
  if (hash === "#/contact") return "contact"
  return "gallery"
}

const HASH_BY_PAGE = {
  gallery: "#/",
  profile: "#/profile",
  contact: "#/contact",
}

const App = () => {
  const [page, setPage] = useState(getPageFromHash)

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const navigate = useCallback((next) => {
    window.location.hash = HASH_BY_PAGE[next] || "#/"
    setPage(next)
  }, [])

  return (
    <>
      <SiteNav page={page} onNavigate={navigate} />
      {page === "profile" ? (
        <ProfilePage onOpenGallery={() => navigate("gallery")} />
      ) : page === "contact" ? (
        <ContactPage />
      ) : (
        <EnlargeGallery />
      )}
    </>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);