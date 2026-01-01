/**
 * ProfileDownloadCard Component
 * Card component for PDF download links
 * 
 * @param {Object} props
 * @param {string} props.title - Profile title
 * @param {string} props.description - Profile description
 * @param {string} props.file - PDF file path
 * @param {string} props.icon - Emoji icon for the profile
 */
const ProfileDownloadCard = ({ title, description, file, icon }) => {
  return (
    <a
      href={file}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="profile-download-card"
      aria-label={`Download ${title} PDF`}
    >
      <div className="profile-icon" aria-hidden="true">{icon}</div>
      <div className="profile-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="download-indicator">
        <span className="download-icon">↓</span>
        <span>Download PDF</span>
      </div>
    </a>
  )
}

export default ProfileDownloadCard

