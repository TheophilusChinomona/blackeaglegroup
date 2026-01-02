# Tasks: About Page Modal

- [x] Read `src/pages/About.jsx` to locate the CTA button.
- [x] Implement Modal Integration:
    - [x] Import `useState` and `EventContactModal`.
    - [x] Add `const [isContactModalOpen, setIsContactModalOpen] = useState(false)`.
    - [x] Replace `<Link to="/contact">` with `<button onClick={() => setIsContactModalOpen(true)}>` (or similar).
    - [x] Render `<EventContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />`.