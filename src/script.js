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
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "Forest path with light filtering through trees",
    title: "Into the Pines",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at posuere magna. Nam eros purus, congue pulvinar turpis pretium, vulputate interdum turpis. Vivamus non arcu.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "Rocky mountain peak against blue sky",
    title: "The High Country",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "Ocean waves at sunset",
    title: "Last Light Offshore",
    description:
      "Praesent vel orci orci. Nam sed eleifend felis. Duis eget risus vel nisl feugiat semper eu ut ligula. Morbi eget lorem porttitor, gravida diam lobortis.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "City skyline at night",
    title: "After Hours",
    description:
      "Ut pretium nibh vitae velit laoreet eleifend. Cras consectetur nisl elit, eu scelerisque ante placerat.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "Desert sand dunes",
    title: "Sea of Sand",
    description:
      "Maecenas enim ex, pharetra ut efficitur accumsan, blandit in elit. Donec commodo sapien malesuada condimentum feugiat. Class aptent taciti sociosqu ad litora torquent per conubia.",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "Northern lights over snowy landscape",
    title: "Solar Winds",
    description:
      "Ut scelerisque non nulla ac scelerisque. Nulla sollicitudin suscipit dolor vitae lacinia. Quisque id dapibus est. Aenean eget magna id urna cursus congue.",
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
              <img src={item.src} alt={item.alt} className="image" />
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
          {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
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
  name: "Aria Solenne",
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
    { label: "Years", value: "8" },
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
  cover:
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&h=900&q=80",
  email: "info@zifakaryautama.com",
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