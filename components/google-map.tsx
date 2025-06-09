export function GoogleMap() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Find Us</h2>
      <div className="aspect-video w-full rounded-lg overflow-hidden border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152482.94418801966!2d-113.6856731!3d53.5461245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0x411fa00c4af6155d!2sEdmonton%2C%20AB%2C%20Canada!5e0!3m2!1sen!2sus!4v1621345678901!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}
