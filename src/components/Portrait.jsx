import { profile } from '../content'

// Drop the real photo at src/assets/photo.jpg (jpeg, png or webp also work); until it exists the frame shows a monogram.
const photo = Object.values(import.meta.glob('../assets/photo.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }))[0]

export default function Portrait({ className = '' }) {
  if (photo) {
    return <img src={photo} alt={profile.name} className={`aspect-[4/5] w-full rounded-xl border border-line bg-raised object-cover ${className}`} />
  }
  return (
    <div role="img" aria-label={`${profile.name}, photo placeholder`} className={`relative grid aspect-[4/5] w-full place-items-center rounded-xl border border-line bg-raised ${className}`}>
      <span aria-hidden="true" className="absolute left-3 top-3 size-5 border-l-2 border-t-2 border-teal/60" />
      <span aria-hidden="true" className="absolute right-3 top-3 size-5 border-r-2 border-t-2 border-teal/60" />
      <span aria-hidden="true" className="absolute bottom-3 left-3 size-5 border-b-2 border-l-2 border-teal/60" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 size-5 border-b-2 border-r-2 border-teal/60" />
      <span className="font-display text-7xl font-bold text-teal">{profile.short}</span>
      <span className="mono-label absolute bottom-6">photo</span>
    </div>
  )
}
