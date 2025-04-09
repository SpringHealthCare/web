export const scrollToSection = (sectionId: string, currentPath: string) => {
  // Check if the section exists on the current page
  const element = document.getElementById(sectionId)
  
  if (element) {
    // If element exists, scroll to it
    element.scrollIntoView({ behavior: 'smooth' })
  } else {
    // If element doesn't exist, navigate to the appropriate page
    if (currentPath === '/') {
      // If we're on home page but section doesn't exist, do nothing
      return
    }
    
    // Navigate to the appropriate page based on the section
    let targetPage = '/'
    switch(sectionId) {
      case 'team':
        targetPage = '/team'
        break
      case 'services':
        targetPage = '/services'
        break
      case 'about':
        targetPage = '/about'
        break
      case 'faq':
        targetPage = '/faq'
        break
      case 'chat':
        targetPage = '/chat'
        break
      default:
        targetPage = '/'
    }
    
    window.location.href = targetPage
  }
}

export const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string, currentPath: string) => {
  e.preventDefault()
  scrollToSection(sectionId, currentPath)
} 